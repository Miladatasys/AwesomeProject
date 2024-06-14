import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image, Alert } from "react-native";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const AdminForgotPasswordScreen = () => {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const navigation = useNavigation();
    const [generatedCode, setGeneratedCode] = useState(generateRandomCode());
    const [emailExists, setEmailExists] = useState(false);

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
            console.log(email);
            axios.post('http://192.168.1.91:8080/auth/getEmail', {email}) 
                           .then((response) => {
                    console.log("respuesta get recibida");
                    if (response.data.success){
                        setEmailExists(true);
                        console.log('hay respuesta en if get:', response.data);
                        sendRecoveryEmail();
                    } else {
                        console.log('hay respuesta en else get:', response.data);
                        Alert.alert('Error', 'El correo electrónico no existe en nuestra base de datos.');
                    }
                })
                .catch(error => {
                    Alert.alert('Error', 'Hubo un problema al verificar el correo electrónico. Inténtelo de nuevo.');
                    console.error('Error al verificar el correo electrónico:', error);
                });
        }
    };

    const sendRecoveryEmail = () => {
        const code = generatedCode.join("");
        axios.post('https://lsd49dkuof.execute-api.us-east-1.amazonaws.com/api-ses/enel', { email, code })
            .then(response => {
                console.log('Respuesta recibida:', JSON.stringify(response, null, 2));
                const responseData = JSON.parse(response.data.body);
                if (responseData.success) {
                    console.log('hay respuesta en if:', JSON.stringify(responseData, null, 2));
                    navigation.navigate('AdminVerificationScreen', { email, generatedCode });
                } else {
                    console.log('hay respuesta en else:', JSON.stringify(responseData, null, 2));
                    Alert.alert('Error', responseData.message);
                }
            })
            .catch(error => {
                Alert.alert('Error', 'Hubo un problema al enviar el correo de recuperación. Inténtelo de nuevo. Error: ' + error.message);
                console.error('Error al enviar el correo de recuperación:', error);
            });
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

                <CustomButton text="Enviar" onPress={onSendPressed} style={styles.button} />

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
