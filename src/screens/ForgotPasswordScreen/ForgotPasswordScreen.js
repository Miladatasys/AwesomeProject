import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";

const ForgotPasswordScreen = () => {
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phoneNumberError, setPhoneNumberError] = useState('');

    const navigation = useNavigation();

    const validateEmail = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular para validar correos electrónicos
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

    const onSendPressed = () => {
        const isEmailValid = validateEmail();
        const isPhoneNumberValid = validatePhoneNumber();
        if (isEmailValid && isPhoneNumberValid) {
            // Aquí enviar la solicitud de recuperación de contraseña por correo electrónico o número de teléfono
            navigation.navigate('VerificacionCodigoScreen');
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

                <View style={[styles.inputContainer, { alignSelf: 'flex-start' }]}>
                    <Text style={styles.label}>Ingrese su número de teléfono</Text>
                    <View style={styles.phoneNumberContainer}>
                        <Text style={styles.countryCode}>+56</Text>
                        <CustomInput
                            placeholder="Número de teléfono"
                            value={phoneNumber}
                            setValue={setPhoneNumber}
                            onBlur={validatePhoneNumber}
                            error={phoneNumberError}
                            keyboardType="phone-pad"
                            style={styles.phoneNumberInput}
                        />
                    </View>
                    {phoneNumberError ? <Text style={styles.errorText}>{phoneNumberError}</Text> : null}
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
    phoneNumberContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    countryCode: {
        marginRight: 10,
        fontSize: 16,
        color: '#2F2F2F',
        fontFamily: 'Roboto-Regular',
    },
    phoneNumberInput: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderColor: '#F6F6F6',
        borderRadius: 5,
        paddingHorizontal: 10,
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