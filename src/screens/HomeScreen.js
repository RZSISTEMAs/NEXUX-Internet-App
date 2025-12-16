import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, StatusBar, Image, ScrollView } from 'react-native';

const LOGO_URL = 'https://placehold.co/200x100/003366/FFFFFF?text=NEXUX';

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#002147" />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.logoContainer}>
          <Image source={{ uri: LOGO_URL }} style={styles.logo} />
          <Text style={styles.title}>Bem-vindo à NEXUX</Text>
          <Text style={styles.subtitle}>Sua conexão para o futuro.</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quero ser cliente</Text>
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => navigation.navigate('FiberPlans')}>
            <Text style={styles.buttonText}>Contratar Fibra Óptica</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.button, styles.radioButton]} 
            onPress={() => navigation.navigate('RadioPlans')}>
             <Text style={styles.buttonText}>Contratar Internet Rádio</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Já tenho conta</Text>
          <TouchableOpacity 
            style={[styles.button, styles.secondaryButton]} 
            onPress={() => navigation.navigate('ClientLogin')}>
            <Text style={styles.secondaryButtonText}>Já sou cliente</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.button, styles.secondaryButton]} 
            onPress={() => navigation.navigate('EmployeeLogin')}>
             <Text style={styles.secondaryButtonText}>Sou funcionário</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
           <Text style={styles.sectionTitle}>Ajuda e Informações</Text>
           <TouchableOpacity 
             style={[styles.button, { backgroundColor: '#6C757D' }]} 
             onPress={() => navigation.navigate('AboutApp')}>
             <Text style={styles.buttonText}>Como funciona o App</Text>
           </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#002147' },
    container: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 20, paddingHorizontal: 20 },
    logoContainer: { alignItems: 'center', marginBottom: 40 },
    logo: { width: 180, height: 90, resizeMode: 'contain', marginBottom: 20 },
    title: { fontSize: 28, fontWeight: 'bold', color: '#FFFFFF', textAlign: 'center' },
    subtitle: { fontSize: 16, color: '#A0BACC', marginTop: 8, textAlign: 'center', paddingHorizontal: 20 },
    section: { width: '100%', marginBottom: 30, alignItems: 'center' },
    sectionTitle: { fontSize: 20, fontWeight: '600', color: '#FFFFFF', marginBottom: 15, borderBottomColor: '#007BFF', borderBottomWidth: 1, paddingBottom: 5 },
    button: { backgroundColor: '#007BFF', paddingVertical: 15, borderRadius: 50, width: '95%', alignItems: 'center', marginBottom: 15, elevation: 5 },
    radioButton: { backgroundColor: '#17A2B8' },
    buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
    secondaryButton: { backgroundColor: 'transparent', borderColor: '#A0BACC', borderWidth: 1.5 },
    secondaryButtonText: { color: '#A0BACC', fontSize: 16, fontWeight: 'bold' },
});