import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

const ConfirmEmailScreen = () => {
    const [code, setCode] = useState(["", "", "", ""]);
    const [generatedCode, setGeneratedCode] = useState(generateRandomCode());
    const navigation = useNavigation();

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
            navigation.navigate('HomeScreen'); // Cambiado a HomeScreen
        } else {
            Alert.alert("Error", "Código de verificación incorrecto.");
        }
    };

    const handleResend = () => {
        const newCode = generateRandomCode();
        setGeneratedCode(newCode);
        // Simulación del envío del código por email
        sendCodeByEmail(newCode.join(""));
        Alert.alert("Código reenviado", "El código ha sido reenviado a tu correo.");
    };

    const sendCodeByEmail = (code) => {
        // Aquí se simula el envío del código por email
        console.log(`Código enviado al email: ${code}`);
        // Aquí implementar la lógica real de envío de email
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Verifica tu email</Text>
            <Text style={styles.subtitle}>Por favor, ingrese el código de 4 dígitos enviado a tu correo</Text>
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
            <TouchableOpacity onPress={handleResend}>
                <Text style={styles.resendText}>Reenviar código</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleConfirm}>
                <Text style={styles.buttonText}>Confirmar</Text>
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
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
        fontFamily: 'Roboto-Bold',
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
        borderWidth: 1,
        borderColor: "#cccccc",
        borderRadius: 10,
        textAlign: "center",
        fontSize: 24,
        backgroundColor: "#f8f8f8",
        fontFamily: 'Roboto-Regular',
    },
    resendText: {
        color: "#007BFF",
        marginBottom: 20,
        fontFamily: 'Roboto-Regular',
    },
    button: {
        backgroundColor: "#007BFF",
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
});

export default ConfirmEmailScreen;
