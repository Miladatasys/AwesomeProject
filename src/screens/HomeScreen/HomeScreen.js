import React from "react";
import { View, Text } from "react-native";
import CustomButton from "../../components/CustomButton";
import BottomBar from "../../components/CustomBottomBar.js/BottomBar";


const HomeScreen = () => {
    return (
        <><View>
            <Text style={{ fontSize: 24, alignSelf: 'center' }}>Home Screen</Text>
        </View><BottomBar /></>
    );
}

export default HomeScreen;