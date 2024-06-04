import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const VerMedidor = () => {
  const navigation = useNavigation();

  const handleNavigateToMedidores = () => {
    navigation.navigate('MedidoresScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Ver mis medidores</Text>
      <TouchableOpacity onPress={handleNavigateToMedidores} style={styles.iconButton}>
        <MaterialIcons name="arrow-forward" size={24} color="#FE0F64" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
    marginVertical: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2F2F2F',
    fontFamily: 'Roboto-Bold',
  },
  iconButton: {
    padding: 10,
  },
});

export default VerMedidor;
