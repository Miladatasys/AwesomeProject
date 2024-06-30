import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ClientHeader from '../../components/CustomHeader/ClientHeader';

const ListMedidoresCotScreen = () => {
    const navigation = useNavigation();
    const [meters, setMeters] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMeters = async () => {
            try {
                const token = await AsyncStorage.getItem('userToken');
                if (!token) {
                    throw new Error('No token found');
                }
                const response = await axios.get('http://192.168.1.88:8080/cliente/userMedidores/profile', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (response.data && response.data.object) {
                    setMeters(response.data.object);
                } else {
                    console.error('No medidores found in response data');
                }
            } catch (error) {
                console.error('Error fetching meters', error);
                Alert.alert('Error', 'Hubo un problema al cargar los medidores');
            } finally {
                setLoading(false);
            }
        };
        fetchMeters();
    }, []);

    const handleMeterSelect = async (medidor) => {
        try {
            navigation.navigate('CamaraCotizacionScreen', { meter: medidor });
        } catch (error) {
            console.error('Error navigating to CamaraCotizacionScreen', error);
            Alert.alert('Error', 'Hubo un problema al acceder a la cámara de cotización');
        }
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')} style={styles.backButtonContainer}>
                <Icon name="arrow-back" size={24} color="#4271d4" />
                <Text style={styles.backButtonText}>Volver</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Seleccione un Medidor</Text>
            <ScrollView>
                {meters.length === 0 ? (
                    <View style={styles.noMedidoresContainer}>
                        <Text style={styles.noMedidoresText}>No tienes medidores. Registra uno.</Text>
                    </View>
                ) : (
                    meters.map((medidor, index) => (
                        <View key={index} style={styles.medidorRow}>
                            <View style={styles.medidorContainer}>
                                <ClientHeader
                                    direccion={{
                                        calle: medidor.direccion,
                                        comuna: medidor.comuna,
                                        region: medidor.region,
                                        numeroCliente: medidor.numcliente,
                                    }}
                                    medidorId={medidor.id}
                                    onPress={() => handleMeterSelect(medidor)}
                                />
                            </View>
                        </View>
                    ))
                )}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    backButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    backButtonText: {
        fontSize: 16,
        color: '#4271d4',
        marginLeft: 5,
        fontWeight: 'bold',
        fontFamily: 'Roboto-Regular',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 20,
        color: '#333333',
    },
    noMedidoresContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    noMedidoresText: {
        fontSize: 18,
        color: '#FF0000',
        textAlign: 'center',
    },
    medidorRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    medidorContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ccc',
    },
});

export default ListMedidoresCotScreen;
