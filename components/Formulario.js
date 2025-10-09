import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function Formulario({ onSave, onCancel, registroEmEdicao }) {
  const [musicasOuvidas, setMusicasOuvidas] = useState('');
  const [horasOuvindo, setHorasOuvindo] = useState('');
  const [novosArtistas, setNovosArtistas] = useState('');

  useEffect(() => {
    if (registroEmEdicao) {
      setMusicasOuvidas(String(registroEmEdicao.musicas));
      setHorasOuvindo(String(registroEmEdicao.horas));
      setNovosArtistas(String(registroEmEdicao.novos));
    } else {
      setMusicasOuvidas('');
      setHorasOuvindo('');
      setNovosArtistas('');
    }
  }, [registroEmEdicao]);

  const handleSaveClick = () => {
    const musNum = parseFloat(String(musicasOuvidas).replace(',', '.'));
    const horasNum = parseFloat(String(horasOuvindo).replace(',', '.'));
    const novosNum = parseFloat(String(novosArtistas).replace(',', '.'));

    if (isNaN(musNum) || isNaN(horasNum) || isNaN(novosNum)) {
      return Alert.alert('Erro', 'Preencha os três campos com números válidos.');
    }
    if (musNum < 0 || horasNum < 0 || novosNum < 0) {
      return Alert.alert('Erro', 'Valores não podem ser negativos.');
    }
    if (horasNum > 24) {
      return Alert.alert('Erro', 'Horas não pode ser maior que 24.');
    }

    onSave(musNum, horasNum, novosNum); // envia números para o App.js

    // limpar (somente se não estiver em edição)
    if (!registroEmEdicao) {
      setMusicasOuvidas('');
      setHorasOuvindo('');
      setNovosArtistas('');
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.subtitulo}>
        {registroEmEdicao ? 'Editando Registro' : 'Novo Registro'}
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Quantas músicas você ouviu hoje?"
        keyboardType="numeric"
        value={musicasOuvidas}
        onChangeText={setMusicasOuvidas}
      />

      <TextInput
        style={styles.input}
        placeholder="Quantas horas ficou ouvindo música?"
        keyboardType="numeric"
        value={horasOuvindo}
        onChangeText={setHorasOuvindo}
      />

      <TextInput
        style={styles.input}
        placeholder="Quantas novas músicas/artistas descobriu?"
        keyboardType="numeric"
        value={novosArtistas}
        onChangeText={setNovosArtistas}
      />

      <TouchableOpacity style={styles.botao} onPress={handleSaveClick}>
        <Text style={styles.botaoTexto}>{registroEmEdicao ? 'Atualizar' : 'Adicionar'}</Text>
      </TouchableOpacity>

      {registroEmEdicao && (
        <TouchableOpacity style={styles.botaoCancelar} onPress={onCancel}>
          <Text style={styles.botaoTexto}>Cancelar</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: 'white', borderRadius: 8, padding: 15, marginHorizontal: 15, marginBottom: 20, elevation: 3 },
  subtitulo: { fontSize: 20, fontWeight: 'bold', marginBottom: 15, color: '#34495e' },
  input: { borderWidth: 1, borderColor: '#cccccc', borderRadius: 5, padding: 12, fontSize: 16, marginBottom: 10, backgroundColor: '#fff' },
  botao: { backgroundColor: '#6a5acd', padding: 12, borderRadius: 6, alignItems: 'center' },
  botaoTexto: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  botaoCancelar: { backgroundColor: '#7f8c8d', padding: 10, borderRadius: 6, alignItems: 'center', marginTop: 10 },
});
