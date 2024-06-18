import React from 'react';
import { View } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';

const MyGiftedChart = ({ data }) => {
  // Nombres abreviados de los meses
  const monthNames = [
    'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
    'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
  ];

  // Obtener los meses y los kWh consumidos
  const months = data.map(consumo => {
    const monthNumber = parseInt(consumo.fecha.split('-')[1]); // Obtener el número del mes
    return monthNames[monthNumber - 1]; // Obtener el nombre abreviado del mes
  });

  const consumption = data.map(consumo => consumo.consumo); // Obtener los kWh consumidos

  // Crear los objetos de datos para el gráfico
  const chartData = months.map((month, index) => ({
    value: consumption[index], // Valor del kWh consumido
    label: month, // Mes
  }));

  return (
    <View style={{ marginTop: 20 }}>
      <LineChart
        data={chartData}
        height={200}
        width={300}
        color="#00BFFF" // Azul claro
        lineConfig={{
          color: '#00BFFF',
          width: 2,
        }}
        areaChart
        startFillColor="rgba(0, 191, 255, 0.3)" // Azul claro con transparencia
        endFillColor="rgba(255, 255, 255, 0.3)" // Blanco con transparencia
        showDataPoints
        dataPointsConfig={{
          color: '#00BFFF', // Azul claro
          size: 6,
        }}
        curved
        noOfSections={4}
        yAxisLabelWidth={40}
        yAxisColor={'#ccc'}
        xAxisColor={'#ccc'}
        initialSpacing={10}
        spacing={40}
        rulesColor={'#ccc'}
        rulesType={'solid'}
        showXAxisIndices={true}
        xAxisIndicesHeight={2}
        xAxisIndicesColor={'#ccc'}
        yAxisIndicesHeight={2}
        yAxisIndicesColor={'#ccc'}
      />
    </View>
  );
};

export default MyGiftedChart;
