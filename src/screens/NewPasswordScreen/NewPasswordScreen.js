import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios'; //  importar axios
import { Alert} from "react-native";



const NewPasswordScreen = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [passwordStrength, setPasswordStrength] = useState(0);
    const route = useRoute();
    const email = route.params.email;
    


    const navigation = useNavigation();

    const validateInputs = () => {
        let isValid = true;
        if (!newPassword.trim()) {
            setPasswordError('Ingrese la nueva contraseña');
            isValid = false;
        } else if (newPassword.length < 8) {
            setPasswordError('La contraseña debe tener al menos 8 caracteres');
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
        if (/\d/.test(password)) {
            strength += 1;
        }
        return (strength / 4) * 100;
    };

    const handlePasswordChange = (text) => {
        setNewPassword(text);
        const strength = calculatePasswordStrength(text);
        setPasswordStrength(strength);
    };

    const onSubmitPressed = () => {
        if (validateInputs()) {
            console.log(email);
            console.log(newPassword);
            const payload = { email, newPassword };
            console.log('Payload:', payload); // Log payload for debugging
    
            axios.put('http://ec2-34-236-149-118.compute-1.amazonaws.com:8080/auth/update-password', payload)
                .then(response => {
                    if (response.data.success) {
                        navigation.navigate('SignIn');
                    } else {
                        Alert.alert('Error', response.data.message || 'Error en la respuesta del servidor');
                    }
                })
                .catch(error => {
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
                {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

                {/* Barra de progreso para mostrar la fortaleza de la contraseña */}
                <View style={styles.passwordStrengthContainer}>
                    <View
                        style={[
                            styles.passwordStrengthIndicator,
                            {
                                width: `${passwordStrength}%`,
                                backgroundColor:
                                    passwordStrength < 50
                                        ? 'gray'
                                        : passwordStrength < 75
                                        ? 'yellow'
                                        : 'green',
                            },
                        ]}
                    />
                </View>

                <CustomInput
                    placeholder="Confirmar nueva contraseña" 
                    value={confirmNewPassword} 
                    setValue={setConfirmNewPassword}
                    secureTextEntry
                    error={confirmPasswordError}
                />
                {confirmPasswordError ? <Text style={styles.errorText}>{confirmPasswordError}</Text> : null}

                <CustomButton text="Enviar" onPress={onSubmitPressed} style={styles.button} disabled={passwordError || !passwordStrength}/>

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
