import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ClientHeader = () => {
  const [clientData, setClientData] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await AsyncStorage.getItem('clientData');
        if (data) {
          const parsedData = JSON.parse(data);
          setClientData(parsedData);
          console.log('Fetched Client Data:', parsedData);
        }
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []);

  if (!clientData) {
    return null;
  }

  return (
    <View>
      <View style={styles.greetingContainer}>
        <Text style={styles.greeting}>Hola {clientData.nombreCliente},</Text>
        <Text style={styles.revisandoText}>estás revisando:</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <View style={styles.iconCircle}>
            <Icon name="map-marker" size={30} color="#fff" style={styles.icon} /> 
          </View>
        </View>
        <View style={styles.addressContainer}>
          <Text style={styles.addressText}><Text style={styles.bold}>{clientData.direccion.calle}, {clientData.direccion.comuna}, {clientData.direccion.region}</Text></Text>
          <TouchableOpacity onPress={() => navigation.navigate('Supplies')}>
            <View style={styles.arrowContainer}>
              <Text style={styles.addressText}>Cliente N° <Text style={styles.bold}>{clientData.direccion.numeroCliente}</Text></Text>
              <Icon name="arrow-right" size={20} color="#FE0F64" style={styles.arrowIcon} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  greetingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  greeting: {
    fontSize: 18,
    alignSelf: 'start',
    marginLeft: 5,
    fontWeight: 'bold',
  },
  revisandoText: {
    fontSize: 18, 
    alignSelf: 'start',
    marginLeft: 5,
  },
  container: {
    flexDirection: 'row', // Alinea los elementos en fila
    alignItems: 'center', // Alinea verticalmente
    padding: 20,
    backgroundColor: '#F2F2F2',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    borderBottomEndRadius: 10,
  },
  iconContainer: {
    marginRight: 15, // Espacio entre el ícono y el texto
  },
  iconCircle: {
    width: 40, // Tamaño del círculo
    height: 40, // Tamaño del círculo
    borderRadius: 20, // Mitad del tamaño para hacer un círculo
    backgroundColor: '#4271d4', // Color del círculo
    justifyContent: 'center', // Centra el ícono verticalmente
    alignItems: 'center', // Centra el ícono horizontalmente
  },
  addressContainer: {
    flex: 1, // El texto ocupará todo el espacio disponible
  },
  addressText: {
    fontSize: 16,
    alignSelf: 'start',
  },
  bold: {
    fontWeight: 'bold',
  },
  icon: {
    padding: 5,
  },
  arrowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
  arrowIcon: {
    marginLeft: 150,
  },
});

export default ClientHeader;
