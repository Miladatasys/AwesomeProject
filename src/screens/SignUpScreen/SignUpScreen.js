import React, {useState} from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";

const SignUpScreen = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigation = useNavigation();


    const onRegisterPressed = () => {
        navigation.navigate('confirmEmail');
    };

    const onSignInPressed = () => {
        navigation.navigate('SignIn');
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.root}>
                <Text style={styles.title}>Crea una cuenta</Text>

                <CustomInput
                    placeholder="Nombre de usuario" 
                    value={username} 
                    setValue={setUsername}
                />
                <CustomInput
                    placeholder="Email" 
                    value={email} 
                    setValue={setEmail}
                />
                <CustomInput 
                    placeholder="Contraseña" 
                    value={password} 
                    setValue={setPassword} 
                    secureTextEntry
                />
                <CustomInput
                    placeholder="Confirmar contraseña" 
                    value={confirmPassword} 
                    setValue={setConfirmPassword}
                    secureTextEntry
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
    logo: {
        width: '70%',
        maxWidth: 300,
        maxHeight: 200,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ffff',
        margin: 10,
    },

});
export default SignUpScreen;