import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from "react-native";
import BottomBar from "../../components/CustomBottomBar.js/BottomBar";
import ClientHeader from "../../components/CustomHeader/ClientHeader";
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {
    const navigation = useNavigation();
    const [clientData, setClientData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = await AsyncStorage.getItem('userToken');
                if (!token) {
                    throw new Error('No token found');
                }

                const response = await axios.get('http://192.168.1.104:8080/cliente/user/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (response.data) {
                    setClientData(response.data);
                    console.log('Fetched Client Data:', response.data);
                }
            } catch (error) {
                console.error('Error fetching data', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleNavigateToAddMeter = () => {
        navigation.navigate('AddressScreen');
    };

    const handleNavigateToHistorialCliente = () => {
        navigation.navigate('HistorialClienteScreen');
    };

    const handleBackPress = () => {
        Alert.alert(
            "¿Estás seguro?",
            "¿Quieres volver al inicio de sesión?",
            [
                {
                    text: "No",
                    style: "cancel"
                },
                {
                    text: "Sí",
                    onPress: () => navigation.navigate('SignIn')
                }
            ]
        );
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (!clientData) {
        return <Text>No client data available</Text>;
    }

    const medidor = clientData.medidores && clientData.medidores.length > 0 ? clientData.medidores[0] : {};

    return (
        <>
            <View style={styles.container}>
                <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
                    <Text style={styles.backButtonText}>Volver</Text>
                </TouchableOpacity>
                <View style={styles.headerContainer}>
                    <ClientHeader 
                        nombreCliente={`${clientData.firstname} ${clientData.lastname}`} 
                        direccion={{
                            calle: medidor.direccion,
                            comuna: medidor.comuna,
                            region: medidor.region,
                            numeroCliente: medidor.numcliente
                        }} 
                    />
                    <TouchableOpacity onPress={handleNavigateToHistorialCliente} style={styles.iconButton}>
                        <Icon name="arrow-forward" size={24} color="#FE0F64" />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.button} onPress={handleNavigateToAddMeter}>
                    <Text style={styles.buttonText}>Ingrese su medidor</Text>
                </TouchableOpacity>
            </View>
            <BottomBar />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'flex-start',
    },
    backButton: {
        alignSelf: 'flex-start',
        marginVertical: 10,
    },
    backButtonText: {
        fontSize: 16,
        color: '#4271d4',
        fontWeight: 'bold',
        fontFamily: 'Roboto-Regular',
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    iconButton: {
        padding: 10,
    },
    button: {
        backgroundColor: '#FFFFFF',
        borderColor: '#4271d4',
        borderWidth: 2,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
        marginTop: -10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 5,
    },
    buttonText: {
        fontSize: 16,
        color: '#4271d4',
        textAlign: 'center',
        fontWeight: 'bold',
        fontFamily: 'Roboto-Regular',
    },
});

export default HomeScreen;
