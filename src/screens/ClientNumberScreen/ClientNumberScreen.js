import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import CustomButton from '../../components/CustomButton';

const ClientNumberScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { clientNumber } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tu número de cliente es:</Text>
      <Text style={styles.clientNumber}>{clientNumber}</Text>
      <View style={styles.buttonContainer}>
        <CustomButton
          text="Aceptar"
          onPress={() => navigation.navigate('HomeScreen')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    color: '#2F2F2F',
    fontFamily: 'Roboto-Regular',
  },
  clientNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2F2F2F',
    fontFamily: 'Roboto-Bold',
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
});

export default ClientNumberScreen;
