import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ClientProfileScreen = () => {
  const navigation = useNavigation();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Simulación de la llamada a la API del backend
  useEffect(() => {
    // Aquí se debería realizar la llamada a la API para obtener los datos del perfil
    // Ejemplo:
    // fetch('http://tu-backend-api/perfil/usuario-id')
    //   .then(response => response.json())
    //   .then(data => {
    //     setProfileData(data);
    //     setLoading(false);
    //   })
    //   .catch(error => {
    //     console.error(error);
    //     setLoading(false);
    //   });

    // Simulación de un retraso en la llamada a la API
    setTimeout(() => {
      // Datos de ejemplo genéricos
      setProfileData({
        nombre: 'Nombre de Usuario',
        email: 'email@ejemplo.com'
      });
      setLoading(false);
    }, 2000);
  }, []);

  const handleNavigate = (screen) => {
    navigation.navigate(screen);
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
        <Icon name="arrow-back" size={24} color="#4271d4" />
        <Text style={styles.backButton}>Volver</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Perfil</Text>
      <View style={styles.profileContainer}>
        <Text style={styles.profileName}>{profileData?.nombre || 'Nombre del usuario'}</Text>
        <Text style={styles.profileEmail}>{profileData?.email || 'Correo del usuario'}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => handleNavigate('EditProfileScreen')}>
        <Text style={styles.buttonText}>Editar Perfil</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => handleNavigate('SettingsScreen')}>
        <Text style={styles.buttonText}>Configuraciones</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => handleNavigate('Logout')}>
        <Text style={styles.buttonText}>Cerrar Sesión</Text>
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
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#2F2F2F',
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2F2F2F',
  },
  profileEmail: {
    fontSize: 16,
    color: '#2F2F2F',
  },
  button: {
    backgroundColor: '#5C6BC0',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 20,
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
  },
});

export default ClientProfileScreen;