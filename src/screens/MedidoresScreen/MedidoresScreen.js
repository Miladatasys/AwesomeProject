import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Text } from 'react-native';
import ClientHeader from '../../components/CustomHeader/ClientHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const MedidoresScreen = () => {
  const [medidores, setMedidores] = useState([]);
  const navigation = useNavigation();

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
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButtonContainer}>
        <Icon name="arrow-back" size={24} color="#4271d4" />
        <Text style={styles.backButtonText}>Volver</Text>
      </TouchableOpacity>
      <ScrollView style={styles.scrollView}>
        {medidores.map((medidor, index) => (
          <ClientHeader
            key={index}
            direccion={{
              calle: medidor.direccion,
              comuna: medidor.comuna,
              region: medidor.region,
              numeroCliente: medidor.numcliente,
            }}
            medidorId={medidor.id}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  backButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 16,
    color: '#4271d4',
    marginLeft: 5,
    fontWeight: 'bold',
    fontFamily: 'Roboto-Regular',
  },
  scrollView: {
    flexGrow: 1,
  },
});

export default MedidoresScreen;
