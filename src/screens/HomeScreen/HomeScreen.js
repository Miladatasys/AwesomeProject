import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Alert, ScrollView } from "react-native";
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

    return (
        <>
            <View style={styles.container}>
                <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
                    <Text style={styles.backButtonText}>Volver</Text>
                </TouchableOpacity>
                <View style={styles.greetingContainer}>
                    <Text style={styles.greeting}>Hola {clientData.firstname}{clientData.lastname},</Text>
                    <Text style={styles.revisandoText}>estás revisando:</Text>
                </View>
                <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                    {clientData.medidores && clientData.medidores.length > 0 ? (
                        clientData.medidores.map((medidor, index) => (
                            <View key={index} style={styles.headerContainer}>
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
                        ))
                    ) : (
                        <Text>No hay medidores disponibles</Text>
                    )}
                </ScrollView>
                <TouchableOpacity style={styles.button} onPress={handleNavigateToAddMeter}>
                    <Text style={styles.buttonText}>Ingrese su medidor</Text>
                </TouchableOpacity>
            </View>
            <BottomBar />
        </>
    );
};

const styles = StyleSheet.create({
    greetingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
      },
      greeting: {
        fontSize: 18,
        alignSelf: 'start',
        marginLeft: 5,
        fontWeight: 'bold',
      },
      revisandoText: {
        fontSize: 18, 
        alignSelf: 'start',
        marginLeft: 5,
      },
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
    scrollViewContainer: {
        flexGrow: 1,
        paddingBottom: 100, // Para asegurar espacio para el botón fijo
    },
    iconButton: {
        padding: 10,
    },
    button: {
        position: 'absolute',
        bottom: 80, // Ajusta esta propiedad según la altura de tu BottomBar
        left: 20,
        right: 20,
        backgroundColor: '#FFFFFF',
        borderColor: '#4271d4',
        borderWidth: 2,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
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
