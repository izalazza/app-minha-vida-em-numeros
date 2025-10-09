import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function ListaRegistros({ registros, onEdit, onDelete }) {
  return (
    <View style={styles.card}>
      <Text style={styles.subtitulo}>Registros Salvos</Text>
      {registros.length > 0 ? [...registros].reverse().map(reg => (
        <View key={reg.id} style={styles.itemHistorico}>
          <View style={{flex:1}}>
            <Text style={styles.data}>{reg.data}</Text>
            <Text style={styles.itemTexto}>🎵 Músicas ouvidas: {reg.musicas}</Text>
            <Text style={styles.itemTexto}>⏰ Horas ouvindo: {reg.horas}</Text>
            <Text style={styles.itemTexto}>🌟 Novos artistas: {reg.novos}</Text>
          </View>

          <View style={styles.botoesAcao}>
            <TouchableOpacity style={styles.botaoEditar} onPress={() => onEdit(reg)}>
              <Text style={styles.botaoTextoAcao}>✎</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.botaoDelete} onPress={() => onDelete(reg.id)}>
              <Text style={styles.botaoTextoAcao}>X</Text>
            </TouchableOpacity>
          </View>
        </View>
      )) : (
        <Text style={styles.itemTexto}>Nenhum registro encontrado.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
    card: { backgroundColor: 'white', borderRadius: 8, padding: 15, marginHorizontal: 15, marginBottom: 20, elevation: 3 },
    subtitulo: { fontSize: 20, fontWeight: 'bold', marginBottom: 10, color: '#34495e' },
    itemHistorico: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderColor: '#eee' },
    data: { fontSize: 13, color: '#888', marginBottom: 6 },
    itemTexto: { fontSize: 15, color: '#333' },
    botoesAcao: { flexDirection: 'column', marginLeft: 10 },
    botaoEditar: { backgroundColor: '#f39c12', borderRadius: 15, width: 36, height: 36, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
    botaoDelete: { backgroundColor: '#e74c3c', borderRadius: 15, width: 36, height: 36, justifyContent: 'center', alignItems: 'center' },
    botaoTextoAcao: { color: 'white', fontWeight: 'bold', fontSize: 16 },
});
