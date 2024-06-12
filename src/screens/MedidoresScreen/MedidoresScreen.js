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

        const response = await axios.get('http://172.20.10.2:8080/cliente/userMedidores/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        console.log("reponse: ",response);
        console.log("response.data: ",response.data);
        console.log("response.data.object: ",response.data.object);

        if (response.data.object) {
          setMedidores(response.data.object);
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
