import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../../components/CustomButton';
import comunasData from '../../components/data/Comunas.json';

const AddressScreen = () => {
  const [region, setRegion] = useState(null);
  const [comuna, setComuna] = useState(null);
  const [direccion, setDireccion] = useState('');
  const [comunasList, setComunasList] = useState([]);
  const [openRegion, setOpenRegion] = useState(false);
  const [openComuna, setOpenComuna] = useState(false);

  const regionOptions = comunasData.map(region => ({
    label: region.region,
    value: region.region
  }));

  useEffect(() => {
    if (region) {
      const selectedRegion = comunasData.find(r => r.region === region);
      setComunasList(
        selectedRegion ? selectedRegion.comunas.map(comuna => ({
          label: comuna.name,
          value: comuna.name
        })) : []
      );
      setComuna(null); // Resetear la comuna cuando se cambia la región
    }
  }, [region]);

  const onSubmit = () => {
    if (!direccion) {
      Alert.alert('Error', 'Por favor, ingrese su dirección.');
      return;
    }

    // Aquí puedes manejar el envío del formulario
    console.log(`Región: ${region}, Comuna: ${comuna}, Dirección: ${direccion}`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.root}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Región:</Text>
            <DropDownPicker
              open={openRegion}
              value={region}
              items={regionOptions}
              setOpen={setOpenRegion}
              setValue={setRegion}
              containerStyle={styles.dropdownContainer}
              style={styles.dropdown}
              dropDownContainerStyle={styles.dropdownContainerStyle}
              placeholder="Seleccione una región"
              onChangeValue={(value) => setRegion(value)}
              zIndex={3000}
              zIndexInverse={1000}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Comuna:</Text>
            <DropDownPicker
              open={openComuna}
              value={comuna}
              items={comunasList}
              setOpen={setOpenComuna}
              setValue={setComuna}
              containerStyle={styles.dropdownContainer}
              style={styles.dropdown}
              dropDownContainerStyle={styles.dropdownContainerStyle}
              placeholder="Seleccione una comuna"
              disabled={!region}
              onChangeValue={(value) => setComuna(value)}
              zIndex={2000}
              zIndexInverse={2000}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Dirección:</Text>
            <TextInput
              style={styles.input}
              placeholder="Ingrese su dirección"
              value={direccion}
              onChangeText={setDireccion}
            />
          </View>

          <View style={styles.buttonContainer}>
            <CustomButton text="Enviar" onPress={onSubmit} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  root: {
    flex: 1,
    padding: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  label: {
    width: '100%',
    marginBottom: 5,
    color: '#2F2F2F',
  },
  dropdownContainer: {
    width: '100%',
    marginBottom: 20,
  },
  dropdown: {
    backgroundColor: '#fafafa',
  },
  dropdownContainerStyle: {
    backgroundColor: '#fafafa',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#F6F6F6',
    borderRadius: 5,
    paddingHorizontal: 10,
    color: '#2F2F2F',
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
});

export default AddressScreen;
