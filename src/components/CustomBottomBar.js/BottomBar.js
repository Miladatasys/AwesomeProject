import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, PermissionsAndroid, Platform, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';

const BottomBar = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [activeTab, setActiveTab] = useState('home');

  useFocusEffect(
    React.useCallback(() => {
      switch (route.name) {
        case 'HomeScreen':
          setActiveTab('home');
          break;
        case 'HelpScreen':
          setActiveTab('help');
          break;
        case 'FAQScreen':
          setActiveTab('faq');
          break;
        case 'TemasGeneralesScreen':
          setActiveTab('temasGenerales');
          break;
        case 'ClientProfileScreen':
          setActiveTab('profile');
          break;
        default:
          setActiveTab('home');
          break;
      }
    }, [route.name])
  );

  const requestPermissions = async () => {
    try {
      const cameraPermission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA
      );
      const audioPermission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO
      );

      if (cameraPermission === PermissionsAndroid.RESULTS.GRANTED && audioPermission === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      } else {
        Alert.alert('Permisos no otorgados', 'Permisos de Cámara o Micrófono denegados');
        return false;
      }
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  const handleTabPress = async (tabName) => {
    setActiveTab(tabName);
    switch (tabName) {
      case 'home':
        navigation.navigate('HomeScreen');
        break;
      case 'help':
        navigation.navigate('HelpScreen');
        break;
      case 'faq':
        navigation.navigate('FAQScreen');
        break;
      case 'temasGenerales':
        navigation.navigate('TemasGeneralesScreen');
        break;
      case 'camera':
        if (Platform.OS === 'android') {
          const hasPermissions = await requestPermissions();
          if (hasPermissions) {
            navigation.navigate('CameraScreen');
          }
        } else {
          navigation.navigate('CameraScreen');
        }
        break;
      case 'profile':
        navigation.navigate('ClientProfileScreen');
        break;
      default:
        navigation.navigate('HomeScreen');
        break;
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.tab, activeTab === 'home' && styles.activeTab]}
        onPress={() => handleTabPress('home')}>
        <Icon name="home" size={24} color={activeTab === 'home' ? '#FE0F64' : '#2F2F2F'} />
        <Text style={[styles.tabText, activeTab === 'home' && styles.activeTabText]}>Inicio</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tab, activeTab === 'help' && styles.activeTab]}
        onPress={() => handleTabPress('help')}>
        <Icon name="question-circle" size={24} color={activeTab === 'help' ? '#FE0F64' : '#2F2F2F'} />
        <Text style={[styles.tabText, activeTab === 'help' && styles.activeTabText]}>Ayuda</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.cameraButton}
        onPress={() => handleTabPress('camera')}>
        <Icon name="camera" size={32} color={activeTab === 'camera' ? '#FE0F64' : '#2F2F2F'} />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tab, activeTab === 'faq' && styles.activeTab]}
        onPress={() => handleTabPress('faq')}>
        <Icon name="info-circle" size={24} color={activeTab === 'faq' ? '#FE0F64' : '#2F2F2F'} />
        <Text style={[styles.tabText, activeTab === 'faq' && styles.activeTabText]}>FAQ</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tab, activeTab === 'profile' && styles.activeTab]}
        onPress={() => handleTabPress('profile')}>
        <Icon name="user" size={24} color={activeTab === 'profile' ? '#FE0F64' : '#2F2F2F'} />
        <Text style={[styles.tabText, activeTab === 'profile' && styles.activeTabText]}>Perfil</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 60,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  tab: {
    alignItems: 'center',
  },
  tabText: {
    fontSize: 12,
    marginTop: 2,
    color: '#2F2F2F',
  },
  activeTab: {
    color: '#FE0F64',
  },
  activeTabText: {
    color: '#FE0F64',
  },
  cameraButton: {
    position: 'center',
    top: -20,
    justifyContent: 'center',
    alignItems: 'center',
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
  },
});

export default BottomBar;
