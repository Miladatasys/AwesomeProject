import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert, TouchableOpacity, Text, ScrollView } from 'react-native';
import { launchCamera } from 'react-native-image-picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import RNFS from 'react-native-fs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ClientHeader from '../../components/CustomHeader/ClientHeader';

const CamaraCotizacionScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { meter } = route.params;

    const [imageUri, setImageUri] = useState(null);
    const [recognizedText, setRecognizedText] = useState(null);
    const [clientData, setClientData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = await AsyncStorage.getItem('userToken');
                if (!token) {
                    throw new Error('No token found');
                }
                const response = await axios.get('http://192.168.1.88:8080/cliente/user/profile', {
                    headers: { Authorization: `Bearer ${token}` }
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

    const openCamera = () => {
        const options = {
            mediaType: 'photo',
            cameraType: 'back',
            quality: 1, // Máxima calidad
            saveToPhotos: true,
            includeBase64: false,
        };
        launchCamera(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled camera picker');
            } else if (response.errorCode) {
                Alert.alert('Error', response.errorMessage);
            } else {
                const uri = response.assets[0].uri;
                setImageUri(uri);
                console.log('Image URI:', uri);
                processImage(uri);
            }
        });
    };

    const convertImageToBase64 = async (uri) => {
        try {
            const base64String = await RNFS.readFile(uri, 'base64');
            console.log('Base64 Image:', base64String);
            return base64String;
        } catch (error) {
            console.error('Error converting image to base64', error);
            throw error;
        }
    };

    const processImage = async (uri) => {
        try {
            const base64Image = await convertImageToBase64(uri);
            const response = await axios.post(
                'https://tbnmzqmst6.execute-api.us-east-1.amazonaws.com/rekognition/our-rekognition',
                JSON.stringify({ body: base64Image }),
                { headers: { 'Content-Type': 'application/json' } }
            );
            console.log('Response from Rekognition:', response.data);
            setRecognizedText(response.data);
            navigation.navigate('CotizacionConsumoScreen', { imageUri: uri, recognizedText: response.data, meterId: meter.id });
        } catch (error) {
            console.error('Error processing image:', error);
            Alert.alert('Error', 'Failed to process image');
        }
    };

    if (loading) {
        return <Text>Cargando...</Text>;
    }
    if (!clientData) {
        return <Text>No hay datos disponibles</Text>;
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('ListMedidoresCotScreen')}>
                    <Text style={styles.backButtonText}>Volver atrás</Text>
                </TouchableOpacity>
            </View>
            <ClientHeader
                nombreCliente={`${clientData.firstname} ${clientData.lastname}`}
                direccion={{
                    calle: meter.direccion,
                    comuna: meter.comuna,
                    region: meter.region,
                    numeroCliente: meter.numcliente,
                }}
            />
            <View style={styles.infoContainer}>
                <View style={styles.recommendation}>
                    <Text style={styles.recommendationText}>📏 Mantén una distancia con el medidor y ubícate al frente para obtener una foto clara de la lectura. Si existe poca iluminación, utiliza otra fuente de luz.</Text>
                </View>
                <View style={styles.recommendation}>
                    <Text style={styles.recommendationText}>↘️ En caso en que el medidor se ubique por debajo de tu cintura, inclínate/agáchate sin que tus rodillas toquen el piso.</Text>
                </View>
            </View>
            <View style={styles.content}>
                <TouchableOpacity style={styles.button} onPress={openCamera}>
                    <Text style={styles.buttonText}>Abrir Cámara</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        paddingTop: 10,
        paddingHorizontal: 10,
    },
    infoContainer: {
        padding: 20,
        backgroundColor: '#F2F2F2',
        borderRadius: 8,
        margin: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 5,
    },
    recommendation: {
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#dddddd',
    },
    recommendationText: {
        fontSize: 19,
        color: '#2F2F2F',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    button: {
        width: '80%',
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#FF1493',
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonText: {
        color: '#FFFFFF',
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

export default CamaraCotizacionScreen;
