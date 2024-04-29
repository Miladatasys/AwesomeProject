import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";

const ForgotPasswordScreen = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [phoneNumberError, setPhoneNumberError] = useState('');

    const navigation = useNavigation();

    const validatePhoneNumber = () => {
        if (!phoneNumber.trim()) {
            setPhoneNumberError('Ingrese su número de teléfono');
            return false;
        } else {
            setPhoneNumberError('');
            return true;
        }
    };

    const onSendPressed = () => {
        if (validatePhoneNumber()) {
            // Aquí enviar la solicitud de recuperación de contraseña por número de teléfono
            navigation.navigate('NewPassword');
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

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Ingrese su número de teléfono</Text>
                    <CustomInput
                        placeholder="Número de teléfono" 
                        value={phoneNumber} 
                        setValue={setPhoneNumber}
                        onBlur={validatePhoneNumber}
                        error={phoneNumberError}
                    />
                    {phoneNumberError ? <Text style={styles.errorText}>{phoneNumberError}</Text> : null}
                </View>

                <CustomButton text="Enviar" onPress={onSendPressed} style={styles.button}/>

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
        opacity: 0.8, // Ajustar la opacidad según tu preferencia
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

export default ForgotPasswordScreen;
