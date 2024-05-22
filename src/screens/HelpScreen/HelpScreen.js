import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const HelpScreen = () => {
    const cliente = {
        nombre: "Juan Pérez",
        direccion: {
            calle: "Calle Principal",
            numero: "123",
            comuna: "Santiago",
            numeroCliente: "0001"
        }
    };

    const [motivo, setMotivo] = useState(null);
    const [comentario, setComentario] = useState('');
    const [openMotivo, setOpenMotivo] = useState(false);

    const navigation = useNavigation();

    const motivoOptions = [
        { label: 'Reclamo', value: 'Reclamo' },
        { label: 'Consulta', value: 'Consulta' },
        { label: 'Solicitud', value: 'Solicitud' },
    ];

    const handleEnviar = () => {
        if (!motivo) {
            Alert.alert('Error', 'Por favor, seleccione un motivo.');
            return;
        }
        if (!comentario) {
            Alert.alert('Error', 'Por favor, ingrese un comentario.');
            return;
        }
        Alert.alert(
            'Éxito',
            'Mensaje enviado con éxito.',
            [
                {
                    text: 'OK',
                    onPress: () => navigation.navigate('HomeScreen'),
                }
            ]
        );
    };

    const handleBackPress = () => {
        Alert.alert(
            "¿Estás seguro?",
            "¿Quieres volver al inicio?",
            [
                {
                    text: "No",
                    style: "cancel"
                },
                {
                    text: "Sí",
                    onPress: () => navigation.navigate('HomeScreen')
                }
            ]
        );
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
                    <Text style={styles.backButtonText}>Volver</Text>
                </TouchableOpacity>
                <Text style={styles.title}>Suministro del Cliente</Text>
                <View style={styles.clientInfo}>
                    <Text style={styles.infoText}>Nombre: {cliente.nombre}</Text>
                    <Text style={styles.infoText}>Dirección: {cliente.direccion.calle} {cliente.direccion.numero}, {cliente.direccion.comuna}</Text>
                    <Text style={styles.infoText}>Número de Cliente: {cliente.direccion.numeroCliente}</Text>
                </View>
                <Text style={styles.label}>Motivo:</Text>
                <DropDownPicker
                    open={openMotivo}
                    value={motivo}
                    items={motivoOptions}
                    setOpen={setOpenMotivo}
                    setValue={setMotivo}
                    containerStyle={styles.dropdownContainer}
                    style={styles.dropdown}
                    dropDownContainerStyle={styles.dropdownContainerStyle}
                    placeholder="Seleccione un motivo"
                />
                <Text style={styles.label}>Comentario:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Ingrese su comentario"
                    value={comentario}
                    onChangeText={setComentario}
                    multiline
                />
                <TouchableOpacity style={styles.button} onPress={handleEnviar}>
                    <Text style={styles.buttonText}>Enviar</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    container: {
        flex: 1,
        padding: 20,
    },
    backButton: {
        alignSelf: 'flex-start',
        marginBottom: 10,
    },
    backButtonText: {
        fontSize: 16,
        color: '#4271d4',
        fontWeight: 'bold',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#2F2F2F',
    },
    clientInfo: {
        marginBottom: 20,
    },
    infoText: {
        fontSize: 16,
        marginBottom: 5,
        color: '#2F2F2F',
    },
    label: {
        fontSize: 16,
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
    input: {
        width: '100%',
        height: 100,
        borderWidth: 1,
        borderColor: '#F6F6F6',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingTop: 10,
        color: '#2F2F2F',
        marginBottom: 20,
        textAlignVertical: 'top',
    },
    button: {
        backgroundColor: '#FE0F64',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 5,
    },
    buttonText: {
        fontSize: 16,
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
});

export default HelpScreen;