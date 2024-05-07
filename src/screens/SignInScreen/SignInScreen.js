import React, { useState } from "react";
import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView, TextInput, TouchableOpacity } from "react-native";
import Logo from "../../../assets/images/Enel.png";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";

const SignInScreen = () => {
    const [rut, setRut] = useState('');
    const [password, setPassword] = useState('');
    const [rutError, setRutError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [selectedUserType, setSelectedUserType] = useState('PERSONA');

    const { width } = useWindowDimensions();
    const navigation = useNavigation();

    const validateRut = () => {
        if (!rut.trim()) {
            setRutError('Ingrese su rut');
            return false;
        } else {
            setRutError('');
            return true;
        }
    };

    const validatePassword = () => {
        if (!password.trim()) {
            setPasswordError('Ingrese su contraseña');
            return false;
        } else {
            setPasswordError('');
            return true;
        }
    };

    const onSignInPressed = () => {
        if (validateRut() && validatePassword()) {
            // Validar al usuario (conexión con el backend)
            navigation.navigate('HomeScreen');
        }
    };

    const onForgotPasswordPressed = () => {
        navigation.navigate('ForgotPassword');
    };

    const onSignUpPressed = () => {
        navigation.navigate('SignUp');
    };

    const handleUserTypeSelection = (userType) => {
        setSelectedUserType(userType);
    };

    const onAdminLoginPressed = () => {
        navigation.navigate('AdminSignIn');
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.root}>
                <Image 
                    source={Logo} 
                    style={[styles.logo, { width: width * 0.7 }]} 
                    resizeMode="contain" 
                />

                <View style={styles.tabContainer}>
                    <TouchableOpacity 
                        style={[
                            styles.tabButton, 
                            selectedUserType === 'PERSONA' && styles.selectedTabButton
                        ]}
                        onPress={() => handleUserTypeSelection('PERSONA')}
                    >
                        <Text style={styles.tabButtonText}>PERSONA</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[
                            styles.tabButton, 
                            selectedUserType === 'EMPRESA' && styles.selectedTabButton
                        ]}
                        onPress={() => handleUserTypeSelection('EMPRESA')}
                    >
                        <Text style={styles.tabButtonText}>EMPRESA</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Ingrese su rut:</Text>
                    <TextInput
                        style={[styles.input, rutError && styles.inputError]}
                        placeholder="XX.XXX.XXX-X"
                        value={rut}
                        onChangeText={(text) => setRut(text)}
                        onBlur={validateRut}
                    />
                    {rutError ? <Text style={styles.errorText}>{rutError}</Text> : null}
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Ingrese su contraseña:</Text>
                    <TextInput
                        style={[styles.input, passwordError && styles.inputError]}
                        placeholder="Contraseña"
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        onBlur={validatePassword}
                        secureTextEntry
                    />
                    {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
                </View>

                <CustomButton text="Ingresar" onPress={onSignInPressed}/>

                <View style={styles.buttonsContainer}>
                    <TouchableOpacity style={styles.button} onPress={onForgotPasswordPressed}>
                        <Text style={styles.buttonText}>¿Olvidaste tu contraseña?</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={onSignUpPressed}>
                        <Text style={styles.buttonText}>Crear una cuenta</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={onAdminLoginPressed}>
                    <Text style={styles.adminButtonText}>Ingresar como Administrador</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 20,
    },
    logo: {
        maxHeight: 200,
        marginBottom: 20,
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        marginBottom: 20,
    },
    tabButton: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 3,
        borderBottomColor: '#E1E1E1',
    },
    selectedTabButton: {
        borderBottomColor: '#4271d4',
    },
    tabButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2F2F2F',
    },
    inputContainer: {
        width: '100%',
        marginBottom: 20,
    },
    label: {
        marginBottom: 5,
        color: '#2F2F2F',
    },
    input: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: '#F6F6F6',
        borderRadius: 5,
        paddingHorizontal: 10,
        color: '#2F2F2F',
    },
    inputError: {
        borderColor: '#FE0F64',
    },
    errorText: {
        color: '#FE0F64',
        fontSize: 12,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 20,
    },
    button: {
        backgroundColor: '#4271d4',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 14,
    },
    adminButtonText: {
        color: '#2F2F2F',
        marginTop: 30, 
        textAlign: 'left', 
        alignSelf: 'flex-start', 
        marginLeft: 20,
    }
    
    
});

export default SignInScreen;  


