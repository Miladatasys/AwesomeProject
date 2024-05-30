import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const PreviewScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { imageUri, recognizedText } = route.params;

  console.log('PreviewScreen imageUri:', imageUri);
  console.log('PreviewScreen recognizedText:', recognizedText);

  const handleSubmit = () => {
    // Aquí se agregaría la lógica de integración con el backend para guardar la foto en la base de datos
    // Ejemplo:
    // axios.post('https://el-backend-endpoint.com/save-image', {
    //   imageUri,
    //   recognizedText,
    // }).then(response => {
    //   console.log('Image saved successfully:', response.data);
    //   Alert.alert(
    //     'Lectura Enviada',
    //     'Su lectura se ha enviado',
    //     [
    //       {
    //         text: 'OK',
    //         onPress: () => navigation.navigate('HomeScreen'),
    //       },
    //     ],
    //     { cancelable: false }
    //   );
    // }).catch(error => {
    //   console.error('Error saving image:', error);
    //   Alert.alert('Error', 'Failed to save image');
    // });

    // Simulación de la lógica de envío y alerta
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

  return (
    <View style={styles.container}>
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      {recognizedText && (
        <Text style={styles.text}>
          {typeof recognizedText === 'object' ? JSON.stringify(recognizedText, null, 2) : recognizedText}
        </Text>
      )}
      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Retomar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Enviar imagen</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  text: {
    marginBottom: 20,
  },
  button: {
    width: '80%',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#FF1493',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PreviewScreen;
