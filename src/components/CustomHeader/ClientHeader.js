import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const ClientHeader = ({ direccion, medidorId }) => {
  const navigation = useNavigation();

  if (!direccion) {
    return null;
  }

  const handleNavigateToHistorialCliente = () => {
    navigation.navigate('HistorialClienteScreen', { medidorId });
  };

  return (
    <TouchableOpacity onPress={handleNavigateToHistorialCliente} style={styles.container}>
      <View style={styles.iconContainer}>
        <View style={styles.iconCircle}>
          <Icon name="map-marker" size={18} color="#fff" />
        </View>
      </View>

      <View style={styles.addressContainer}>
        <Text style={styles.addressText}>
          <Text style={styles.bold}>
            {direccion.calle}, {direccion.comuna}, {direccion.region}
          </Text>
        </Text>
        <Text style={styles.addressText}>
          Cliente N° <Text style={styles.bold}>{direccion.numeroCliente}</Text>
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#ffff', //Fondo del Client Header
    borderRadius: 10,
    flex: 1, // Permite que el contenedor tome el espacio disponible
  },
  iconContainer: {
    marginRight: 10,
  },
  iconCircle: {
    width: 25,
    height: 25,
    borderRadius: 12.5,
    backgroundColor: '#4271d4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addressContainer: {
    flex: 1,
  },
  addressText: {
    fontSize: 12,
    color: '#333',
  },
  bold: {
    fontWeight: 'bold',
  },
});

export default ClientHeader;

