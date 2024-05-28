import React from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const PreviewScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { imageUri, recognizedText } = route.params;

  console.log('PreviewScreen imageUri:', imageUri);
  console.log('PreviewScreen recognizedText:', recognizedText);

  return (
    <View style={styles.container}>
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      {recognizedText && (
        <Text style={styles.text}>
          {typeof recognizedText === 'object' ? JSON.stringify(recognizedText, null, 2) : recognizedText}
        </Text>
      )}
      <Button title="Retake" onPress={() => navigation.goBack()} />
      <Button title="Submit" onPress={() => {/* lógica para enviar la imagen */}} />
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
});

export default PreviewScreen;
