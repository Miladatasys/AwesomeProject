import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert  } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';


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

  const handleSelectMedidor = (medidor) => {
    navigation.navigate('HelpScreen', { medidor });
  };


  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')} style={styles.backButtonContainer}>
            <Icon name="arrow-back" size={24} color="#4271d4" />
            <Text style={styles.backButtonText}>Volver</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Seleccione un Medidor</Text>
        <FlatList
            data={medidores}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <TouchableOpacity style={styles.meterItem} onPress={() => handleSelectMedidor(item)}>
                    <Text style={styles.meterText}>{item.direccion}</Text>
                </TouchableOpacity>
            )}
        />
    </View>
);
};

const styles = StyleSheet.create({
container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
},
title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333333',
},
meterItem: {
    padding: 15,
    backgroundColor: '#F2F2F2',
    borderRadius: 8,
    marginBottom: 10,
},
meterText: {
    fontSize: 18,
    color: '#333333',
},
backButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
},
backButtonText: {
    fontSize: 16,
    color: '#4271d4',
    marginLeft: 5,
    fontWeight: 'bold',
    fontFamily: 'Roboto-Regular',
},
});

export default HelpMeterListScreen;
