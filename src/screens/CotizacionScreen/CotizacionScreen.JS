// src/screens/CotizacionScreen/CotizacionScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const CotizacionScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Cotización de cuenta de luz</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 20,
        backgroundColor: '#f5f5f5',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
});

export default CotizacionScreen;
