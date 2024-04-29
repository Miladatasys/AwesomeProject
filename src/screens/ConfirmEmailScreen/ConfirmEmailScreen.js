import React, {useState} from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";

const ConfirmEmailScreen = () => {
    const [code, setCode] = useState('');

    const navigation = useNavigation();

    const onConfirmPressed = () => {
        navigation.navigate('homeScreen')
    };

    const onSignInPressed = () => {
        navigation.navigate('SignIn');
    };

    const onResendPressed = () => {
        // enviar código de confirmación al email 
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.root}>
                <Text style={styles.title}>Confirma tu email</Text>

                <CustomInput
                    placeholder="Escribe tu código de confirmación" 
                    value={code} 
                    setValue={setCode}
                />

                <CustomButton text="Confirmar" onPress={onConfirmPressed}/>

                <CustomButton 
                    text="Reenviar código de confirmación" 
                    onPress={onResendPressed} 
                    type="SECONDARY"
                />

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
        color: '#2F2F2F',
        margin: 10,
    },

});
export default ConfirmEmailScreen;