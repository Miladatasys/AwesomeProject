import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

const CustomButton = ({ onPress, text, type = "PRIMARY", bgColor, fgColor }) => {
    return (
        <Pressable onPress={onPress} 
        style={[
            styles.container, 
            styles[`container_${type}`],
            bgColor ? {backgroundColor: bgColor} : {},
            ]}>
        <Text 
            style={[
                styles.text, 
                styles[`text_${type}`],
                fgColor ? {color: fgColor} : {},
                ]}>
                {text}
        </Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '50%',
        padding: 15,
        marginVertical: 5,
        borderRadius: 5,
        alignItems: 'center',
    },

    container_PRIMARY: {
        backgroundColor: '#FE0F64',
    },

    container_SECONDARY: {
        borderColor: '#2F2F2F',
        borderWidth: 2,
    },

    container_TERTIARY: {

    },

    text: {
        color: 'white',
        fontWeight: 'bold',
    },

    text_SECONDARY: {
        color: '#2F2F2F',
    },

    text_TERTIARY: {
        color: 'gray',
    },
});

export default CustomButton;
