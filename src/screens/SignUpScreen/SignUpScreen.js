import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

// Componente para mostrar el indicador de fortaleza de la contraseña
const PasswordStrengthIndicator = ({ password }) => {
    const calculateStrength = () => {
        // Verifica si la contraseña cumple con los requisitos
        const hasNumber = /\d/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasUpperCase = /[A-Z]/.test(password);
        const hasMinLength = password.length >= 8;

        // Calcula la fuerza de la contraseña
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
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [rutError, setRutError] = useState('');
    const [emailError, setEmailError] = useState(''); 
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    
    const navigation = useNavigation();

    const validateRut = () => {
        const rutRegex = /^[0-9]+-[0-9kK]{1}$/; // Expresión regular para validar RUT chileno
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

    const validateEmail = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular para validar formato de correo electrónico
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
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/; // Al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número
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
    

    const validateFields = () => {
        let valid = true;

        const rutRegex = /^[0-9]+-[0-9kK]{1}$/; // Expresión regular para validar RUT chileno
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular para validar formato de correo electrónico
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/; // Al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número

        if (!rut.trim()) {
            setRutError('Ingrese su RUT');
            valid = false;
        } else if (!rutRegex.test(rut)) {
            setRutError('RUT no válido');
            valid = false;
        } else {
            setRutError('');
        }

        if (!email.trim()) {
            setEmailError('Ingrese su correo electrónico');
            valid = false;
        } else if (!emailRegex.test(email)) {
            setEmailError('Correo electrónico no válido');
            valid = false;
        } else {
            setEmailError('');
        }

        if (!password.trim()) {
            setPasswordError('Ingrese su contraseña');
            valid = false;
        } else if (!passwordRegex.test(password)) {
            setPasswordError('La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número');
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
                    <Text style={styles.label}>RUT:</Text>
                    <TextInput
                        style={[styles.input, rutError && styles.inputError]}
                        placeholder="11111111-1"
                        value={rut}
                        onChangeText={(text) => setRut(text)}
                        onBlur={validateRut} // Llamada a la función validateRut en el evento onBlur
                    />

                    {rutError ? <Text style={styles.errorText}>{rutError}</Text> : null}
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Email:</Text>
                    <TextInput
                        style={[styles.input, emailError && styles.inputError]}
                        placeholder="Correo electrónico"
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        onBlur={validateEmail} // Llamada a la función validateEmail en el evento onBlur
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
                        onBlur={validatePassword} // Llamada a la función validatePassword en el evento onBlur
                        secureTextEntry
                    />

                    {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

                    {/* Muestra el indicador de fortaleza de la contraseña */}
                    <PasswordStrengthIndicator password={password} />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Confirmar Contraseña:</Text>
                    <TextInput
                        style={[styles.input, confirmPasswordError && styles.inputError]}
                        placeholder="Confirmar Contraseña"
                        value={confirmPassword}
                        onChangeText={(text) => setConfirmPassword(text)}
                        onBlur={validateConfirmPassword} // Llamada a la función validateConfirmPassword en el evento onBlur
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
    tertiaryButton: {
        backgroundColor: 'transparent',
    },
    tertiaryButtonText: {
        color: '#FE0F64',
    },
    // Estilos para el indicador de fortaleza de la contraseña
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

