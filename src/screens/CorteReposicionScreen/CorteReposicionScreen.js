import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CorteReposicionScreen = () => {
  const navigation = useNavigation();
  const [expanded, setExpanded] = useState(null);

  const toggleExpand = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  const faqs = [
    {
      id: 1,
      question: '¿Cuándo estoy afecto a corte de energía?',
      answer:
        'Según la normativa vigente, las empresas distribuidoras de energía eléctrica están facultadas para efectuar el corte de suministro luego de 45 días desde el vencimiento de la primera boleta o factura impaga. Para clientes que hayan acordado un convenio de pago, el corte de suministro podrá efectuarse a contar del día siguiente del vencimiento de una de sus cuotas impagas. Encuentra en tu boleta la fecha de corte. Si no la tienes, solicita una copia aquí. Además, te invitamos a suscribirte a la Boleta Electrónica para tenerla siempre a mano.'
    },
    {
      id: 2,
      question: 'Una vez pagada la cuenta, ¿cuál es el plazo de reposición del suministro?',
      answer:
        'El plazo establecido en la ley eléctrica (decreto 327, artículo 152) es dentro de 24 horas siguientes al pago. No obstante, Enel en su afán de buscar la satisfacción con sus clientes, considera un plazo menor a lo establecido por el regulador.'
    }
  ];

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButtonContainer}>
        <Icon name="arrow-back" size={24} color="#4271d4" />
        <Text style={styles.backButton}>Volver</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Corte y Reposición</Text>
      {faqs.map((faq) => (
        <View key={faq.id} style={styles.faqContainer}>
          <TouchableOpacity onPress={() => toggleExpand(faq.id)} style={styles.questionContainer}>
            <Text style={styles.question}>{faq.question}</Text>
          </TouchableOpacity>
          {expanded === faq.id && (
            <View style={styles.answerContainer}>
              <Text style={styles.answer}>{faq.answer}</Text>
            </View>
          )}
        </View>
      ))}
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
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
  },
  questionContainer: {
    backgroundColor: '#FE0F64',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#dddddd',
  },
  question: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'Roboto-Bold',
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
    fontFamily: 'Roboto-Regular',
  },
});

export default CorteReposicionScreen;
