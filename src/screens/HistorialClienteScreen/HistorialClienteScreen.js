import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HistorialClienteScreen = () => {
    const [consumos, setConsumos] = useState([]);
    const [filteredConsumos, setFilteredConsumos] = useState([]);
    const [availableYears, setAvailableYears] = useState([]);
    const [activeYear, setActiveYear] = useState('2024'); // Estado para el año activo
    const navigation = useNavigation();
    const route = useRoute();
    const { medidorId } = route.params;

    useEffect(() => {
        const fetchHistorial = async () => {
            try {
                const token = await AsyncStorage.getItem('userToken');
                console.log('Token:', token); // Verificar el token
                console.log('medidorId:', medidorId); // Verificar medidorId
                if (!token) {
                    throw new Error('No token found');
                }
                const response = await axios.get(`http://192.168.1.100:8080/cliente/medidores/${medidorId}/getConsumos`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (response.data.object) {
                    setConsumos(response.data.object);
                    console.log('Fetched Client Data:', response.data.object);

                    const years = response.data.object.map(consumo => consumo.fecha.split('-')[0]);
                    setAvailableYears([...new Set(years)]);
                    setFilteredConsumos(response.data.object.filter(consumo => consumo.fecha.startsWith(activeYear)));
                } else {
                    console.log('consumo no encontrado');
                }
            } catch (error) {
                console.error('Error fetching profile data', error);
            }
        };

        fetchHistorial();
    }, [medidorId, activeYear]);

    const handleYearPress = (year) => {
        setActiveYear(year);
        setFilteredConsumos(consumos.filter(consumo => consumo.fecha.startsWith(year)));
    };

    return (
        <ScrollView style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButtonContainer}>
                <Icon name="arrow-back" size={24} color="#4271d4" />
                <Text style={styles.backButtonText}>Volver</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Historial del medidor</Text>
            <View style={styles.tabsContainer}>
                {availableYears.map((year) => (
                    <TouchableOpacity
                        key={year}
                        style={[styles.tab, activeYear === year && styles.activeTab]}
                        onPress={() => handleYearPress(year)}
                    >
                        <Text style={[styles.tabText, activeYear === year && styles.activeTabText]}>{year}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <View style={styles.tableHeader}>
                <Text style={styles.tableHeaderText}>Fecha</Text>
                <Text style={styles.tableHeaderText}>Lectura</Text>
                <Text style={styles.tableHeaderText}>Consumo</Text>
                <Text style={styles.tableHeaderText}>Valor Estimado</Text>
            </View>
            {filteredConsumos.length === 0 ? (
                <Text style={styles.noDataText}>No hay datos disponibles</Text>
            ) : (
                filteredConsumos.map((item, index) => (
                    <View key={index} style={styles.tableRow}>
                        <Text style={styles.tableRowText}>{item.fecha}</Text>
                        <Text style={styles.tableRowText}>{item.lectura}</Text>
                        <Text style={styles.tableRowText}>{item.consumo}</Text>
                        <Text style={styles.tableRowText}>{item.total}</Text>
                    </View>
                ))
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
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
        marginBottom: 10,
        fontFamily: 'Roboto-Bold',
        color: '#000',
    },
    tabsContainer: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    tab: {
        marginRight: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        backgroundColor: '#f1f1f1',
    },
    activeTab: {
        backgroundColor: '#FE0F64',
    },
    tabText: {
        fontSize: 16,
        color: '#000',
        fontFamily: 'Roboto-Regular',
    },
    activeTabText: {
        color: '#fff',
    },
    tableHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        paddingHorizontal: 10,
    },
    tableHeaderText: {
        fontSize: 14,
        fontWeight: 'bold',
        fontFamily: 'Roboto-Bold',
        color: '#000',
        flex: 1,
        textAlign: 'center',
    },
    tableRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        paddingHorizontal: 10,
    },
    tableRowText: {
        fontSize: 14,
        fontFamily: 'Roboto-Regular',
        color: '#000',
        flex: 1,
        textAlign: 'center',
    },
    noDataText: {
        fontSize: 16,
        fontFamily: 'Roboto-Regular',
        color: '#7a7a7a',
        textAlign: 'center',
        marginTop: 20,
    },
});

export default HistorialClienteScreen;
