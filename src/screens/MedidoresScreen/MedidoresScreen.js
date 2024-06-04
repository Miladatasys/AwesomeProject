import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import ClientHeader from '../../components/CustomHeader/ClientHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const MedidoresScreen = () => {
  const [medidores, setMedidores] = useState([]);

  useEffect(() => {
    const fetchMedidores = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (!token) {
          throw new Error('No token found');
        }

        const response = await axios.get('http://ec2-54-147-32-66.compute-1.amazonaws.com:8080/cliente/user/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.data) {
          setMedidores(response.data.medidores);
        }
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchMedidores();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {medidores.map((medidor, index) => (
        <ClientHeader
          key={index}
          direccion={{
            calle: medidor.direccion,
            comuna: medidor.comuna,
            region: medidor.region,
            numeroCliente: medidor.numcliente,
          }}
          medidorId={medidor.id} //  medidor.id debe ser el ID correcto del medidor
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

export default MedidoresScreen;
