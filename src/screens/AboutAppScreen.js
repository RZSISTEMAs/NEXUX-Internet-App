import React from 'react';
import { StyleSheet, Text, View, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AboutAppScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#002147" />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Sobre a NEXUX</Text>
        
        <View style={styles.card}>
          <Text style={styles.cardTitle}>📱 Funcionalidades do App</Text>
          <Text style={styles.text}>
            Este aplicativo foi desenvolvido para facilitar a gestão da sua conexão de INTERNET.
            Aqui você pode:
          </Text>
          <Text style={styles.bulletPoint}>• Consultar e contratar planos de Fibra e Rádio.</Text>
          <Text style={styles.bulletPoint}>• Acessar sua área de cliente com login seguro.</Text>
          <Text style={styles.bulletPoint}>• Se for funcionário, acessar ferramentas de gestão.</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>🌐 Versão Web</Text>
          <Text style={styles.text}>
            Agora você também pode acessar este sistema diretamente pelo seu navegador!
            Basta acessar o endereço do sistema para ter a mesma experiência do aplicativo.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>🚀 Nossos Planos</Text>
          <Text style={styles.text}>
            Oferecemos velocidades incríveis com tecnologia de ponta.
            Fibra Óptica para estabilidade máxima e Rádio para áreas remotas.
          </Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Versão 1.0.0</Text>
          <Text style={styles.footerText}>© 2024 NEXUX Internet</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F0F4F8' },
  container: { padding: 20 },
  title: { fontSize: 26, fontWeight: 'bold', color: '#002147', marginBottom: 20, textAlign: 'center' },
  card: { backgroundColor: '#FFF', borderRadius: 10, padding: 15, marginBottom: 15, elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#007BFF', marginBottom: 10 },
  text: { fontSize: 15, color: '#333', lineHeight: 22 },
  bulletPoint: { fontSize: 15, color: '#333', lineHeight: 22, marginLeft: 10, marginTop: 5 },
  footer: { marginTop: 20, alignItems: 'center' },
  footerText: { fontSize: 12, color: '#888' },
});
