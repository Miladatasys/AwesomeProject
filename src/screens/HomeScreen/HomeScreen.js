import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import BottomBar from "../../components/CustomBottomBar.js/BottomBar";
import ClientHeader from "../../components/CustomHeader/ClientHeader";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
    const navigation = useNavigation();

    const cliente = {
        nombre: "Juan Pérez",
        direccion: {
            calle: "Calle Principal",
            numero: "123",
            comuna: "Santiago",
            numeroCliente: "0001"
        }
    };

    const handleNavigateToAddMeter = () => {
        navigation.navigate('AddressScreen');
    };

    const handleBackPress = () => {
        Alert.alert(
            "¿Estás seguro?",
            "¿Quieres volver al inicio de sesión?",
            [
                {
                    text: "No",
                    style: "cancel"
                },
                {
                    text: "Sí",
                    onPress: () => navigation.navigate('SignIn')
                }
            ]
        );
    };

    return (
        <>
            <View style={styles.container}>
                <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
                    <Text style={styles.backButtonText}>Volver atrás</Text>
                </TouchableOpacity>
                <ClientHeader nombreCliente={cliente.nombre} direccion={cliente.direccion} />
                <TouchableOpacity style={styles.button} onPress={handleNavigateToAddMeter}>
                    <Text style={styles.buttonText}>Ingrese su medidor</Text>
                </TouchableOpacity>
            </View>
            <BottomBar />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'flex-start',
    },
    backButton: {
        alignSelf: 'flex-start',
        marginVertical: 10,
    },
    backButtonText: {
        fontSize: 16,
        color: '#4271d4',
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: '#FFFFFF',
        borderColor: '#4271d4',
        borderWidth: 2,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
        marginTop: -10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 5,
    },
    buttonText: {
        fontSize: 16,
        color: '#4271d4',
        textAlign: 'center',
        fontWeight: 'bold',
    },
});

export default HomeScreen;
