import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert  } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
                const response = await axios.get('http://192.168.1.91:8080/cliente/userMedidores/profile', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (response.data && response.data.object) {
                    setMeters(response.data.object);
                } else {
                    console.error('No medidores found in response data');
                }
            } catch (error) {
                console.error('Error fetching meters', error);
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
            const response = await axios.get(`http://192.168.1.91:8080/cliente/medidores/${meter.id}/getFechaConsumo`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log('meter.id: ', meter.id);
            console.log('Fecha Consumo Response:', response.data);
            if (response.data && response.data.success) {
                console.log('response.data.fecha:', response.data.fecha);
                const responseFecha = response.data.fecha;
                const diaObtenido = parseInt(responseFecha.split('-')[2]);
                const diaAyer = diaObtenido -1;
                const diaTomorrow = diaObtenido +1;

                console.log('response', response.data.fecha);
                console.log('diaObtenido: ', diaObtenido);
                console.log('diaAyer: ', diaAyer);
                console.log('diaTomorrow: ', diaTomorrow);

                const fecha_actual =new Date().toISOString().split('T')[0];
                console.log('Fecha de hoy',fecha_actual);

                const diaActual = parseInt(fecha_actual.split('-')[2]);
                console.log('diaActual: ', diaActual);

                const diaHoy = parseInt(fecha_actual.split('-')[2]);
                console.log('dia hoy',diaHoy)

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
        return <Text>Cargando...</Text>;
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')} style={styles.backButtonContainer}>
                <Icon name="arrow-back" size={24} color="#4271d4" />
                <Text style={styles.backButtonText}>Volver</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Seleccione un Medidor</Text>
            <FlatList
                data={meters}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.meterItem} onPress={() => handleMeterSelect(item)}>
                        <Text style={styles.meterText}>{item.direccion}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#FFFFFF',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333333',
    },
    meterItem: {
        padding: 15,
        backgroundColor: '#F2F2F2',
        borderRadius: 8,
        marginBottom: 10,
    },
    meterText: {
        fontSize: 18,
        color: '#333333',
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
});

export default MeterListScreen;
