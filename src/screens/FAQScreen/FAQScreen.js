import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../../components/CustomButton';

const FAQScreen = () => {
  const navigation = useNavigation();

  const categories = [
    { label: 'Corte y Reposición', value: 'corte-reposicion' },
    { label: 'Lectura', value: 'lectura' },
    { label: 'Temas Generales', value: 'temas-generales' },
    { label: 'Usuario Enel', value: 'usuario-enel' },
  ];

  const handleCategoryPress = (category) => {
    // Aquí podrías navegar a una pantalla específica de la categoría si es necesario
    // navigation.navigate('CategoryScreen', { category });
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.root}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Text style={styles.backButtonText}>Volver</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Preguntas Frecuentes</Text>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.value}
            style={styles.categoryButton}
            onPress={() => handleCategoryPress(category.value)}
          >
            <Text style={styles.categoryButtonText}>{category.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2F2F2F',
    marginBottom: 20,
    textAlign: 'center',
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 16,
    color: '#4271d4',
    fontWeight: 'bold',
  },
  categoryButton: {
    backgroundColor: '#4271d4',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
  },
  categoryButtonText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

export default FAQScreen;
