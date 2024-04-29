import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";

const ForgotPasswordScreen = () => {
    const [rut, setRut] = useState('');
    const [rutError, setRutError] = useState('');

    const navigation = useNavigation();

    const validateRut = () => {
        if (!rut.trim()) {
            setRutError('Ingrese su RUT');
            return false;
        } else {
            setRutError('');
            return true;
        }
    };

    const onSendPressed = () => {
        if (validateRut()) {
            navigation.navigate('NewPassword');
        }
    };

    const onSignInPressed = () => {
        navigation.navigate('SignIn');
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.root}>
                <Text style={styles.title}>Cambia tu contraseña</Text>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Ingrese su RUT</Text>
                    <CustomInput
                        placeholder="RUT" 
                        value={rut} 
                        setValue={setRut}
                        onBlur={validateRut}
                        error={rutError}
                    />
                    {rutError ? <Text style={styles.errorText}>{rutError}</Text> : null}
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
