import React, { useState } from "react";
import { View, Text, Image, StyleSheet, ScrollView, TextInput, TouchableOpacity, Dimensions } from "react-native";
import Logo from "../../../assets/images/Tecnico.png";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";

const AdminSignInScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const navigation = useNavigation();

    const validateFields = () => {
        let valid = true;
        if (!email.trim() || !email.endsWith('@enel.cl')) {
            setEmailError('Ingrese un correo electrónico válido de Enel');
            valid = false;
        } else {
            setEmailError('');
        }
        if (!password.trim()) {
            setPasswordError('Ingrese su contraseña');
            valid = false;
        } else {
            setPasswordError('');
        }
        return valid;
    };

    const handleSignIn = () => {
        if (validateFields()) {
            // Aquí agregarías la lógica para el inicio de sesión con el backend
            // Si el inicio de sesión es exitoso, navegar a la pantalla de inicio del administrador
            navigation.navigate('AdminHomeScreen'); // Ajusta este nombre si es diferente en tu aplicación
        }
    };

    const onForgotPasswordPressed = () => {
        navigation.navigate('AdminForgotPassword');
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Iniciar sesión como administrador</Text>
            <TouchableOpacity style={styles.goBackContainer} onPress={() => navigation.goBack()}>
                <Text style={styles.goBackText}>Volver</Text>
            </TouchableOpacity>
            <View style={styles.imageContainer}>
                <Image source={Logo} style={styles.logo} />
            </View>

            <Text style={styles.label}>Ingrese su correo:</Text>
            <TextInput
                style={styles.input}
                placeholder="ejemplo@enel.cl"
                value={email}
                onChangeText={setEmail}
            />
            {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

            <Text style={styles.label}>Ingrese su contraseña:</Text>
            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

            <CustomButton text="Ingresar" onPress={handleSignIn} />

            <TouchableOpacity onPress={onForgotPasswordPressed}>
                <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 0,
    },
    goBackContainer: {
        position: 'absolute',
        top: 105,
        left: 20,
        zIndex: 1,
    },
    goBackText: {
        fontSize: 18,
        fontWeight: "bold",
        color: '#4271d4',
    },
    imageContainer: {
        width: windowWidth - 40, // 20 padding a cada lado
        aspectRatio: 2, 
        marginBottom: 20,
        overflow: "hidden",
        borderRadius: 10,
    },
    logo: {
        width: "100%",
        height: "100%",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginVertical: 20,
        textAlign: "center",
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        color: '#2F2F2F',
        textAlign: 'left',
    },
    input: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: '#F6F6F6',
        borderRadius: 5,
        paddingHorizontal: 10,
        color: '#2F2F2F',
        marginBottom: 10,
    },
    errorText: {
        color: '#FE0F64',
        fontSize: 12,
        textAlign: "center",
    },
    forgotPasswordText: {
        color: '#4271d4',
        marginTop: 10,
    },
});

export default AdminSignInScreen;







