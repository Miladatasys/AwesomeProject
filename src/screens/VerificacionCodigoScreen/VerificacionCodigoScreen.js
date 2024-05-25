import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const VerificacionCodigoScreen = () => {
    const [code, setCode] = useState(["", "", "", ""]);
    const [generatedCode, setGeneratedCode] = useState(generateRandomCode());
    const navigation = useNavigation();
    const route = useRoute();
    const email = route.params.email;

    useEffect(() => {
        sendCodeByEmailOrSMS(generatedCode.join(""));
    }, []);

    function generateRandomCode() {
        const randomCode = Math.floor(1000 + Math.random() * 9000).toString();
        return randomCode.split("");
    }

    const handleCodeChange = (text, index) => {
        const newCode = [...code];
        newCode[index] = text;
        setCode(newCode);
    };

    const handleConfirm = () => {
        if (code.join("") === generatedCode.join("")) {
            Alert.alert("Éxito", "Código de verificación correcto.");
            navigation.navigate('HomeScreen');
        } else {
            Alert.alert("Error", "Código de verificación incorrecto.");
        }
    };

    const handleResend = () => {
        const newCode = generateRandomCode();
        setGeneratedCode(newCode);
        sendCodeByEmailOrSMS(newCode.join(""));
        Alert.alert("Código reenviado", "El código ha sido reenviado.");
    };

    const sendCodeByEmailOrSMS = (code) => {
        axios.post('https://zay6amugsl.execute-api.us-east-1.amazonaws.com/Api/my-enel/send-code', { code, email })
            .then(response => {
                if (response.data.success) {
                    console.log('Código enviado:', code);
                } else {
                    Alert.alert('Error', 'No se pudo enviar el código. Inténtelo de nuevo.');
                }
            })
            .catch(error => {
                console.error('Error al enviar el código:', error);
                Alert.alert('Error', 'Hubo un problema al enviar el código. Inténtelo de nuevo.');
            });
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButtonContainer}>
                <Icon name="arrow-back" size={24} color="#4271d4" />
                <Text style={styles.backButtonText}>Volver</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Confirmación</Text>
            <Text style={styles.subtitle}>Ingrese el código de 4 dígitos enviado a {email}</Text>
            <View style={styles.codeContainer}>
                {code.map((digit, index) => (
                    <TextInput
                        key={index}
                        style={styles.input}
                        value={digit}
                        onChangeText={(text) => handleCodeChange(text, index)}
                        keyboardType="numeric"
                        maxLength={1}
                    />
                ))}
            </View>
            <TouchableOpacity style={styles.button} onPress={handleConfirm}>
                <Text style={styles.buttonText}>Siguiente</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleResend}>
                <Text style={styles.resendText}>Reenviar código</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        padding: 20,
        backgroundColor: "#fff",
    },
    backButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        marginBottom: 20,
    },
    backButtonText: {
        fontSize: 16,
        color: '#4271d4',
        marginLeft: 5,
        fontWeight: 'bold',
        fontFamily: 'Roboto-Regular',
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
        fontFamily: 'Roboto-Bold',
        color: '#3b3b3b',
    },
    subtitle: {
        fontSize: 16,
        textAlign: "center",
        marginBottom: 20,
        color: "#7a7a7a",
        fontFamily: 'Roboto-Regular',
    },
    codeContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "80%",
        marginBottom: 20,
    },
    input: {
        width: 50,
        height: 50,
        borderWidth: 2,
        borderColor: "#cccccc",
        borderRadius: 10,
        textAlign: "center",
        fontSize: 28,
        backgroundColor: "#ffffff",
        fontFamily: 'Roboto-Regular',
    },
    button: {
        backgroundColor: "#FE0F64",
        paddingVertical: 15,
        paddingHorizontal: 60,
        borderRadius: 5,
        marginBottom: 20,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
        fontFamily: 'Roboto-Bold',
    },
    resendText: {
        color: "#4B3F6B",
        fontFamily: 'Roboto-Regular',
    },
});

export default VerificacionCodigoScreen;
