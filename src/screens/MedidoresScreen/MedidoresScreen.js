import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import ClientHeader from '../../components/CustomHeader/ClientHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const MedidoresScreen = () => {
  const [medidores, setMedidores] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack();
  };

  useEffect(() => {
    const fetchMedidores = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (!token) {
          throw new Error('No token found');
        }

        const response = await axios.get('http://192.168.1.91:8080/cliente/userMedidores/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        console.log("response: ", response);
        console.log("response.data: ", response.data);
        console.log("response.data.object: ", response.data.object);

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
              <ClientHeader
                key={index}
                direccion={{
                  calle: medidor.direccion,
                  comuna: medidor.comuna,
                  region: medidor.region,
                  numeroCliente: medidor.numcliente,
                }}
                medidorId={medidor.id} // medidor.id debe ser el ID correcto del medidor
              />
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
});

export default MedidoresScreen;
