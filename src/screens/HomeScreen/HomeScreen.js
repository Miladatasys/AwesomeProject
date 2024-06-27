import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Alert, Image, Dimensions } from "react-native";
import BottomBar from "../../components/CustomBottomBar.js/BottomBar";
import VerMedidor from "../../components/VerMedidor/VerMedidor";
import { useNavigation } from "@react-navigation/native";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Logo from "../../../assets/images/Enel.png";

const HomeScreen = () => {
    const navigation = useNavigation();
    const [clientData, setClientData] = useState(null);
    const [loading, setLoading] = useState(true);
    const { width } = Dimensions.get('window');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = await AsyncStorage.getItem('userToken');
                if (!token) {
                    throw new Error('No token found');
                }

                const response = await axios.get('http://192.168.1.88:8080/cliente/user/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log("response: ", response);
                console.log("response.data: ", response.data);
                console.log("response.data.object: ", response.data.object);

                if (response.data.object) {
                    setClientData(response.data.object);
                    console.log('Fetched Client Data:', response.data.object);
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

    const handleNavigateToQuote = () => {
        // Navegar a la pantalla de cotización
        navigation.navigate('ListMedidoresCotScreen');
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (!clientData) {
        return <Text>No hay datos disponibles, ingresa un medidor</Text>;
    }

    return (
        <>
            <View style={styles.container}>
                <Image 
                    source={Logo} 
                    style={[styles.logo, { width: width * 0.7 }]} 
                    resizeMode="contain" 
                />
                
                <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
                    <Text style={styles.backButtonText}>Volver</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={handleNavigateToAddMeter}>
                    <Text style={styles.buttonText}>Ingrese su medidor</Text>
                </TouchableOpacity>
                
                <View style={styles.greetingContainer}>
                    <Text style={styles.greeting}>Hola {clientData.firstname} {clientData.lastname},</Text>
                    <Text style={styles.revisandoText}>estás revisando:</Text>
                </View>

                {/* Mostrar el componente VerMedidor */}
                <VerMedidor />

                {/* Nuevo botón elegante */}
                <TouchableOpacity style={styles.quoteButton} onPress={handleNavigateToQuote}>
                    <Text style={styles.quoteButtonText}>Cotizar cuenta de luz</Text>
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
        alignSelf: 'flex-start',
        marginLeft: 5,
        fontWeight: 'bold',
    },
    revisandoText: {
        fontSize: 18, 
        alignSelf: 'flex-start',
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
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 5,
        marginVertical: 10,
    },
    buttonText: {
        fontSize: 16,
        color: '#4271d4',
        textAlign: 'center',
        fontWeight: 'bold',
        fontFamily: 'Roboto-Regular',
    },
    logo: {
        alignSelf: 'center',
        height: 100,
        marginVertical: 20, // Ajuste para agregar espacio vertical alrededor del logo
        marginBottom: 20,
    },
    quoteButton: {
        backgroundColor: '#FE0F64',
        borderRadius: 10,
        paddingVertical: 15,
        paddingHorizontal: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
        marginVertical: 20,
    },
    quoteButtonText: {
        fontSize: 18,
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontFamily: 'Roboto-Bold',
    },
});

export default HomeScreen;
