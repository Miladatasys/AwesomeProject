import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ClientProfileScreen = () => {
  const navigation = useNavigation();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pressedButton, setPressedButton] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (!token) {
          throw new Error('No token found');
        }

        const response = await axios.get('http://192.168.1.90:8080/cliente/user/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.data) {
          setProfileData(response.data);
          console.log('Fetched Client Data:', response.data);
        }
      } catch (error) {
        console.error('Error fetching profile data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const handleNavigate = (screen) => {
    setPressedButton(screen);
    setTimeout(() => {
      setPressedButton(null);
      navigation.navigate(screen);
    }, 200);
  };

  const handleLogout = () => {
    setPressedButton('logout');
    setTimeout(() => {
      setPressedButton(null);
      Alert.alert(
        'Cerrar Sesión',
        '¿Estás seguro de que deseas cerrar sesión?',
        [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Aceptar', onPress: () => navigation.navigate('SignIn') }
        ],
        { cancelable: false }
      );
    }, 200);
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
        <Text style={styles.profileName}>{profileData?.firstname || 'Nombre del usuario'}</Text>
        <Text style={styles.profileEmail}>{profileData?.email || 'Correo del usuario'}</Text>
      </View>
      <TouchableOpacity
        style={[styles.button, pressedButton === 'EditProfileScreen' && styles.buttonActive]}
        onPress={() => handleNavigate('EditProfileScreen')}
        activeOpacity={0.7}
      >
        <Text style={styles.buttonText}>Editar Perfil</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, pressedButton === 'logout' && styles.buttonActive]}
        onPress={handleLogout}
        activeOpacity={0.7}
      >
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
  profileContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2F2F2F',
    fontFamily: 'Roboto-Regular',
  },
  profileEmail: {
    fontSize: 16,
    color: '#2F2F2F',
    fontFamily: 'Roboto-Regular',
  },
  button: {
    backgroundColor: '#CCCCCC',
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
    color: '#333333',
    fontWeight: 'bold',
    fontFamily: 'Roboto-Regular',
  },
  buttonActive: {
    backgroundColor: '#FE0F64',
  },
});

export default ClientProfileScreen;
