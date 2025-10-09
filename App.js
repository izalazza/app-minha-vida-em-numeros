import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  Platform,
  TouchableOpacity,
  Alert,
  Button,
} from 'react-native';

import * as Database from './services/Database';
import Formulario from './components/Formulario';
import ListaRegistros from './components/ListaRegistros';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import Grafico from './components/Grafico';

// --- CORREÇÃO: Definir o caminho do arquivo aqui ---
// Desta forma, o App.js sabe exatamente qual arquivo manipular na função de exportar.
const fileUri = FileSystem.documentDirectory + 'dados.json';

export default function App() {
  const [registros, setRegistros] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [ordenacao, setOrdenacao] = useState('recentes');

  // ... (O resto do código, como useEffect e handleSave, continua o mesmo)
  
  useEffect(() => {
    const init = async () => {
      const dados = await Database.carregarDados();
      setRegistros(dados);
      setCarregando(false);
    };
    init();
  }, []);

  useEffect(() => {
    if (!carregando) {
      Database.salvarDados(registros);
    }
  }, [registros, carregando]);

  const handleSave = (musicas, horas, novos) => {
    if (musicas < 0 || horas < 0 || novos < 0) {
      return Alert.alert("Erro", "Valores não podem ser negativos.");
    }
    if (horas > 24) {
      return Alert.alert("Erro", "Horas não pode ser maior que 24.");
    }
    if (editingId) {
      const registrosAtualizados = registros.map(reg =>
        reg.id === editingId ? { ...reg, musicas, horas, novos } : reg
      );
      setRegistros(registrosAtualizados);
      setEditingId(null);
      return Alert.alert('Sucesso', 'Registro atualizado!');
    }
   const novoRegistro = {
    id: new Date().getTime(), // Usar o tempo é mais seguro para evitar IDs duplicados
    data: new Date().toLocaleDateString('pt-BR'),
    musicas,
    horas,
    novos,
   };
    setRegistros(prev => [...prev, novoRegistro]);
    Alert.alert('Sucesso', 'Registro salvo!');
  };


  const handleEdit = (registro) => {
    setEditingId(registro.id);
  };

  
 // --- Deletar simples e direto ---
const handleDelete = (id) => {
  setRegistros(registros.filter((reg) => reg.id !== id));
  Alert.alert('Concluído', 'O registro foi deletado.');
};

// --- Ordenação correta ---
let registrosExibidos = [...registros];

if (ordenacao === 'mais_musicas') {
  // do maior para o menor número de músicas
  registrosExibidos.sort((a, b) => b.musicas - a.musicas || b.id - a.id);
} else if (ordenacao === 'menos_musicas') {
  // do menor para o maior número de músicas
  registrosExibidos.sort((a, b) => a.musicas - b.musicas || b.id - a.id);
} else if (ordenacao === 'mais_horas') {
  registrosExibidos.sort((a, b) => b.horas - a.horas || b.id - a.id);
} else if (ordenacao === 'menos_horas') {
  registrosExibidos.sort((a, b) => a.horas - b.horas || b.id - a.id);
} else {
  // recentes (id maior primeiro)
  registrosExibidos.sort((a, b) => b.id - a.id);
}

// --- Ordenação para gráfico: sempre cronológica ---
const registrosOrdenadosParaGrafico = [...registros].sort((a, b) => a.id - b.id);


  // --- CORREÇÃO: A função de exportar agora funciona ---
  const exportarDados = async () => {
    // A variável 'fileUri' agora está definida corretamente no escopo deste arquivo.
    if (Platform.OS === 'web') {
      const jsonString = JSON.stringify(registros, null, 2);
      if (registros.length === 0) { return Alert.alert("Aviso", "Nenhum dado para exportar."); }
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a'); a.href = url; a.download = 'dados.json'; a.click();
      URL.revokeObjectURL(url);
    } else {
      if (registros.length === 0) { return Alert.alert("Aviso", "Nenhum dado para exportar."); }
      const jsonString = JSON.stringify(registros, null, 2);
      try {
        await FileSystem.writeAsStringAsync(fileUri, jsonString, { encoding: 'utf8' });
        if (!(await Sharing.isAvailableAsync())) { return Alert.alert("Erro", "Compartilhamento não disponível."); }
        await Sharing.shareAsync(fileUri);
      } catch (e) {
        console.error(e);
        Alert.alert('Erro', 'Falha ao preparar arquivo para exportação.');
      }
    }
  };

  if (carregando) {
    return <View style={styles.loadingContainer}><ActivityIndicator size="large" color="#6a5acd" /></View>;
  }

  return (
    // ... O JSX (a parte visual) continua o mesmo ...
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.titulo}>🎶 Diário Musical</Text>
        <Text style={styles.subtituloApp}>Registre seu dia musical</Text>

        <Formulario 
          onSave={handleSave} 
          onCancel={() => setEditingId(null)}
          registroEmEdicao={registros.find(r => r.id === editingId) || null}
        />

        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginBottom: 10, gap: 10 }}>
  <Button title="Menos Recentes" onPress={() => setOrdenacao('recentes')} />
  <Button title="Menos Músicas" onPress={() => setOrdenacao('mais_musicas')} />
  <Button title="Mais Músicas" onPress={() => setOrdenacao('menos_musicas')} />
  <Button title="Menos Horas" onPress={() => setOrdenacao('mais_horas')} />
  <Button title="Mais Horas" onPress={() => setOrdenacao('menos_horas')} />
</View>

  
        <ListaRegistros 
          registros={registrosExibidos}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <Grafico registros={registros} />

        <View style={styles.card}>
            <Text style={styles.subtitulo}>Exportar "Banco de Dados"</Text>
            <TouchableOpacity style={styles.botaoExportar} onPress={exportarDados}>
                <Text style={styles.botaoTexto}>Exportar arquivo dados.json</Text>
            </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

// ... (Os estilos continuam os mesmos)
const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: Platform.OS === 'android' ? 25 : 0, backgroundColor: '#f8f8ff' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  titulo: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginVertical: 20, color: '#6a5acd' },
  subtituloApp: { textAlign: 'center', fontSize: 14, color: '#555', marginTop: -10, marginBottom: 10, fontStyle: 'italic' },
  card: { backgroundColor: 'white', borderRadius: 8, padding: 12, marginHorizontal: 15, marginBottom: 12, elevation: 3 },
  subtitulo: { fontSize: 18, fontWeight: 'bold', marginBottom: 8, color: '#34495e' },
  botaoExportar: { backgroundColor: '#27ae60', padding: 10, borderRadius: 6, alignItems: 'center', marginTop: 6 },
  botaoTexto: { color: 'white', fontSize: 15, fontWeight: 'bold' },
  filtros: { flexDirection: 'row', justifyContent: 'space-between' },
  filtroBtn: { padding: 8, borderRadius: 6, borderWidth: 1, borderColor: '#ddd', minWidth: 100, alignItems: 'center' }
});