import React, { useState } from "react";
import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView, TextInput, TouchableOpacity, Alert } from "react-native";
import axios from "axios";
import Logo from "../../../assets/images/Enel.png";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";

const SignInScreen = () => {
    const [rut, setRut] = useState('');
    const [password, setPassword] = useState('');
    const [rutError, setRutError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const { width } = useWindowDimensions();
    const navigation = useNavigation();

    const validateRut = () => {
        const rutRegex = /^[0-9]+-[0-9kK]{1}$/;
        if (!rut.trim()) {
            setRutError('Ingrese su rut');
            return false;
        } else if (!rutRegex.test(rut)) {
            setRutError('Rut no válido');
            return false;
        } else {
            setRutError('');
            return true;
        }
    };

    const validatePassword = () => {
        if (!password.trim()) {
            setPasswordError('Ingrese su contraseña');
            return false;
        } else if (password.length < 8) {
            setPasswordError('La contraseña debe tener al menos 8 caracteres');
            return false;
        } else {
            setPasswordError('');
            return true;
        }
    };

    const validateFields = () => {
        let valid = true;
        if (!validateRut()) valid = false;
        if (!validatePassword()) valid = false;
        return valid;
    };

    const onSignInPressed = () => {
        if (validateFields()) {
            const user = {
                rut,
                password
            };

            axios.post('http://10.0.2.2:8080/auth/login', user)
                .then((response) => {
                    if (response.data.success) {
                        navigation.navigate('HomeScreen');
                    } else {
                        Alert.alert('Error', response.data.message || 'Error en la respuesta del servidor');
                    }
                })
                .catch((error) => {
                    if (error.response) {
                        console.error('Respuesta del servidor:', error.response.data);
                        Alert.alert('Error', error.response.data.message || 'Error en la respuesta del servidor');
                    } else if (error.request) {
                        console.error('Solicitud realizada, sin respuesta:', error.request);
                        Alert.alert('Error', 'No se recibió respuesta del servidor');
                    } else {
                        console.error('Error al configurar la solicitud:', error.message);
                        Alert.alert('Error', 'Error al configurar la solicitud: ' + error.message);
                    }
                    console.error('Detalles del error:', error.config);
                });
        }
    };

    const onForgotPasswordPressed = () => {
        navigation.navigate('ForgotPassword');
    };

    const onSignUpPressed = () => {
        navigation.navigate('SignUp');
    };

    const onAdminLoginPressed = () => {
        navigation.navigate('AdminSignIn');
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.root}>
                <Image 
                    source={Logo} 
                    style={[styles.logo, { width: width * 0.7 }]} 
                    resizeMode="contain" 
                />

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Ingrese su rut:</Text>
                    <TextInput
                        style={[styles.input, rutError && styles.inputError]}
                        placeholder="11111111-1"
                        value={rut}
                        onChangeText={(text) => setRut(text)}
                        onBlur={validateRut}
                        fontFamily="Roboto-Regular"
                    />
                    {rutError ? <Text style={styles.errorText}>{rutError}</Text> : null}
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Ingrese su contraseña:</Text>
                    <TextInput
                        style={[styles.input, passwordError && styles.inputError]}
                        placeholder="Contraseña"
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        onBlur={validatePassword}
                        secureTextEntry
                        fontFamily="Roboto-Regular"
                    />
                    {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
                </View>

                <CustomButton text="Ingresar" onPress={onSignInPressed} />

                <View style={styles.buttonsContainer}>
                    <TouchableOpacity style={styles.button} onPress={onForgotPasswordPressed}>
                        <Text style={styles.buttonText}>¿Olvidaste tu contraseña?</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={onSignUpPressed}>
                        <Text style={styles.buttonText}>Crear una cuenta</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={onAdminLoginPressed}>
                    <Text style={styles.adminButtonText}>Ingresar como Administrador</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 20,
    },
    logo: {
        maxHeight: 200,
        marginBottom: 20,
    },
    inputContainer: {
        width: '100%',
        marginBottom: 20,
    },
    label: {
        marginBottom: 5,
        color: '#2F2F2F',
        fontFamily: 'Roboto-Regular',
    },
    input: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: '#F6F6F6',
        borderRadius: 5,
        paddingHorizontal: 10,
        color: '#2F2F2F',
        fontFamily: 'Roboto-Regular',
    },
    inputError: {
        borderColor: '#FE0F64',
    },
    errorText: {
        color: '#FE0F64',
        fontSize: 12,
        fontFamily: 'Roboto-Regular',
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 20,
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#4271d4',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontFamily: 'Roboto-Regular',
    },
    adminButtonText: {
        color: '#2F2F2F',
        marginTop: 30, 
        textAlign: 'left', 
        alignSelf: 'flex-start', 
        marginLeft: 20,
        fontFamily: 'Roboto-Regular',
    }
});

export default SignInScreen;
