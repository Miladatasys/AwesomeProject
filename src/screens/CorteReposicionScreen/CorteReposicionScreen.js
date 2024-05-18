import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

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
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.backButton}>Volver</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Corte y Reposición</Text>
      {faqs.map((faq) => (
        <View key={faq.id} style={styles.faqContainer}>
          <TouchableOpacity onPress={() => toggleExpand(faq.id)} style={styles.questionContainer}>
            <Text style={styles.question}>{faq.question}</Text>
          </TouchableOpacity>
          {expanded === faq.id && <Text style={styles.answer}>{faq.answer}</Text>}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  backButton: {
    fontSize: 16,
    color: '#4271d4',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#2F2F2F',
  },
  faqContainer: {
    marginBottom: 10,
  },
  questionContainer: {
    backgroundColor: '#FE0F64',
    padding: 10,
    borderRadius: 5,
  },
  question: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  answer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#fafafa',
    borderRadius: 5,
    color: '#2F2F2F',
  }
});

export default CorteReposicionScreen;