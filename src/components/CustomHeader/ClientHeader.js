import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ClientHeader = ({ direccion }) => {
  if ( !direccion) {
    return null;
  }

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <View style={styles.iconCircle}>
            <Icon name="map-marker" size={30} color="#fff" style={styles.icon} /> 
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
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', // Alinea los elementos en fila
    alignItems: 'center', // Alinea verticalmente
    padding: 20,
    backgroundColor: '#F2F2F2',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    borderBottomEndRadius: 10,
    marginRight: 40, // Mayor margen derecho para acomodar el ícono de la pantalla de inicio
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
});

export default ClientHeader;