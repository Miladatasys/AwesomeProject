import React from 'react';
import { View } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';

const MyGiftedChart = ({ data }) => {
  // Obtener los meses y los kWh consumidos
  const months = data.map(consumo => consumo.fecha.split('-')[1]); // Obtener los meses
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
        color="#FE0F64"
        lineConfig={{ strokeWidth: 2 }}
      />
    </View>
  );
};

export default MyGiftedChart;
