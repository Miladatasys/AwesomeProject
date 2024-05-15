import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ConfirmEmailScreen from '../screens/ConfirmEmailScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import NewPasswordScreen from '../screens/NewPasswordScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import AdminSignInScreen from '../screens/AdminSignIn/AdminSignInScreen';
import AdminForgotPasswordScreen from '../screens/AdminForgotPassword/AdminForgotPasswordScreen';
import AdminHomeScreen from '../screens/AdminHomeScreen/AdminHomeScreen';
import AdminNewPasswordScreen from '../screens/AdminNewPasswordScreen/AdminNewPasswordScreen';
import AddressScreen from '../screens/AddressScreen/AddressScreen';


const Stack = createNativeStackNavigator();

const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="SignIn" component={SignInScreen} />
                <Stack.Screen name="SignUp" component={SignUpScreen} />
                <Stack.Screen name="ConfirmEmail" component={ConfirmEmailScreen} />
                <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
                <Stack.Screen name="NewPassword" component={NewPasswordScreen} />
                <Stack.Screen name="HomeScreen" component={HomeScreen} />
                <Stack.Screen name="AdminSignIn" component={AdminSignInScreen} />
                <Stack.Screen name="AdminForgotPassword" component={AdminForgotPasswordScreen} />
                <Stack.Screen name="AdminHomeScreen" component={AdminHomeScreen} />
                <Stack.Screen name="AdminNewPassword" component={AdminNewPasswordScreen} />
                <Stack.Screen name="AddressScreen" component={AddressScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Navigation;
