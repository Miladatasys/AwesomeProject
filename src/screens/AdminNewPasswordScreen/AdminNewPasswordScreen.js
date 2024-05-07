import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";

const AdminNewPasswordScreen = () => {
    const [code, setCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [codeError, setCodeError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

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

    const onSubmitPressed = () => {
        if (validateInputs()) {
            // nviar la solicitud para cambiar la contraseña del administrador
            navigation.navigate('AdminHomeScreen'); 
        }
    };

    const onSignInPressed = () => {
        navigation.navigate('AdminSignIn');
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.root}>
                <Text style={styles.title}>Cambia tu contraseña de administrador</Text>

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
                    setValue={setNewPassword}
                    secureTextEntry
                    error={passwordError}
                />
                {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

                <CustomInput
                    placeholder="Confirmar nueva contraseña" 
                    value={confirmNewPassword} 
                    setValue={setConfirmNewPassword}
                    secureTextEntry
                    error={confirmPasswordError}
                />
                {confirmPasswordError ? <Text style={styles.errorText}>{confirmPasswordError}</Text> : null}

                <CustomButton text="Enviar" onPress={onSubmitPressed} style={styles.button}/>

                <CustomButton 
                    text="Volver a iniciar sesión como administrador" 
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
});

export default AdminNewPasswordScreen;
