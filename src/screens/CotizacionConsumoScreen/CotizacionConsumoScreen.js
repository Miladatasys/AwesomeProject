import React from 'react';
import { View, Text, Image, Pressable, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CotizacionConsumoScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { imageUri, recognizedText, meterId } = route.params;

    console.log('PreviewScreen imageUri:', imageUri);
    console.log('PreviewScreen recognizedText:', recognizedText);

    const getCurrentDate = () => {
        const date = new Date();
        const year = date.getFullYear();
        const month = (`0${date.getMonth() + 1}`).slice(-2); // Months are 0-based, so add 1
        const day = (`0${date.getDate()}`).slice(-2);
        return `${year}-${month}-${day}`;
    };

    const detectedNumbers = recognizedText.body ? JSON.parse(recognizedText.body).detectedNumbers : [];
    const uniqueDetectedNumbers = [...new Set(detectedNumbers)];

    const handleSubmit = async () => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            if (!token) {
                throw new Error('No token found');
            }

            const lectura = uniqueDetectedNumbers.join('');
            const fecha = getCurrentDate();

            console.log('medidorId:', meterId);
            console.log('lectura:', lectura);
            console.log('fecha:', fecha);

            const response = await axios.post(
                `http://192.168.1.88:8080/cliente/medidores/${meterId}/cotizarConsumo`, 
                { 
                    lectura,
                    fecha
                }, 
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            console.log('Response from backend:', response.data);

            const { subtotal, iva, total } = response.data.object;
    
            Alert.alert('Su cotización es:', `Subtotal: ${subtotal}\nIVA: ${iva}\nTotal: ${total}`, [
                {
                    text: 'OK',
                    onPress: () => navigation.navigate('HomeScreen'),
                },
            ]);
        } catch (error) {
            Alert.alert('Error', 'No puede enviar una lectura vacia');
        }
    };

    return (
        <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('HomeScreen')}>
            <Text style={styles.backButtonText}>Volver a Home</Text>
         </TouchableOpacity>
            <Text style={styles.headerTitle}>Previsualización</Text>
            <View style={styles.textContainer}>
                <Text style={styles.textTitle}>Lectura Reconocida:</Text>
                {uniqueDetectedNumbers.length > 0 ? (
                    <Text style={styles.numberText}>
                        {uniqueDetectedNumbers.join(', ')}
                    </Text>
                ) : (
                    <Text style={styles.numberText}>No se detectaron números.</Text>
                )}
            </View>
            {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
            <Pressable
                style={({ pressed }) => [
                    {
                        backgroundColor: pressed ? '#FF1493' : '#CCCCCC',
                    },
                    styles.button,
                ]}
                onPress={() => navigation.goBack()}
            >
                <Text style={styles.buttonText}>Retomar</Text>
            </Pressable>
            <Pressable
                style={({ pressed }) => [
                    {
                        backgroundColor: pressed ? '#FF1493' : '#CCCCCC',
                    },
                    styles.button,
                ]}
                onPress={handleSubmit}
            >
                <Text style={styles.buttonText}>Enviar imagen</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#FFFFFF',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333333',
        marginBottom: 20,
    },
    image: {
        width: 350,
        height: 250,
        marginBottom: 20,
        borderRadius: 10,
    },
    textContainer: {
        marginBottom: 20,
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        width: '100%',
    },
    textTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#333333',
    },
    numberText: {
        fontSize: 24,
        color: '#FF1493',
        fontWeight: 'bold',
    },
    button: {
        width: '80%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonText: {
        color: '#333333',
        fontSize: 16,
        fontWeight: 'bold',
    },
    backButton: {
        alignSelf: 'flex-start',
        marginBottom: 10,
    },
    backButtonText: {
        fontSize: 16,
        color: '#4271d4',
        fontWeight: 'bold',
        fontFamily: 'Roboto-Regular',
    },
});

export default CotizacionConsumoScreen;
