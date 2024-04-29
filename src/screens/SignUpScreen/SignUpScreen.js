import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";

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

    const validateFields = () => {
        let valid = true;

        if (!rut.trim()) {
            setRutError('Ingrese su rut');
            valid = false;
        } else {
            setRutError('');
        }

        if (!email.trim()) {
            setEmailError('Ingrese su email');
            valid = false;
        } else {
            setEmailError('');
        }

        if (!password.trim()) {
            setPasswordError('Ingrese su contraseña');
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

                <CustomInput
                    placeholder="Rut"
                    value={rut}
                    setValue={setRut}
                    error={rutError}
                    setError={setRutError}
                    errorColor="#FE0F64"
                    required
                />

                <CustomInput
                    placeholder="Email" 
                    value={email} 
                    setValue={setEmail}
                    error={emailError}
                    setError={setEmailError}
                    errorColor="#FE0F64"
                    required
                />

                <CustomInput 
                    placeholder="Contraseña" 
                    value={password} 
                    setValue={setPassword} 
                    secureTextEntry
                    error={passwordError}
                    setError={setPasswordError}
                    errorColor="#FE0F64"
                    required
                />

                <CustomInput
                    placeholder="Confirmar contraseña" 
                    value={confirmPassword} 
                    setValue={setConfirmPassword}
                    secureTextEntry
                    error={confirmPasswordError}
                    setError={setConfirmPasswordError}
                    errorColor="#FE0F64"
                    required
                />

                <CustomButton text="Registrarse" onPress={onRegisterPressed}/>

                <CustomButton 
                    text="¿Tienes una cuenta? Inicia sesión" 
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
});

export default SignUpScreen;
