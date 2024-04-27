import React, {useState} from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";

const NewPasswordScreen = () => {
    const [code, setCode] = useState('');
    const [NewPassword, setNewPassword] = useState('');

    const navigation = useNavigation();

    const onSubmitPressed = () => {
        navigation.navigate('HomeScreen')
    };

    const onSignInPressed = () => {
        navigation.navigate('SignIn');
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.root}>
                <Text style={styles.title}>Cambia tu contraseña</Text>

                <CustomInput
                    placeholder="Código" 
                    value={code} 
                    setValue={setCode}
                />

                <CustomInput
                    placeholder="Ingresa tu nueva contraseña" 
                    value={NewPassword} 
                    setValue={setNewPassword}
                />

                <CustomButton text="Enviar" onPress={onSubmitPressed}/>

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
export default NewPasswordScreen;