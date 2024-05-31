import React from 'react';
import { View, Text, Image, Pressable, StyleSheet, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const PreviewScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { imageUri, recognizedText } = route.params;

  console.log('PreviewScreen imageUri:', imageUri);
  console.log('PreviewScreen recognizedText:', recognizedText);

  const handleSubmit = () => {
    Alert.alert(
      'Lectura Enviada',
      'Su lectura se ha enviado',
      [
        {
          text: 'OK',
          onPress: () => navigation.navigate('HomeScreen'),
        },
      ],
      { cancelable: false }
    );
  };

  // Extraer solo los números detectados
  const detectedNumbers = recognizedText.body ? JSON.parse(recognizedText.body).detectedNumbers : [];
  const uniqueDetectedNumbers = [...new Set(detectedNumbers)];

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Previsualización</Text>
      <View style={styles.textContainer}>
        <Text style={styles.textTitle}>Lectura Reconocida:</Text>
        {uniqueDetectedNumbers.length > 0 ? (
          <Text style={styles.numberText}>
            {uniqueDetectedNumbers.join(', ')}
          </Text>
        ) : (
          <Text style={styles.numberText}>No se detectaron números.</Text>
        )}
      </View>
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      <Pressable
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? '#FF1493' : '#CCCCCC',
          },
          styles.button,
        ]}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Retomar</Text>
      </Pressable>
      <Pressable
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? '#FF1493' : '#CCCCCC',
          },
          styles.button,
        ]}
        onPress={handleSubmit}
      >
        <Text style={styles.buttonText}>Enviar imagen</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 20,
  },
  image: {
    width: 350, // Ajustar el tamaño de la imagen
    height: 250,
    marginBottom: 20,
    borderRadius: 10,
  },
  textContainer: {
    marginBottom: 20,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
  },
  textTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333333',
  },
  numberText: {
    fontSize: 24,
    color: '#FF1493',
    fontWeight: 'bold',
  },
  button: {
    width: '80%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#333333',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PreviewScreen;
