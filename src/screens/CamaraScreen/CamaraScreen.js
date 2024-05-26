import React from 'react';
import { View, Button, StyleSheet, Alert } from 'react-native';
import { launchCamera } from 'react-native-image-picker';

const CameraScreen = () => {
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
        console.log('Camera response', response);
      }
    });
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
