import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditProfileScreen = () => {
  const navigation = useNavigation();
  const [profileData, setProfileData] = useState({
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const data = await AsyncStorage.getItem('userProfile');
        if (data) {
          const parsedData = JSON.parse(data);
          setProfileData((prevState) => ({
            ...prevState,
            email: parsedData.email,
            phoneNumber: parsedData.phoneNumber,
          }));
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

  const handleSave = async () => {
    if (profileData.password !== profileData.confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    try {
      // Simulación de éxito en la actualización del perfil
      const updatedUser = {
        email: profileData.email,
        phoneNumber: profileData.phoneNumber,
        // Aquí puedes agregar cualquier otro dato actualizado que desees almacenar
      };
      await AsyncStorage.setItem('userProfile', JSON.stringify(updatedUser));
      Alert.alert('Éxito', 'Perfil actualizado correctamente');
      navigation.goBack();
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

  const InputField = ({ label, value, onChangeText, placeholder, keyboardType = 'default', secureTextEntry = false }) => (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButtonContainer}>
        <Text style={styles.backButton}>Volver</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Editar Perfil</Text>
      <InputField
        label="Correo Electrónico:"
        value={profileData.email}
        onChangeText={(value) => handleInputChange('email', value)}
        placeholder="Correo Electrónico"
        keyboardType="email-address"
      />
      <InputField
        label="Número de Teléfono:"
        value={profileData.phoneNumber}
        onChangeText={(value) => handleInputChange('phoneNumber', value)}
        placeholder="Número de Teléfono"
        keyboardType="phone-pad"
      />
      <InputField
        label="Contraseña:"
        value={profileData.password}
        onChangeText={(value) => handleInputChange('password', value)}
        placeholder="Contraseña"
        secureTextEntry
      />
      <InputField
        label="Confirmar Contraseña:"
        value={profileData.confirmPassword}
        onChangeText={(value) => handleInputChange('confirmPassword', value)}
        placeholder="Confirmar Contraseña"
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleSave} activeOpacity={0.7}>
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
    backgroundColor: '#CCCCCC',
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
    color: '#333333',
    fontWeight: 'bold',
    fontFamily: 'Roboto-Regular',
  },
  buttonActive: {
    backgroundColor: '#FE0F64',
  },
});

export default EditProfileScreen;
