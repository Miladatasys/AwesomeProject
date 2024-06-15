import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
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
                const response = await axios.get('http://192.168.1.100:8080/cliente/userMedidores/profile', {
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

    const handleMeterSelect = (meter) => {
        navigation.navigate('CameraScreen', { meter });
    };

    if (loading) {
        return <Text>Cargando...</Text>;
    }

    return (
        <View style={styles.container}>
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
});

export default MeterListScreen;
