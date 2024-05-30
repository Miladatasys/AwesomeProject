import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from "@react-navigation/native";

const HistorialClienteScreen = () => {
    const [historial, setHistorial] = useState([]);
    const [activeYear, setActiveYear] = useState('2024'); // Estado para el año activo
    const navigation = useNavigation();

    // Simulación de llamada al backend
    useEffect(() => {
        // Aquí hacer la llamada a la API para obtener los datos
        // fetch('http://el-backend-api/historial')
        //   .then(response => response.json())
        //   .then(data => setHistorial(data))
        //   .catch(error => console.error(error));
        
        // Dejar los datos vacíos hasta que se integre con el backend
    }, []);

    const handleYearPress = (year) => {
        setActiveYear(year);
        // Aquí puedes añadir la lógica para actualizar los datos según el año seleccionado
    };

    return (
        <ScrollView style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButtonContainer}>
                <Icon name="arrow-back" size={24} color="#4271d4" />
                <Text style={styles.backButtonText}>Volver</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Historial del medidor</Text>
            <View style={styles.tabsContainer}>
                {['2022', '2023', '2024'].map((year) => (
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
                <Text style={styles.tableHeaderText}>Fecha lectura</Text>
                <Text style={styles.tableHeaderText}>Estado medidor</Text>
                <Text style={styles.tableHeaderText}>Consumo kW</Text>
            </View>
            {historial.length === 0 ? (
                <Text style={styles.noDataText}>No hay datos disponibles</Text>
            ) : (
                historial.map((item, index) => (
                    <View key={index} style={styles.tableRow}>
                        <Text style={styles.tableRowText}>{item.fechaLectura}</Text>
                        <Text style={styles.tableRowText}>{item.estadoMedidor}</Text>
                        <Text style={styles.tableRowText}>{item.consumoKw}</Text>
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
        padding: 20,
    },
    backButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
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
        fontFamily: 'Roboto-Bold',
        color: '#000',
    },
    tabsContainer: {
        flexDirection: 'row',
        marginBottom: 20,
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
        fontSize: 16,
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
        fontSize: 16,
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
