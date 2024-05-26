import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image, Alert } from "react-native";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const ForgotPasswordScreen = () => {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const navigation = useNavigation();
    const [generatedCode, setGeneratedCode] = useState(generateRandomCode());

    const validateEmail = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.trim()) {
            setEmailError('Ingrese su correo electrónico');
            return false;
        } else if (!emailRegex.test(email.trim())) {
            setEmailError('Correo electrónico no válido');
            return false;
        } else {
            setEmailError('');
            return true;
        }
    };

    function generateRandomCode() {
        const randomCode = Math.floor(1000 + Math.random() * 9000).toString();
        return randomCode.split("");
    }

    const onSendPressed = () => {
        if (validateEmail()) {
            const code = generatedCode.join("");
            axios.post('https://zay6amugsl.execute-api.us-east-1.amazonaws.com/Api/my-enel', { email, code })
                .then(response => {
                    console.log('Respuesta recibida:', JSON.stringify(response, null, 2));
                    if (response.data.success) {
                        console.log('hay respuesta en if:', JSON.stringify(response, null, 2));
                        navigation.navigate('VerificacionCodigoScreen', { email, generatedCode });
                    } else {
                        console.log('hay respuesta en else:', JSON.stringify(response, null, 2));
                        Alert.alert('Error', response.data.message);
                    }
                })
                .catch(error => {
                    Alert.alert('Error', 'Hubo un problema al enviar el correo de recuperación. Inténtelo de nuevo. Error: ' + error.message);
                    console.error('Error al enviar el correo de recuperación:', error);
                });
        }
    };

    const onSignInPressed = () => {
        navigation.navigate('SignIn');
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.root}>
                <Image 
                    source={require("../../../assets/images/Ciudad.jpg")} 
                    style={styles.image} 
                    resizeMode="cover" 
                />
                <Text style={styles.title}>Recuperar contraseña</Text>

                <View style={[styles.inputContainer, { alignSelf: 'flex-start' }]}>
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

                <CustomButton text="Enviar" onPress={onSendPressed} style={styles.button} />

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
        width: '85%',
        marginBottom: 20,
        alignSelf: 'flex-start',
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

export default ForgotPasswordScreen;
