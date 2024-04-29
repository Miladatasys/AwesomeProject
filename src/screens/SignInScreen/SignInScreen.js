import React, { useState } from "react";
import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView, TextInput, TouchableOpacity } from "react-native";
import Logo from "../../../assets/images/Enel.png";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";

const SignInScreen = () => {
    const [rut, setRut] = useState('');
    const [password, setPassword] = useState('');
    const [rutError, setRutError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const { height } = useWindowDimensions();
    const navigation = useNavigation();

    const validateRut = () => {
        if (!rut.trim()) {
            setRutError('Ingrese su rut');
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
        } else {
            setPasswordError('');
            return true;
        }
    };

    const onSignInPressed = () => {
        if (validateRut() && validatePassword()) {
            // Validar al usuario (conexión con el backend)
            navigation.navigate('HomeScreen');
        }
    };

    const onForgotPasswordPressed = () => {
        navigation.navigate('ForgotPassword');
    };

    const onSignUpPressed = () => {
        navigation.navigate('SignUp');
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.root}>
                <Image 
                    source={Logo} 
                    style={[styles.logo, { height: height * 0.3 }]} 
                    resizeMode="contain" 
                />

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Ingrese su rut:</Text>
                    <TextInput
                        style={[styles.input, rutError && styles.inputError]}
                        placeholder="XX.XXX.XXX-X"
                        value={rut}
                        onChangeText={(text) => setRut(text)}
                        onBlur={validateRut}
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
                    />
                    {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
                </View>

                <CustomButton text="Ingresar" onPress={onSignInPressed}/>

                <View style={styles.buttonsContainer}>
                    <TouchableOpacity style={styles.button} onPress={onForgotPasswordPressed}>
                        <Text style={styles.buttonText}>¿Olvidaste tu contraseña?</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={onSignUpPressed}>
                        <Text style={styles.buttonText}>Crear una cuenta</Text>
                    </TouchableOpacity>
                </View>
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
        width: '70%',
        maxWidth: 300,
        maxHeight: 200,
    },
    inputContainer: {
        width: '100%',
        marginBottom: 20,
    },
    label: {
        marginBottom: 5,
        color: '#2F2F2F',
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
    inputError: {
        borderColor: '#FE0F64',
    },
    errorText: {
        color: '#FE0F64',
        fontSize: 12,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 20,
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
    },
});

export default SignInScreen;
