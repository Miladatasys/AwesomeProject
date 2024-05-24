import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";

const AdminForgotPasswordScreen = () => {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');

    const navigation = useNavigation();

    const validateEmail = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular para validar formato de correo electrónico

        if (!email.trim()) {
            setEmailError('Ingrese su correo electrónico');
            return false;
        } else if (!emailRegex.test(email.trim())) {
            setEmailError('Ingrese un correo electrónico válido');
            return false;
        } else {
            setEmailError('');
            return true;
        }
    };

    const onSendPressed = () => {
        if (validateEmail()) {
            // Aquí enviar la solicitud de recuperación de contraseña por correo electrónico
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
                    <Text style={styles.label}>Ingrese su correo electrónico</Text>
                    <CustomInput
                        placeholder="Correo electrónico" 
                        value={email} 
                        setValue={setEmail}
                        onBlur={validateEmail}
                        error={emailError}
                    />
                    {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
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
        fontFamily: 'Roboto-Bold',
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
    errorText: {
        color: '#FE0F64',
        fontSize: 12,
        fontFamily: 'Roboto-Regular',
    },
    button: {
        marginTop: 20,
    },
});

export default AdminForgotPasswordScreen;
