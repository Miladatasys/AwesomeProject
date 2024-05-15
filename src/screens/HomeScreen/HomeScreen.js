import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import CustomButton from "../../components/CustomButton";
import BottomBar from "../../components/CustomBottomBar.js/BottomBar";
import ClientHeader from "../../components/CustomHeader/ClientHeader";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
    const navigation = useNavigation();

    const cliente = {
        nombre: "Juan Pérez",
        direccion: {
            calle: "Calle Principal",
            numero: "123",
            comuna: "Santiago",
            numeroCliente: "0001"
        }
    };

    const handleNavigateToAddMeter = () => {
        navigation.navigate('AddressScreen');
    };

    return (
        <>
            <View>
                <ClientHeader nombreCliente={cliente.nombre} direccion={cliente.direccion} />
                <Text style={{ fontSize: 24, alignSelf: 'center' }}>Home Screen</Text>
                <TouchableOpacity onPress={handleNavigateToAddMeter}>
                    <Text style={{ fontSize: 16, color: 'blue', textAlign: 'center', marginTop: 10 }}>Ingrese su medidor</Text>
                </TouchableOpacity>
            </View>
            <BottomBar />
        </>
    );
};

export default HomeScreen;
