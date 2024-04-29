import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const SignUpScreen = () => {
    const [rut, setRut] = useState('');
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [rutError, setRutError] = useState('');
    const [emailError, setEmailError] = useState(''); 
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    
    const navigation = useNavigation();

    const validateFields = () => {
        let valid = true;

        if (!rut.trim()) {
            setRutError('Ingrese su rut');
            valid = false;
        } else {
            setRutError('');
        }

        if (!email.trim()) {
            setEmailError('Ingrese su email');
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

        if (!confirmPassword.trim()) {
            setConfirmPasswordError('Confirme su contraseña');
            valid = false;
        } else if (confirmPassword !== password) {
            setConfirmPasswordError('Las contraseñas no coinciden');
            valid = false;
        } else {
            setConfirmPasswordError('');
        }

        return valid;
    };

    const onRegisterPressed = () => {
        if (validateFields()) {
            navigation.navigate('ConfirmEmail');
        }
    };

    const onSignInPressed = () => {
        navigation.navigate('SignIn');
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.root}>
                <Image 
                    source={require("../../../assets/images/Familia.jpg")} 
                    style={styles.image} 
                    resizeMode="cover" 
                />

                <Text style={styles.title}>Crea una cuenta</Text>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Rut:</Text>
                    <TextInput
                        style={[styles.input, rutError && styles.inputError]}
                        placeholder="XX.XXX.XXX-X"
                        value={rut}
                        onChangeText={setRut}
                    />
                    {rutError ? <Text style={styles.errorText}>{rutError}</Text> : null}
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Email:</Text>
                    <TextInput
                        style={[styles.input, emailError && styles.inputError]}
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                    />
                    {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Contraseña:</Text>
                    <TextInput
                        style={[styles.input, passwordError && styles.inputError]}
                        placeholder="Contraseña"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />
                    {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Confirmar Contraseña:</Text>
                    <TextInput
                        style={[styles.input, confirmPasswordError && styles.inputError]}
                        placeholder="Confirmar Contraseña"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        secureTextEntry
                    />
                    {confirmPasswordError ? <Text style={styles.errorText}>{confirmPasswordError}</Text> : null}
                </View>

                <TouchableOpacity style={[styles.button, { backgroundColor: '#FE0F64' }]} onPress={onRegisterPressed}>
                    <Text style={[styles.buttonText, { color: '#FFFFFF' }]}>Registrarse</Text>
                </TouchableOpacity>


                <TouchableOpacity style={[styles.button, styles.tertiaryButton]} onPress={onSignInPressed}>
                    <Text style={[styles.buttonText, styles.tertiaryButtonText]}>¿Tienes una cuenta? Inicia sesión</Text>
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
    image: {
        width: '90%',
        height: 300,
        borderRadius: 10,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2F2F2F',
        marginVertical: 10,
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
    button: {
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginBottom: 10,
    },
    buttonText: {
        color: '#2F2F2F',
        fontSize: 14,
        textAlign: 'center',
    },
});

export default SignUpScreen;
