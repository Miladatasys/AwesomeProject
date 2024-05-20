import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const FaqScreen = () => {
  const navigation = useNavigation();

  const handleNavigate = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButtonContainer}>
          <Icon name="arrow-back" size={24} color="#4271d4" />
          <Text style={styles.backButton}>Volver</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Preguntas Frecuentes</Text>
        <TouchableOpacity style={styles.button} onPress={() => handleNavigate('CorteReposicionScreen')}>
          <Text style={styles.buttonText}>Corte y Reposición</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleNavigate('LecturaScreen')}>
          <Text style={styles.buttonText}>Lectura</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleNavigate('TemasGeneralesScreen')}>
          <Text style={styles.buttonText}>Temas Generales</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#E8EAF6',
  },
  container: {
    padding: 20,
  },
  backButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  backButton: {
    fontSize: 16,
    color: '#4271d4',
    marginLeft: 5,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
    color: '#2F2F2F',
  },
  button: {
    backgroundColor: '#5C6BC0',
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 25,
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default FaqScreen;
