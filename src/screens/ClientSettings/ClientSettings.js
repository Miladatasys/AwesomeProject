import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ClientSettings = () => {
  const navigation = useNavigation();
  const [isNotificationsEnabled, setIsNotificationsEnabled] = React.useState(false);
  const [isDarkModeEnabled, setIsDarkModeEnabled] = React.useState(false);

  const toggleNotifications = () => setIsNotificationsEnabled(previousState => !previousState);
  const toggleDarkMode = () => setIsDarkModeEnabled(previousState => !previousState);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButtonContainer}>
        <Icon name="arrow-back" size={24} color="#4271d4" />
        <Text style={styles.backButton}>Volver</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Configuraciones</Text>
      <View style={styles.settingContainer}>
        <Text style={styles.settingText}>Notificaciones</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isNotificationsEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleNotifications}
          value={isNotificationsEnabled}
        />
      </View>
      <View style={styles.settingContainer}>
        <Text style={styles.settingText}>Modo Oscuro</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isDarkModeEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleDarkMode}
          value={isDarkModeEnabled}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#E8EAF6',
  },
  backButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    fontSize: 16,
    color: '#4271d4',
    marginLeft: 5,
    fontWeight: 'bold',
    fontFamily: 'Roboto-Regular',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#2F2F2F',
    fontFamily: 'Roboto-Bold',
  },
  settingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  settingText: {
    fontSize: 18,
    color: '#2F2F2F',
    fontFamily: 'Roboto-Regular',
  },
});

export default ClientSettings;
