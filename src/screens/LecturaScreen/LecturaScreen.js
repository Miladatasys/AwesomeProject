import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const LecturaScreen = () => {
  const [expandedQuestion, setExpandedQuestion] = useState(null);
  const navigation = useNavigation();

  const handleToggleQuestion = (question) => {
    setExpandedQuestion(expandedQuestion === question ? null : question);
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={handleBackPress} style={styles.backButtonContainer}>
        <Icon name="arrow-back" size={24} color="#4271d4" />
        <Text style={styles.backButton}>Volver</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Lectura</Text>
      <View style={styles.faqContainer}>
        <TouchableOpacity onPress={() => handleToggleQuestion('q1')} style={styles.questionContainer}>
          <Text style={styles.question}>¿Debo permitir el acceso de los lectores a mi medidor?</Text>
        </TouchableOpacity>
        {expandedQuestion === 'q1' && (
          <View style={styles.answerContainer}>
            <Text style={styles.answer}>
              Sí. De esa forma podemos emitir tu boleta de acuerdo a lo que realmente consumiste. El personal que realiza esta labor, debe portar la credencial que lo acredita para acceder al medidor y efectuar el registro de tu consumo. Si por cualquier causa no imputable a la compañía, no pudiera efectuarse la lectura correspondiente, se dejará una constancia de esta situación en un lugar visible del inmueble y se facturará provisoriamente.
              Si nuestros lectores no pueden acceder a tu medidor, te invitamos a registrar tu consumo fácilmente.
            </Text>
          </View>
        )}

        <TouchableOpacity onPress={() => handleToggleQuestion('q2')} style={styles.questionContainer}>
          <Text style={styles.question}>¿Cuándo se factura un consumo provisional en la boleta?</Text>
        </TouchableOpacity>
        {expandedQuestion === 'q2' && (
          <View style={styles.answerContainer}>
            <Text style={styles.answer}>
              Cuando no es posible registrar la lectura del medidor, las empresas distribuidoras de energía eléctrica están facultadas para facturar provisoriamente el promedio de los consumos de los últimos seis meses. Al normalizarse la lectura, la facturación del consumo provisional en energía se descuenta de la boleta o factura, ajustando el consumo real.
            </Text>
          </View>
        )}

        <TouchableOpacity onPress={() => handleToggleQuestion('q3')} style={styles.questionContainer}>
          <Text style={styles.question}>¿Cómo puedo registrar el consumo de energía de mi medidor?</Text>
        </TouchableOpacity>
        {expandedQuestion === 'q3' && (
          <View style={styles.answerContainer}>
            <Text style={styles.answer}>
              Si nuestros lectores no pueden acceder a tu medidor, te invitamos a registrar tu consumo fácilmente. 
              Si estás registrado en nuestra Sucursal Virtual, ingresa a la sección "Mis Cuentas" y luego a "Ingreso de Lecturas" que se encuentra al final del listado de detalle de facturas.
            </Text>
          </View>
        )}

        <TouchableOpacity onPress={() => handleToggleQuestion('q4')} style={styles.questionContainer}>
          <Text style={styles.question}>¿Cómo leer el medidor?</Text>
        </TouchableOpacity>
        {expandedQuestion === 'q4' && (
          <View style={styles.answerContainer}>
            <Text style={styles.answer}>
              Si nuestros lectores no pueden acceder a tu domicilio, puedes hacerlo tú mismo con solo subir una foto. Encontrarás en detalle cómo identificar tu medidor y los simples pasos que debes seguir para registrar tu consumo.
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#E8EAF6',
  },
  backButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    fontSize: 16,
    color: '#4271d4',
    marginLeft: 5,
    fontWeight: 'bold',
    fontFamily: 'Roboto-Regular',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#2F2F2F',
    fontFamily: 'Roboto-Bold',
  },
  faqContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
  },
  questionContainer: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#dddddd',
  },
  question: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#2F2F2F',
    fontFamily: 'Roboto-Regular',
  },
  answerContainer: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 15,
    marginTop: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
  },
  answer: {
    fontSize: 19,
    color: '#2F2F2F',
    fontFamily: 'Roboto-Regular',
  },
});

export default LecturaScreen;
