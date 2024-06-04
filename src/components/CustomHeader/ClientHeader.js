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

        <TouchableOpacity onPress={handleNavigateToHistorialCliente} style={styles.iconButton}>
          <Icon name="arrow-right" size={24} color="#FE0F64" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F2F2F2',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    borderBottomEndRadius: 10,
    marginRight: 40,
  },
  iconContainer: {
    marginRight: 15,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#4271d4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addressContainer: {
    flex: 1,
  },
  addressText: {
    fontSize: 16,
    alignSelf: 'start',
  },
  bold: {
    fontWeight: 'bold',
  },
  iconButton: {
    padding: 10,
  },
  icon: {
    padding: 5,
  },
});

export default ClientHeader;
