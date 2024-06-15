import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const HelpMeterListScreen = () => {
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

        const response = await axios.get('http://192.168.1.100:8080/cliente/userMedidores/profile', {
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

  const handleSelectMedidor = (medidor) => {
    navigation.navigate('HelpScreen', { medidor });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
        <Text style={styles.backButtonText}>Volver</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Lista de Medidores</Text>
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
              <View key={index} style={styles.meterContainer}>
                <View style={styles.meterInfo}>
                  <Text style={styles.meterText}>{medidor.direccion}</Text>
                  <Text style={styles.meterText}>Cliente N° {medidor.numcliente}</Text>
                </View>
                <TouchableOpacity onPress={() => handleSelectMedidor(medidor)}>
                  <Icon name="arrow-right" size={20} color="#FE0F64" />
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#2F2F2F',
    fontFamily: 'Roboto-Bold',
  },
  meterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#F6F6F6',
    borderRadius: 5,
    marginBottom: 10,
  },
  meterInfo: {
    flex: 1,
  },
  meterText: {
    fontSize: 16,
    color: '#2F2F2F',
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
  button: {
    backgroundColor: '#FE0F64',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontFamily: 'Roboto-Regular',
  },
});

export default HelpMeterListScreen;
