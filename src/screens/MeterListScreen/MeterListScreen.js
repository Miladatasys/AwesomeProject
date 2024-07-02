import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ClientHeader from '../../components/CustomHeader/ClientHeader';

const MeterListScreen = () => {
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

    const handleMeterSelect = async (meter) => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            if (!token) {
                throw new Error('No token found');
            }
            const response = await axios.get(`http://192.168.1.88:8080/cliente/medidores/${meter.id}/getFechaConsumo`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log('meter.id: ', meter.id);
            console.log('Fecha Consumo Response:', response.data);
            if (response.data && response.data.success) {
                console.log('response.data.fecha:', response.data.fecha);
                const responseFecha = response.data.fecha;
                const diaObtenido = parseInt(responseFecha.split('-')[2]);
                const diaAyer = diaObtenido - 1;
                const diaTomorrow = diaObtenido + 1;

                console.log('response', response.data.fecha);
                console.log('diaObtenido: ', diaObtenido);
                console.log('diaAyer: ', diaAyer);
                console.log('diaTomorrow: ', diaTomorrow);

                const fecha_actual = new Date().toISOString().split('T')[0];
                console.log('Fecha de hoy', fecha_actual);

                const diaActual = parseInt(fecha_actual.split('-')[2]);
                console.log('diaActual: ', diaActual);

                const diaHoy = parseInt(fecha_actual.split('-')[2]);
                console.log('dia hoy', diaHoy);

                if (diaActual === diaAyer || diaActual === diaTomorrow || diaActual === diaObtenido) {
                    console.log('Navigating to CameraScreen');
                    navigation.navigate('CameraScreen', { meter, fecha: response.data.fecha });
                } else {
                    console.log('Date mismatch, showing alert');
                    Alert.alert('Aviso', `No corresponde la fecha para tomar la foto. Su fecha es el día ${diaObtenido} de cada mes`);
                }
            } else {
                Alert.alert('Aviso', response.data.message || 'No corresponde la fecha para tomar la foto.');
            }
        } catch (error) {
            console.error('Error checking fecha consumo', error);
            Alert.alert('Error', 'Hubo un problema al verificar la fecha de consumo');
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
                    meters.map((meter, index) => (
                        <View key={index} style={styles.medidorRow}>
                            <View style={styles.medidorContainer}>
                                <ClientHeader
                                    direccion={{
                                        calle: meter.direccion,
                                        comuna: meter.comuna,
                                        region: meter.region,
                                        numeroCliente: meter.numcliente,
                                    }}
                                    medidorId={meter.id}
                                    onPress={() => handleMeterSelect(meter)}
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
        backgroundColor: '#FFFFFF',
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
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default MeterListScreen;
