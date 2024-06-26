import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';

const NewPasswordScreen = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [passwordStrength, setPasswordStrength] = useState(0);
    const route = useRoute();
    const email = route.params.email;
    const navigation = useNavigation();

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}$/;

    const validateInputs = () => {
        let isValid = true;
        if (!newPassword.trim()) {
            setPasswordError('Ingrese la nueva contraseña');
            isValid = false;
        } else if (newPassword.length < 8) {
            setPasswordError('La contraseña debe tener al menos 8 caracteres y máximo 15, una letra mayúscula, una letra minúscula y un número');
            isValid = false;
        } else if (!passwordRegex.test(newPassword)) {
            setPasswordError('La contraseña debe tener al menos 8 caracteres y máximo 15, una letra mayúscula, una letra minúscula y un número');
            isValid = false;
        } else {
            setPasswordError('');
        }

        if (!confirmNewPassword.trim()) {
            setConfirmPasswordError('Confirme la nueva contraseña');
            isValid = false;
        } else if (confirmNewPassword !== newPassword) {
            setConfirmPasswordError('Las contraseñas no coinciden');
            isValid = false;
        } else {
            setConfirmPasswordError('');
        }
        return isValid;
    };


    const calculatePasswordStrength = (password) => {
        let strength = 0;
        if (password.length >= 8) {
            strength += 1;
        }
        if (/[a-z]/.test(password)) {
            strength += 1;
        }
        if (/[A-Z]/.test(password)) {
            strength += 1;
        }
        if (passwordRegex.test(password)) {
            strength += 1;
        }
        return (strength / 4) * 100;
    };

    const calculateConfirmPassword = () => {
        if (confirmNewPassword !== newPassword) {
            return 100; // Si las contraseñas no coinciden, la fortaleza es 0%
        } else {
            return 0; // Si las contraseñas coinciden, la fortaleza es 100%
        }
    };


    const handlePasswordChange = (text) => {
        setNewPassword(text);
        const strength = calculatePasswordStrength(text);
        setPasswordStrength(strength);
        let isValid = true;
        if (!text.trim()) {
            setPasswordError('Ingrese la nueva contraseña');
            isValid = false;
        } else if (text.length < 8) {
            setPasswordError('La contraseña debe tener al menos 8 caracteres y máximo 15, una letra mayúscula, una letra minúscula y un número');
            isValid = false;
        } else if (!passwordRegex.test(text)) {
            setPasswordError('La contraseña debe tener al menos 8 caracteres y máximo 15, una letra mayúscula, una letra minúscula y un número');
            isValid = false;
        } else {
            setPasswordError('');
        }
    };
    
    
    const handleConfirmPasswordChange = (text) =>{
        setConfirmNewPassword(text); //
        let isValidConfirm = true;
        if (!text.trim()) {
            setConfirmPasswordError('Confirme la nueva contraseña');
            isValidConfirm = false;
        } else if (text !== newPassword) {
            setConfirmPasswordError('Las contraseñas no coinciden');
            isValidConfirm = false;
        } else {
            setConfirmPasswordError('');
        }

    };



    const onSubmitPressed = () => {
        if (validateInputs()) {
            console.log(email);
            console.log(newPassword);
            const payload = { email, newPassword };
            console.log('Payload:', payload);

            axios.put('http://192.168.1.88:8080/auth/update-password', payload)
                .then(response => {
                    if (response.data.success) {
                        Alert.alert('Éxito', 'Su contraseña ha sido actualizada correctamente');
                        navigation.navigate('SignIn');
                    } else {
                        Alert.alert('Error', response.data.token);
                    }
                })
                .catch(error => {
                    if (error.response) {
                        console.error('Respuesta del servidor:', error.response.data);
                        Alert.alert('Error', error.response.data.token );
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

    const onSignInPressed = () => {
        navigation.navigate('SignIn');
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.root}>
                <Text style={styles.title}>Cambia tu contraseña</Text>

                <CustomInput
                    placeholder="Nueva contraseña" 
                    value={newPassword} 
                    setValue={handlePasswordChange}
                    secureTextEntry
                    error={passwordError}
                />

                <View style={styles.passwordStrengthContainer}>
                    <View
                        style={[
                            styles.passwordStrengthIndicator,
                            {
                                width: `${passwordStrength}%`,
                                backgroundColor:
                            !newPassword || passwordStrength === 0
                            ? 'grey'
                                    :passwordStrength < 50
                                        ? 'grey'
                                        : passwordStrength < 75
                                            ? 'yellow'
                                            : 'green',
                            },
                        ]}
                    />
                </View>
                {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}


                <CustomInput
                    placeholder="Confirmar nueva contraseña" 
                    value={confirmNewPassword} 
                    setValue={handleConfirmPasswordChange}
                    secureTextEntry
                    error={confirmPasswordError}
                />
                <View style={styles.passwordStrengthContainer}>
                <View
                    style={[
                        styles.passwordStrengthIndicator,
                        {
                            width: `${calculateConfirmPassword()}%`,
                            backgroundColor: 
                            confirmNewPassword !== newPassword ? 'grey' : 'green',
                        },
                    ]}
                />
            </View>

                {confirmPasswordError ? <Text style={styles.errorText}>{confirmPasswordError}</Text> : null}

                <CustomButton text="Enviar" onPress={onSubmitPressed} style={styles.button} disabled={!!passwordError || !passwordStrength} />

                <CustomButton 
                    text="Volver a iniciar sesión" 
                    onPress={onSignInPressed} 
                    type="TERTIARY"
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2F2F2F',
        margin: 10,
        fontFamily: 'Roboto-Bold',
    },
    errorText: {
        color: '#FE0F64',
        fontSize: 12,
        fontFamily: 'Roboto-Regular',
        marginBottom: 20,
        alignSelf: 'flex-start', 
        textAlign: 'left', 
    },
    button: {
        marginTop: 20,
    },
    passwordStrengthContainer: {
        width: '100%',
        height: 10,
        backgroundColor: '#F6F6F6',
        borderRadius: 5,
        marginBottom: 10,
    },
    passwordStrengthIndicator: {
        height: '100%',
        borderRadius: 5,
    },
});

export default NewPasswordScreen;
