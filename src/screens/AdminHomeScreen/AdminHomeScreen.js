import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert, Image, Dimensions, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Logo from "../../../assets/images/Tecnico.png";

const AdminHomeScreen = () => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(true);
    const { width } = Dimensions.get('window');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = await AsyncStorage.getItem('adminToken');
                if (!token) {
                    throw new Error('No token found');
                }

                // const response = await axios.get('http://192.168.1.91:8080/admin/user/profile', {
                //     headers: {
                //         Authorization: `Bearer ${token}`
                //     }
                // });

                // if (response.data.object) {
                //     setClientData(response.data.object);
                // }
            } catch (error) {
                console.error('Error fetching data', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleLogout = () => {
        Alert.alert(
            "Confirmar Cierre de Sesión",
            "¿Estás seguro de que deseas cerrar sesión?",
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                {
                    text: "Sí",
                    onPress: () => {
                        AsyncStorage.removeItem('adminToken');
                        navigation.navigate('AdminSignIn');
                    }
                }
            ]
        );
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    // Este bloque es para cuando se implemente la integración
    // if (!clientData) {
    //     return <Text>No hay datos disponibles</Text>;
    // }

    return (
        <>
            <View style={styles.container}>
                <Image 
                    source={Logo} 
                    style={styles.logo} 
                    resizeMode="cover" 
                />
                
                <TouchableOpacity style={styles.backButton} onPress={handleLogout}>
                    <Text style={styles.backButtonText}>Cerrar Sesión</Text>
                </TouchableOpacity>

                <View style={styles.greetingContainer}>
                    <Text style={styles.greeting}>Hola Admin,</Text>
                </View>
            </View>
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
        justifyContent: 'flex-start',
    },
    backButton: {
        alignSelf: 'flex-start',
        marginVertical: 10,
        paddingLeft: 20, // Añadir padding a la izquierda
    },
    backButtonText: {
        fontSize: 16,
        color: '#4271d4',
        fontWeight: 'bold',
        fontFamily: 'Roboto-Regular',
    },
    logo: {
        width: '100%',
        height: 200, // Ajusta la altura según tus necesidades
    },
});

export default AdminHomeScreen;
