import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const TemasGeneralesScreen = () => {
  const navigation = useNavigation();
  const [expandedQuestion, setExpandedQuestion] = useState(null);

  const handleToggleQuestion = (question) => {
    setExpandedQuestion(expandedQuestion === question ? null : question);
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButtonContainer}>
        <Icon name="arrow-back" size={24} color="#4271d4" />
        <Text style={styles.backButton}>Volver</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Temas Generales</Text>

      <View style={styles.faqContainer}>
        <TouchableOpacity onPress={() => handleToggleQuestion('q1')} style={styles.questionContainer}>
          <Text style={styles.question}>¿Qué hacer ante un corte de luz?</Text>
        </TouchableOpacity>
        {expandedQuestion === 'q1' && (
          <View style={styles.answerContainer}>
            <Text style={styles.answer}>
              En caso de que en tu propiedad se produzca un corte de luz, por favor considera lo siguiente.
            </Text>
          </View>
        )}

        <TouchableOpacity onPress={() => handleToggleQuestion('q2')} style={styles.questionContainer}>
          <Text style={styles.question}>¿Cómo puedo obtener información sobre cortes programados en algún sector de las comunas de la zona de concesión de Enel?</Text>
        </TouchableOpacity>
        {expandedQuestion === 'q2' && (
          <View style={styles.answerContainer}>
            <Text style={styles.answer}>
              Para revisar los cortes programados de las próximas 72 horas por comuna, por favor ingresa.
            </Text>
          </View>
        )}

        <TouchableOpacity onPress={() => handleToggleQuestion('q3')} style={styles.questionContainer}>
          <Text style={styles.question}>¿Cuándo se cobra cargo adicional de invierno?</Text>
        </TouchableOpacity>
        {expandedQuestion === 'q3' && (
          <View style={styles.answerContainer}>
            <Text style={styles.answer}>
              El límite de invierno es una medida establecida en la normativa eléctrica, que busca regular el aumento del consumo eléctrico durante el periodo de invierno.
            </Text>
          </View>
        )}

        <TouchableOpacity onPress={() => handleToggleQuestion('q4')} style={styles.questionContainer}>
          <Text style={styles.question}>¿Cómo denunciar un hurto de energía?</Text>
        </TouchableOpacity>
        {expandedQuestion === 'q4' && (
          <View style={styles.answerContainer}>
            <Text style={styles.answer}>
              ¡Evita los robos! Si quieres denunciar un hurto de energía, por favor ingresa.
            </Text>
          </View>
        )}

        <TouchableOpacity onPress={() => handleToggleQuestion('q5')} style={styles.questionContainer}>
          <Text style={styles.question}>¿Cómo hacer un reclamo a Enel?</Text>
        </TouchableOpacity>
        {expandedQuestion === 'q5' && (
          <View style={styles.answerContainer}>
            <Text style={styles.answer}>
              Para ingresar un reclamo, accede al formulario en nuestro sitio web y tu requerimiento será atendido a la brevedad.
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
    backgroundColor: '#E8EAF6',
    padding: 20,
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
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#2F2F2F',
  },
  faqContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
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
  },
  answerContainer: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 15,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
  },
  answer: {
    fontSize: 19,
    color: '#2F2F2F',
  },
});

export default TemasGeneralesScreen;
