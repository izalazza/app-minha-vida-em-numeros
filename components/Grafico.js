import React from 'react';
import { View, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

export default function Grafico({ registros }) {
  // pegar últimos 7 registros (ou menos)
  const últimos = [...registros].slice(-7);
  const labels = últimos.map(r => r.data);
  const data = últimos.map(r => r.musicas);

  const screenWidth = Dimensions.get('window').width - 32;

  return (
    <View style={{ marginHorizontal: 16, marginBottom: 12 }}>
      <LineChart
        data={{
          labels: labels,
          datasets: [{ data }]
        }}
        width={screenWidth}
        height={220}
        yAxisLabel=""
        chartConfig={{
          backgroundGradientFrom: "#fff",
          backgroundGradientTo: "#fff",
          decimalPlaces: 0,
          propsForDots: { r: "4" },
          color: (opacity = 1) => `rgba(106,90,205, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0,0,0, ${opacity})`
        }}
        bezier
      />
    </View>
  );
}
