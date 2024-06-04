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
    const [phoneNumber, setPhoneNumber] = useState('');
    const [errors, setErrors] = useState({});
    const { width } = useWindowDimensions();
    const navigation = useNavigation();

    const validateFields = () => {
        const newErrors = {};
        
        if (!rut.trim()) {
            newErrors.rut = 'Ingrese su RUT';
        }
        const rutRegex = /^[0-9]+-[0-9kK]{1}$/;
        if (!rutRegex.test(rut)) {
            newErrors.rut = 'RUT no válido';
        }

        if (!firstname.trim()) {
            newErrors.firstname = 'Ingrese su nombre';
        }

        if (!lastname.trim()) {
            newErrors.lastname = 'Ingrese su apellido';
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.trim()) {
            newErrors.email = 'Ingrese su correo electrónico';
        } else if (!emailRegex.test(email)) {
            newErrors.email = 'Correo electrónico no válido';
        }

        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        if (!password.trim()) {
            newErrors.password = 'Ingrese su contraseña';
        } else if (!passwordRegex.test(password)) {
            newErrors.password = 'La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número';
        }

        if (!confirmPassword.trim()) {
            newErrors.confirmPassword = 'Confirme su contraseña';
        } else if (confirmPassword !== password) {
            newErrors.confirmPassword = 'Las contraseñas no coinciden';
        }

        const phoneRegex = /^[0-9]{8}$/;
        if (!phoneNumber.trim()) {
            newErrors.phoneNumber = 'Ingrese su número de teléfono';
        } else if (!phoneRegex.test(phoneNumber.trim())) {
            newErrors.phoneNumber = 'Número de teléfono no válido';
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
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
            };

            axios.post('http://ec2-54-147-32-66.compute-1.amazonaws.com:8080/auth/register', user)
                .then((response) => {
                    if (response.data.success) {
                        navigation.navigate('SignIn');
                    } else {
                        Alert.alert('Error', response.data.token || 'Error en la respuesta del servidor');
                    }
                })
                .catch((error) => {
                    if (error.response) {
                        console.error('Respuesta del servidor:', error.response.data);
                        Alert.alert('Error', error.response.data.token || 'Error en la respuesta del servidor');
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
                <Text style={styles.title}>Crea una cuenta</Text>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>RUT:</Text>
                    <TextInput
                        style={[styles.input, errors.rut && styles.inputError]}
                        placeholder="11111111-1"
                        value={rut}
                        onChangeText={(text) => setRut(text)}
                        onBlur={validateFields}
                        fontFamily="Roboto-Regular"
                    />
                    {errors.rut ? <Text style={styles.errorText}>{errors.rut}</Text> : null}
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Nombre:</Text>
                    <TextInput
                        style={[styles.input, errors.firstname && styles.inputError]}
                        placeholder="Escriba su nombre"
                        value={firstname}
                        onChangeText={(text) => setFirstname(text)}
                        onBlur={validateFields}
                        fontFamily="Roboto-Regular"
                    />
                    {errors.firstname ? <Text style={styles.errorText}>{errors.firstname}</Text> : null}
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Apellido:</Text>
                    <TextInput
                        style={[styles.input, errors.lastname && styles.inputError]}
                        placeholder="Escriba su Apellido"
                        value={lastname}
                        onChangeText={(text) => setLastname(text)}
                        onBlur={validateFields}
                        fontFamily="Roboto-Regular"
                    />
                    {errors.lastname ? <Text style={styles.errorText}>{errors.lastname}</Text> : null}
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Email:</Text>
                    <TextInput
                        style={[styles.input, errors.email && styles.inputError]}
                        placeholder="Correo electrónico"
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        onBlur={validateFields}
                        fontFamily="Roboto-Regular"
                    />
                    {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Contraseña:</Text>
                    <TextInput
                        style={[styles.input, errors.password && styles.inputError]}
                        placeholder="Contraseña"
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        onBlur={validateFields}
                        secureTextEntry
                        fontFamily="Roboto-Regular"
                    />
                    {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
                    <PasswordStrengthIndicator password={password} />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Confirmar Contraseña:</Text>
                    <TextInput
                        style={[styles.input, errors.confirmPassword && styles.inputError]}
                        placeholder="Confirmar Contraseña"
                        value={confirmPassword}
                        onChangeText={(text) => setConfirmPassword(text)}
                        onBlur={validateFields}
                        secureTextEntry
                        fontFamily="Roboto-Regular"
                    />
                    {errors.confirmPassword ? <Text style={styles.errorText}>{errors.confirmPassword}</Text> : null}
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Teléfono:</Text>
                    <TextInput
                        style={[styles.input, errors.phoneNumber && styles.inputError]}
                        placeholder="Número de teléfono"
                        value={phoneNumber}
                        onChangeText={(text) => setPhoneNumber(text)}
                        onBlur={validateFields}
                        fontFamily="Roboto-Regular"
                    />
                    {errors.phoneNumber ? <Text style={styles.errorText}>{errors.phoneNumber}</Text> : null}
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
