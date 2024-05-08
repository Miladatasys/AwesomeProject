import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";

const AdminForgotPasswordScreen = () => {
    const [userIdentifier, setUserIdentifier] = useState('');
    const [userIdentifierError, setUserIdentifierError] = useState('');

    const navigation = useNavigation();

    const validateUserIdentifier = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular para validar formato de correo electrónico
        const phoneNumberRegex = /^\d{9}$/; // Expresión regular para validar que el número de teléfono tenga exactamente 9 dígitos
    
        if (!userIdentifier.trim()) {
            setUserIdentifierError('Ingrese su correo electrónico o número de teléfono');
            return false;
        } else if (userIdentifier.endsWith('@enel.cl')) {
            setUserIdentifierError('');
            return true;
        } else if (phoneNumberRegex.test(userIdentifier)) {
            setUserIdentifierError('');
            return true;
        } else if (!emailRegex.test(userIdentifier)) {
            setUserIdentifierError('Ingrese un correo electrónico válido de Enel o un número de teléfono de 9 dígitos');
            return false;
        }
    };

    const onSendPressed = () => {
        if (validateUserIdentifier()) {
            // Aquí enviar la solicitud de recuperación de contraseña por correo electrónico o número de teléfono
            navigation.navigate('AdminNewPassword');
        }
    };

    const onSignInPressed = () => {
        navigation.navigate('AdminSignIn');
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.root}>
                <Image 
                    source={require("../../../assets/images/Tecnico.png")} 
                    style={styles.image} 
                    resizeMode="cover" 
                />
                <Text style={styles.title}>Recuperar contraseña de Administrador</Text>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Ingrese su correo electrónico o número de teléfono</Text>
                    <CustomInput
                        placeholder="Correo electrónico o número de teléfono" 
                        value={userIdentifier} 
                        setValue={setUserIdentifier}
                        onBlur={validateUserIdentifier}
                        error={userIdentifierError}
                    />
                    {userIdentifierError ? <Text style={styles.errorText}>{userIdentifierError}</Text> : null}
                </View>

                <CustomButton text="Enviar" onPress={onSendPressed} style={styles.button}/>

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
    image: {
        width: '100%',
        height: 200,
        marginBottom: 20,
        opacity: 0.8,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2F2F2F',
        margin: 10,
    },
    inputContainer: {
        width: '100%',
        marginBottom: 20,
    },
    label: {
        marginBottom: 5,
        color: '#2F2F2F',
    },
    errorText: {
        color: '#FE0F64',
        fontSize: 12,
    },
    button: {
        marginTop: 20,
    },
});

export default AdminForgotPasswordScreen;
