import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Por ejemplo, utilizando FontAwesome como librería de íconos

const BottomBar = () => {
  const [activeTab, setActiveTab] = useState('home');

  const handleTabPress = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.tab, activeTab === 'home' && styles.activeTab]}
        onPress={() => handleTabPress('home')}>
        <Icon name="home" size={24} color={activeTab === 'home' ? '#FE0F64' : '#2F2F2F'} />
        <Text style={[styles.tabText, activeTab === 'home' && styles.activeTabText]}>Mi Consumo</Text>
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
    height: 60, // Ajusta la altura según tus necesidades
    backgroundColor: '#fff', // Color de fondo
    flexDirection: 'row', // Dirección de los elementos
    justifyContent: 'space-around', // Ajuste de los elementos dentro de la barra
    alignItems: 'center', // Alineación vertical
    borderTopWidth: 1, // Borde superior
    borderTopColor: '#ccc', // Color del borde superior
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
