import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import ClientHeader from '../../components/CustomHeader/ClientHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const MedidoresScreen = () => {
  const [medidores, setMedidores] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleDelete = async (medidorId) => {
    Alert.alert(
      'Confirmar eliminación',
      '¿Estás seguro de que deseas eliminar este medidor?',
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Eliminar',
          onPress: async () => {
            try {
              const token = await AsyncStorage.getItem('userToken');
              if (!token) {
                throw new Error('No token found');
              }
    
              await axios.delete(`http://192.168.1.88:8080/cliente/medidores/${medidorId}`, {
                headers: {
                  Authorization: `Bearer ${token}`
                }
              });
    
              // Actualizar la lista de medidores después de la eliminación
              setMedidores(medidores.filter(medidor => medidor.id !== medidorId));
            } catch (error) {
              console.error('Error deleting medidor', error);
              Alert.alert('Error', 'No se pudo eliminar el medidor. Por favor, inténtelo de nuevo.');
            }
          }
        }
      ]
    );
  };
  

  useEffect(() => {
    const fetchMedidores = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (!token) {
          throw new Error('No token found');
        }

        const response = await axios.get('http://192.168.1.88:8080/cliente/userMedidores/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.data.object) {
          setMedidores(response.data.object);
        } else {
          showAlert();
        }
      } catch (error) {
        console.error('Error fetching data', error);
        showAlert();
      } finally {
        setLoading(false);
      }
    };

    const showAlert = () => {
      Alert.alert(
        'No tienes medidores',
        'Registra uno para continuar',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('HomeScreen')
          }
        ]
      );
    };

    fetchMedidores();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
        <Text style={styles.backButtonText}>Volver</Text>
      </TouchableOpacity>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <ScrollView>
          {medidores.length === 0 ? (
            <View style={styles.noMedidoresContainer}>
              <Text style={styles.noMedidoresText}>No tienes medidores. Registra uno.</Text>
            </View>
          ) : (
            medidores.map((medidor, index) => (
              <View key={index} style={styles.medidorRow}>
                <View style={styles.medidorContainer}>
                  <ClientHeader
                    direccion={{
                      calle: medidor.direccion,
                      comuna: medidor.comuna,
                      region: medidor.region,
                      numeroCliente: medidor.numcliente,
                    }}
                    medidorId={medidor.id}
                  />
                </View>
                <TouchableOpacity onPress={() => handleDelete(medidor.id)} style={styles.trashButton}>
                  <Icon name="trash" size={20} color="#FF5789" />
                </TouchableOpacity>
              </View>
            ))
          )}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginVertical: 10,
  },
  backButtonText: {
    fontSize: 16,
    color: '#4271d4',
    fontWeight: 'bold',
    fontFamily: 'Roboto-Regular',
  },
  noMedidoresContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  noMedidoresText: {
    fontSize: 18,
    color: '#FF0000',
    textAlign: 'center',
  },
  medidorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  medidorContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF', // Fondo blanco
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  trashButton: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginLeft: 10,
  },
});

export default MedidoresScreen;
