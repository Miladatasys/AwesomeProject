import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';

const AdminBottomBar = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [activeTab, setActiveTab] = useState('home');

  useFocusEffect(
    React.useCallback(() => {
      switch (route.name) {
        case 'AdminHomeScreen':
          setActiveTab('home');
          break;
        case 'EditAdminProfileScreen':
          setActiveTab('editProfile');
          break;
        default:
          setActiveTab('home');
          break;
      }
    }, [route.name])
  );

  const handleTabPress = (tabName) => {
    setActiveTab(tabName);
    switch (tabName) {
      case 'home':
        navigation.navigate('AdminHomeScreen');
        break;
      case 'editProfile':
        navigation.navigate('EditAdminProfileScreen');
        break;
      default:
        navigation.navigate('AdminHomeScreen');
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
        style={[styles.tab, activeTab === 'editProfile' && styles.activeTab]}
        onPress={() => handleTabPress('editProfile')}>
        <Icon name="user" size={24} color={activeTab === 'editProfile' ? '#FE0F64' : '#2F2F2F'} />
        <Text style={[styles.tabText, activeTab === 'editProfile' && styles.activeTabText]}>Editar Perfil</Text>
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
});

export default AdminBottomBar;
