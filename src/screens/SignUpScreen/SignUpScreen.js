import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert, useWindowDimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

// Componente para mostrar el indicador de fortaleza de la contraseña
const PasswordStrengthIndicator = ({ password }) => {
    const calculateStrength = () => {
        const hasNumber = /\d/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasUpperCase = /[A-Z]/.test(password);
        const hasMinLength = password.length >= 8;
        const strength = (hasNumber + hasLowerCase + hasUpperCase + hasMinLength) / 4 * 100;
        return strength;
    };

    const strength = calculateStrength();

    return (
        <View style={styles.strengthIndicatorContainer}>
            <View
                style={{
                    ...styles.strengthIndicator,
                    width: `${strength}%`,
                    backgroundColor: strength < 50 ? 'gray' : strength < 75 ? 'yellow' : 'green',
                }}
            />
        </View>
    );
};

const SignUpScreen = () => {
    const [rut, setRut] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [rutError, setRutError] = useState('');
    const [firstnameError, setFirstnameError] = useState(''); 
    const [lastnameError, setLastnameError] = useState(''); 
    const [emailError, setEmailError] = useState(''); 
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [phoneNumberError, setPhoneNumberError] = useState('');
    const { width } = useWindowDimensions();
    const navigation = useNavigation();

    const validateRut = () => {
        const rutRegex = /^[0-9]+-[0-9kK]{1}$/;
        if (!rut.trim()) {
            setRutError('Ingrese su RUT');
            return false;
        } else if (!rutRegex.test(rut)) {
            setRutError('RUT no válido');
            return false;
        } else {
            setRutError('');
            return true;
        }
    };

    const validateFirstname = () => {
        if (!firstname.trim()) {
            setFirstnameError('Ingrese su nombre');
            return false;
        } else {
            setFirstnameError('');
            return true;
        }
    };

    const validateLastname = () => {
        if (!lastname.trim()) {
            setLastnameError('Ingrese su apellido');
            return false;
        } else {
            setLastnameError('');
            return true;
        }
    };

    const validateEmail = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.trim()) {
            setEmailError('Ingrese su correo electrónico');
            return false;
        } else if (!emailRegex.test(email)) {
            setEmailError('Correo electrónico no válido');
            return false;
        } else {
            setEmailError('');
            return true;
        }
    };

    const validatePassword = () => {
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        if (!password.trim()) {
            setPasswordError('Ingrese su contraseña');
            return false;
        } else if (!passwordRegex.test(password)) {
            setPasswordError('La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número');
            return false;
        } else {
            setPasswordError('');
            return true;
        }
    };

    const validateConfirmPassword = () => {
        if (!confirmPassword.trim()) {
            setConfirmPasswordError('Confirme su contraseña');
            return false;
        } else if (confirmPassword !== password) {
            setConfirmPasswordError('Las contraseñas no coinciden');
            return false;
        } else {
            setConfirmPasswordError('');
            return true;
        }
    };

    const validatePhoneNumber = () => {
        const phoneRegex = /^[0-9]{9}$/; // Expresión regular para validar números de teléfono de 9 dígitos
        if (!phoneNumber.trim()) {
            setPhoneNumberError('Ingrese su número de teléfono');
            return false;
        } else if (!phoneRegex.test(phoneNumber.trim())) {
            setPhoneNumberError('Número de teléfono no válido');
            return false;
        } else {
            setPhoneNumberError('');
            return true;
        }
    };

    const validateFields = () => {
        let valid = true;
        
        if (!validateRut()) valid = false;
        if (!validateFirstname()) valid = false;
        if (!validateLastname()) valid = false;
        if (!validateEmail()) valid = false;
        if (!validatePassword()) valid = false;
        if (!validateConfirmPassword()) valid = false;
        if (!validatePhoneNumber()) valid = false;

        return valid;
    };

    const onRegisterPressed = () => {
        if (validateFields()) {
            const user = {
                rut,
                password,
                firstname,
                lastname,
                email,
                phoneNumber,
                //userType: 'PERSONA' // Valor por defecto ya que eliminamos la selección
            };

            axios.post('http://10.0.2.2:8080/auth/register', user)
            .then((response) => {
                if (response.data.success) {
                    navigation.navigate('HomeScreen');
                } else {
                    Alert.alert('Error', response.data.message);
                }
            })
            .catch((error) => {
                if (error.response) {
                    // El servidor respondió con un código de estado fuera del rango 2xx
                    console.error('Respuesta del servidor:', error.response.data);
                    Alert.alert('Error', error.response.data.message || 'Error en la respuesta del servidor');
                } else if (error.request) {
                    // La solicitud fue hecha pero no se recibió respuesta
                    console.error('Solicitud realizada, sin respuesta:', error.request);
                    Alert.alert('Error', 'No se recibió respuesta del servidor');
                } else {
                    // Algo ocurrió al configurar la solicitud
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
                <Text style={styles.title}>Crea una cuenta</Text>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>RUT:</Text>
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
                    <Text style={styles.label}>Nombre:</Text>
                    <TextInput
                        style={[styles.input, firstnameError && styles.inputError]}
                        placeholder="Escriba su nombre"
                        value={firstname}
                        onChangeText={(text) => setFirstname(text)}
                        onBlur={validateFirstname}
                        fontFamily="Roboto-Regular"
                    />
                    {firstnameError ? <Text style={styles.errorText}>{firstnameError}</Text> : null}
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Apellido:</Text>
                    <TextInput
                        style={[styles.input, lastnameError && styles.inputError]}
                        placeholder="Escriba su Apellido"
                        value={lastname}
                        onChangeText={(text) => setLastname(text)}
                        onBlur={validateLastname}
                        fontFamily="Roboto-Regular"
                    />
                    {lastnameError ? <Text style={styles.errorText}>{lastnameError}</Text> : null}
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Email:</Text>
                    <TextInput
                        style={[styles.input, emailError && styles.inputError]}
                        placeholder="Correo electrónico"
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        onBlur={validateEmail}
                        fontFamily="Roboto-Regular"
                    />
                    {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Contraseña:</Text>
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
                    <PasswordStrengthIndicator password={password} />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Confirmar Contraseña:</Text>
                    <TextInput
                        style={[styles.input, confirmPasswordError && styles.inputError]}
                        placeholder="Confirmar Contraseña"
                        value={confirmPassword}
                        onChangeText={(text) => setConfirmPassword(text)}
                        onBlur={validateConfirmPassword}
                        secureTextEntry
                        fontFamily="Roboto-Regular"
                    />
                    {confirmPasswordError ? <Text style={styles.errorText}>{confirmPasswordError}</Text> : null}
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Teléfono:</Text>
                    <TextInput
                        style={[styles.input, phoneNumberError && styles.inputError]}
                        placeholder="Número de teléfono"
                        value={phoneNumber}
                        onChangeText={(text) => setPhoneNumber(text)}
                        onBlur={validatePhoneNumber}
                        fontFamily="Roboto-Regular"
                    />
                    {phoneNumberError ? <Text style={styles.errorText}>{phoneNumberError}</Text> : null}
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
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2F2F2F',
        marginVertical: 10,
        fontFamily: 'Roboto-Regular',
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
        fontFamily: 'Roboto-Regular',
    },
    tertiaryButton: {
        backgroundColor: 'transparent',
    },
    tertiaryButtonText: {
        color: '#FE0F64',
    },
    strengthIndicatorContainer: {
        width: '100%',
        height: 5,
        backgroundColor: 'lightgray',
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 10,
    },
    strengthIndicator: {
        height: '100%',
        borderRadius: 5,
    },
});

export default SignUpScreen;
