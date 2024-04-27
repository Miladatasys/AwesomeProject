import React, {useState} from "react";
import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView } from "react-native";
import Logo from "../../../assets/images/Logo.png";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";


const SignInScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const {height} = useWindowDimensions();
    const navigation = useNavigation();

    const onSignInPressed = () => {
        // validar al usuario (conexion con backend)
        navigation.navigate('HomeScreen');
    };

    const onForgotPasswordPressed = () => {
        navigation.navigate("ForgotPasswordScreen");
    };

    const onSignUpPressed = () => {
        navigation.navigate("SignUpScreen");
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.root}>
                <Image 
                    source={Logo} 
                    style={[styles.logo, {height: height * 0.3}]} 
                    resizeMode="contain" 
                />

                <CustomInput
                    placeholder="Nombre de usuario" 
                    value={username} 
                    setValue={setUsername}
                />
                <CustomInput 
                    placeholder="Contraseña" 
                    value={password} 
                    setValue={setPassword} 
                    secureTextEntry
                />

                <CustomButton text="Ingresar" onPress={onSignInPressed}/>

                <CustomButton 
                    text="¿Olvidaste tu contraseña?" 
                    onPress={onForgotPasswordPressed} 
                    type="TERTIARY"
                />

                <CustomButton 
                    text="¿No tienes una cuenta? Crea una" 
                    onPress={onSignUpPressed} 
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
    logo: {
        width: '70%',
        maxWidth: 300,
        maxHeight: 200,
    },
});
export default SignInScreen;