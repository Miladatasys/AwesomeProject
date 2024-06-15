import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const EditProfileScreen = () => {
  const navigation = useNavigation();
  const [profileData, setProfileData] = useState({
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      const fetchProfileData = async () => {
        try {
          const data = await AsyncStorage.getItem('userProfile');
          if (data) {
            const parsedData = JSON.parse(data);
            setProfileData({
              email: parsedData.email || '',
              phoneNumber: parsedData.phoneNumber || '',
              password: '',
              confirmPassword: '',
            });
          }
          setLoading(false);
        } catch (error) {
          console.error('Error fetching profile data', error);
          setLoading(false);
        }
      };

      fetchProfileData();

      return () => {
        setProfileData({
          email: '',
          phoneNumber: '',
          password: '',
          confirmPassword: '',
        });
      };
    }, [])
  );

  const handleInputChange = (name, value) => {
    setProfileData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    const updates = {};

    if (profileData.email) {
      const emailRegex = /^[a-zA-Z0-9_!#$%&'*+/=?`{|}~^.-]{1,50}@[a-zA-Z0-9.-]{1,50}\.[a-zA-Z]{2,3}$/;
      if (!emailRegex.test(profileData.email)) {
        Alert.alert('El campo email es invalido. Debe tener una longitud entre 4 y 50 caracteres, un @ y un dominio');
        return;
      }
      updates.email = profileData.email;
    }

    if (profileData.phoneNumber) {
      const phoneRegex = /^\d{8}$/;
      if (!phoneRegex.test(profileData.phoneNumber)) {
        Alert.alert('El campo celular es invalido. Debe tener solo numeros con una longitud de 8 digitos, sin el prefijo +569');
        return;
      }
      updates.phoneNumber = profileData.phoneNumber;
    }

    if (profileData.password) {
      if (profileData.password !== profileData.confirmPassword) {
        Alert.alert('Error', 'Las contraseñas no coinciden');
        return;
      }
      updates.password = profileData.password;
    }

    if (Object.keys(updates).length === 0) {
      Alert.alert('Error', 'No hay cambios para guardar');
      return;
    }

    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        throw new Error('No token found');
      }

      console.log('Data being sent:', updates);

      const response = await axios.patch('http://192.168.1.100:8080/cliente/profile/update', updates, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data) {
        const updatedUser = response.data;
        await AsyncStorage.setItem('userProfile', JSON.stringify(updatedUser));
        console.log('updated user: ', updatedUser);

        setProfileData({
          email: updatedUser.email || '',
          phoneNumber: updatedUser.phoneNumber || '',
          password: '',
          confirmPassword: '',
        });

        Alert.alert('Éxito', 'Perfil actualizado correctamente');
        navigation.navigate('HomeScreen');
      } else {
        Alert.alert('Error', response.data.message);
      }
    } catch (error) {
      console.error('Error updating profile', error);
      Alert.alert('Error', 'Hubo un problema al actualizar el perfil');
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4271d4" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButtonContainer}>
        <Text style={styles.backButton}>Volver</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Editar Perfil</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Correo Electrónico:</Text>
        <TextInput
          style={styles.input}
          placeholder="Correo Electrónico"
          value={profileData.email}
          onChangeText={(value) => handleInputChange('email', value)}
          keyboardType="email-address"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Número de Teléfono:</Text>
        <TextInput
          style={styles.input}
          placeholder="Número de Teléfono"
          value={profileData.phoneNumber}
          onChangeText={(value) => handleInputChange('phoneNumber', value)}
          keyboardType="phone-pad"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Contraseña:</Text>
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          value={profileData.password}
          onChangeText={(value) => handleInputChange('password', value)}
          secureTextEntry
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Confirmar Contraseña:</Text>
        <TextInput
          style={styles.input}
          placeholder="Confirmar Contraseña"
          value={profileData.confirmPassword}
          onChangeText={(value) => handleInputChange('confirmPassword', value)}
          secureTextEntry
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Guardar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#E8EAF6',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E8EAF6',
  },
  backButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    fontSize: 16,
    color: '#4271d4',
    marginLeft: 5,
    fontWeight: 'bold',
    fontFamily: 'Roboto-Regular',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#2F2F2F',
    fontFamily: 'Roboto-Bold',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 5,
    color: '#2F2F2F',
    fontFamily: 'Roboto-Regular',
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#F6F6F6',
    borderRadius: 5,
    paddingHorizontal: 10,
    color: '#2F2F2F',
    backgroundColor: '#FFFFFF',
    fontFamily: 'Roboto-Regular',
  },
  button: {
    backgroundColor: '#5C6BC0',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontFamily: 'Roboto-Regular',
  },
});

export default EditProfileScreen;
