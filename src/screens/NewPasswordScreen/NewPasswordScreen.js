import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";

const NewPasswordScreen = () => {
    const [code, setCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [codeError, setCodeError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [passwordStrength, setPasswordStrength] = useState(0);

    const navigation = useNavigation();

    const validateInputs = () => {
        let isValid = true;
        if (!code.trim()) {
            setCodeError('Ingrese el código de verificación');
            isValid = false;
        } else {
            setCodeError('');
        }
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
        // Puedes ajustar esta lógica según tus requisitos específicos para determinar la fortaleza de la contraseña
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
            // Aquí podrías enviar la solicitud para cambiar la contraseña
            navigation.navigate('HomeScreen');
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
                    placeholder="Código de verificación" 
                    value={code} 
                    setValue={setCode}
                    error={codeError}
                />
                {codeError ? <Text style={styles.errorText}>{codeError}</Text> : null}

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
    },
    errorText: {
        color: '#FE0F64',
        fontSize: 12,
    },
    button: {
        marginTop: 20,
    },
    // Estilos para la barra de progreso de la fortaleza de la contraseña
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