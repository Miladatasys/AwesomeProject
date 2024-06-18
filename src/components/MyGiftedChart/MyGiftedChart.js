import React from 'react';
import { View, Text } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';

const MyGiftedChart = ({ data }) => {
  // Nombres abreviados de los meses
  const monthNames = [
    'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
    'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
  ];

  // Crear un mapa de consumos por mes
  const consumptionMap = data.reduce((acc, consumo) => {
    const monthNumber = parseInt(consumo.fecha.split('-')[1]); // Obtener el número del mes
    acc[monthNumber - 1] = consumo.consumo; // Asociar el consumo al mes correspondiente
    return acc;
  }, {});

  // Crear los objetos de datos para el gráfico con todos los meses
  const chartData = monthNames.map((month, index) => ({
    value: consumptionMap[index] !== undefined ? consumptionMap[index] : 0, // Usar el consumo si está disponible, sino 0
    label: month, // Mes
    dataPointColor: '#00BFFF', // Color del punto de datos
  }));

  // Función para formatear etiquetas del eje y
  const yAxisLabel = (value) => `${value} kWh`;

  return (
    <View style={{ marginTop: 20, flexDirection: 'row' }}>
      <View style={{ justifyContent: 'space-between', height: 200, marginRight: 10 }}>
        {Array.from({ length: 5 }).map((_, index) => {
          const value = Math.round((Math.max(...chartData.map(d => d.value)) / 4) * (4 - index)); // Ajuste de orden para que sea de mayor a menor
          return (
            <Text key={index} style={{ textAlign: 'right' }}>
              {yAxisLabel(value)}
            </Text>
          );
        })}
      </View>
      <LineChart
        data={chartData}
        height={200}
        width={300}
        color="#00BFFF" // Celeste fuerte
        lineConfig={{
          color: '#00BFFF',
          width: 4, // Aumentar el grosor de la línea
        }}
        areaChart
        startFillColor="rgba(135, 206, 235, 0.3)" // Celeste claro con transparencia
        endFillColor="rgba(255, 255, 255, 0.3)" // Blanco con transparencia
        showDataPoints
        dataPointsConfig={{
          color: '#00BFFF', // Celeste fuerte para los puntos de datos
          size: 6, // Tamaño de los puntos de datos
        }}
        curved
        noOfSections={4}
        yAxisLabelWidth={0} // Ajustado para no mostrar etiquetas predeterminadas del eje y
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
