import React, { useState } from 'react';
import { View, Button, StyleSheet, Alert } from 'react-native';
import { launchCamera } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import RNFS from 'react-native-fs';

const CameraScreen = () => {
  const navigation = useNavigation();
  const [imageUri, setImageUri] = useState(null);
  const [recognizedText, setRecognizedText] = useState(null);

  const openCamera = () => {
    const options = {
      mediaType: 'photo',
      cameraType: 'back',
      saveToPhotos: true,
    };

    launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled camera picker');
      } else if (response.errorCode) {
        Alert.alert('Error', response.errorMessage);
      } else {
        const uri = response.assets[0].uri;
        setImageUri(uri);
        console.log('Image URI:', uri);
        processImage(uri);
      }
    });
  };

  const convertImageToBase64 = async (uri) => {
    try {
      const base64String = await RNFS.readFile(uri, 'base64');
      console.log('Base64 Image:', base64String);
      return base64String;
    } catch (error) {
      console.error('Error converting image to base64', error);
      throw error;
    }
  };

  const processImage = async (uri) => {
    try {
      const base64Image = await convertImageToBase64(uri);
      const response = await axios.post(
        'https://tbnmzqmst6.execute-api.us-east-1.amazonaws.com/rekognition/our-rekognition',
        JSON.stringify({ body: base64Image }),
        { headers: { 'Content-Type': 'application/json' } }
      );
      console.log('Response from Rekognition:', response.data);
      setRecognizedText(response.data);
      navigation.navigate('PreviewScreen', { imageUri: uri, recognizedText: response.data });
    } catch (error) {
      console.error('Error processing image:', error);
      Alert.alert('Error', 'Failed to process image');
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Open Camera" onPress={openCamera} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CameraScreen;
