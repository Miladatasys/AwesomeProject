import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
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
import ClientNumberScreen from '../screens/ClientNumberScreen/ClientNumberScreen';
import HelpScreen from '../screens/HelpScreen/HelpScreen';
import FAQScreen from '../screens/FAQScreen/FAQScreen';
import CorteReposicionScreen from '../screens/CorteReposicionScreen/CorteReposicionScreen';
import LecturaScreen from '../screens/LecturaScreen/LecturaScreen';
import TemasGeneralesScreen from '../screens/TemasGenerales/TemasGenerales';
import ClientProfileScreen from '../screens/ClientProfileScreen/ClientProfileScreen';
import VerificacionCodigoScreen from '../screens/VerificacionCodigoScreen/VerificacionCodigoScreen';
import HistorialClienteScreen from '../screens/HistorialClienteScreen/HistorialClienteScreen';
import CameraScreen from '../screens/CamaraScreen/CamaraScreen';
import PreviewScreen from '../screens/PreviewScreen/PreviewScreen';
import EditProfileScreen from '../screens/EditProfileScreen/EditProfileScreen';
import ClientSettings from '../screens/ClientSettings/ClientSettings';
import VerMedidor from '../components/VerMedidor/VerMedidor';
import MedidoresScreen from '../screens/MedidoresScreen/MedidoresScreen';
import MeterListScreen from '../screens/MeterListScreen/MeterListScreen'; 

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
                <Stack.Screen name="ClientNumberScreen" component={ClientNumberScreen} />
                <Stack.Screen name="HelpScreen" component={HelpScreen} />
                <Stack.Screen name="FAQScreen" component={FAQScreen} />
                <Stack.Screen name="CorteReposicionScreen" component={CorteReposicionScreen} />
                <Stack.Screen name="LecturaScreen" component={LecturaScreen} />
                <Stack.Screen name="TemasGeneralesScreen" component={TemasGeneralesScreen} />
                <Stack.Screen name="ClientProfileScreen" component={ClientProfileScreen} />
                <Stack.Screen name="VerificacionCodigoScreen" component={VerificacionCodigoScreen} />
                <Stack.Screen name="HistorialClienteScreen" component={HistorialClienteScreen} />
                <Stack.Screen name="CameraScreen" component={CameraScreen} />
                <Stack.Screen name="PreviewScreen" component={PreviewScreen} />
                <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
                <Stack.Screen name="ClientSettings" component={ClientSettings} />
                <Stack.Screen name="VerMedidor" component={VerMedidor} />
                <Stack.Screen name="MedidoresScreen" component={MedidoresScreen} />
                <Stack.Screen name="MeterListScreen" component={MeterListScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Navigation;
