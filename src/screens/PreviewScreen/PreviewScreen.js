import React from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const PreviewScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { imageUri, recognizedText } = route.params;

  // Asegúrate de mostrar solo las partes relevantes del objeto recognizedText
  const recognizedTextString = recognizedText ? JSON.stringify(recognizedText, null, 2) : 'No text recognized';

  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUri }} style={styles.image} />
      <Text style={styles.text}>{recognizedTextString}</Text>
      <Button title="Retake" onPress={() => navigation.navigate('CameraScreen')} />
      <Button title="Submit" onPress={() => console.log('Submit pressed')} />
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
    width: 300,
    height: 300,
  },
  text: {
    margin: 20,
    textAlign: 'center',
  },
});

export default PreviewScreen;
