import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
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
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  useEffect(() => {
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
  }, []);

  const handleInputChange = (name, value) => {
    setProfileData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateEmail = () => {
    const emailRegex = /^[a-zA-Z0-9_!#$%&'*+/=?`{|}~^.-]{1,50}@[a-zA-Z0-9.-]{1,50}\.[a-zA-Z]{2,3}$/;
    if (profileData.email && !emailRegex.test(profileData.email)) {
      setEmailError('El campo email es inválido. Debe tener una longitud entre 4 y 50 caracteres, un @ y un dominio');
      return false;
    } else {
      setEmailError('');
      return true;
    }
  };

  const validatePhone = () => {
    const phoneRegex = /^\d{8}$/;
    if (profileData.phoneNumber && !phoneRegex.test(profileData.phoneNumber)) {
      setPhoneError('El campo celular es inválido. Debe tener solo números con una longitud de 8 dígitos, sin el prefijo +569');
      return false;
    } else {
      setPhoneError('');
      return true;
    }
  };

  const validatePassword = () => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}$/;
    if (profileData.password && !passwordRegex.test(profileData.password)) {
      setPasswordError('La contraseña debe tener al menos 8 caracteres y máximo 15, una letra mayúscula, una letra minúscula y un número');
      return false;
    } else {
      setPasswordError('');
      return true;
    }
  };

  const validateConfirmPassword = () => {
    if (profileData.confirmPassword && profileData.confirmPassword !== profileData.password) {
      setConfirmPasswordError('Las contraseñas no coinciden');
      return false;
    } else {
      setConfirmPasswordError('');
      return true;
    }
  };

  const handleSave = async () => {
    if (!validateEmail() || !validatePhone() || !validatePassword() || !validateConfirmPassword()) {
      return;
    }

    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        throw new Error('No token found');
      }

      // Crear un objeto con solo los campos no vacíos y válidos
      const updates = {};
      if (profileData.email) updates.email = profileData.email;
      if (profileData.phoneNumber) updates.phoneNumber = profileData.phoneNumber;
      if (profileData.password) updates.password = profileData.password;

      // Log the data before sending the request
      console.log('Data being sent:', updates);

      const response = await axios.patch('http://192.168.1.100:8080/cliente/profile/update', updates, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data) {
        const updatedUser = response.data;
        await AsyncStorage.setItem('userProfile', JSON.stringify(updatedUser));
        console.log('Updated user:', updatedUser);

        // Update the state with the updated user data
        setProfileData({
          email: updatedUser.email || '',
          phoneNumber: updatedUser.phoneNumber || '',
          password: '',  // Clear the password fields
          confirmPassword: '',  // Clear the password fields
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
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
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
        {phoneError ? <Text style={styles.errorText}>{phoneError}</Text> : null}
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
        {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
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
        {confirmPasswordError ? <Text style={styles.errorText}>{confirmPasswordError}</Text> : null}
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
  errorText: {
    color: '#FE0F64',
    fontSize: 12,
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
