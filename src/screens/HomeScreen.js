import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, StatusBar, Image, ScrollView, Dimensions } from 'react-native';

// Mockup styling constants
const { width } = Dimensions.get('window');
const CARD_GAP = 15;
// Calculate card width for 2 columns with gap
const CARD_WIDTH = (width - 40 - CARD_GAP) / 2; 

const LOGO_URL = 'https://placehold.co/200x100/FFFFFF/000000?text=NEXUX'; // White logo for dark bg

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#002147" />
      
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
           <Image source={{ uri: LOGO_URL }} style={styles.logo} />
           <TouchableOpacity onPress={() => navigation.navigate('AboutApp')} style={styles.profileButton}>
              <Text style={styles.profileIcon}>?</Text>
           </TouchableOpacity>
        </View>
        <Text style={styles.welcomeText}>Bem-vindo,</Text>
        <Text style={styles.subWelcomeText}>Conecte-se ao futuro hoje.</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          {/* Main Plans Section (Grid) */}
          <Text style={styles.sectionTitle}>Nossos Planos</Text>
          <View style={styles.plansGrid}>
            
            {/* Fiber Card */}
            <TouchableOpacity 
              style={[styles.planCard, { backgroundColor: '#007BFF' }]}
              onPress={() => navigation.navigate('FiberPlans')}>
              <Text style={styles.planTitle}>FIBRA</Text>
              <Text style={styles.planSubtitle}>PLANS</Text>
              <View style={styles.iconPlaceholder}>
                 <Text style={{fontSize: 30}}>⚡</Text>
              </View>
              <View style={styles.cardBtn}>
                 <Text style={styles.cardBtnText}>VER AGORA</Text>
              </View>
            </TouchableOpacity>

            {/* Radio Card */}
            <TouchableOpacity 
              style={[styles.planCard, { backgroundColor: '#17A2B8' }]}
              onPress={() => navigation.navigate('RadioPlans')}>
              <Text style={styles.planTitle}>RÁDIO</Text>
              <Text style={styles.planSubtitle}>PLANS</Text>
               <View style={styles.iconPlaceholder}>
                 <Text style={{fontSize: 30}}>📡</Text>
              </View>
              <View style={styles.cardBtn}>
                 <Text style={styles.cardBtnText}>EXPLORAR</Text>
              </View>
            </TouchableOpacity>

          </View>

          {/* Quick Access Section */}
          <Text style={styles.sectionTitle}>Acesso Rápido</Text>
          <View style={styles.accessContainer}>
              <TouchableOpacity 
                style={styles.accessFullButton}
                onPress={() => navigation.navigate('ClientLogin')}>
                <Text style={styles.accessIcon}>🔒</Text>
                <Text style={styles.accessText}>Área do Cliente</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.accessFullButton}
                onPress={() => navigation.navigate('EmployeeLogin')}>
                <Text style={styles.accessIcon}>💼</Text>
                <Text style={styles.accessText}>Acesso Funcionário</Text>
              </TouchableOpacity>
          </View>

          {/* Bottom Nav / Info */}
          <View style={styles.bottomNav}>
             <TouchableOpacity style={styles.navItem} onPress={() => {}}>
                <Text style={styles.navIcon}>🏠</Text>
                <Text style={styles.navLabel}>Home</Text>
             </TouchableOpacity>
             <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('AboutApp')}>
                <Text style={styles.navIcon}>⚙️</Text>
                <Text style={styles.navLabel}>Suporte</Text>
             </TouchableOpacity>
          </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#F4F7FA' },
    header: {
        backgroundColor: '#002147',
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 40,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3, 
        shadowRadius: 5,
    },
    headerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    logo: { width: 100, height: 40, resizeMode: 'contain', tintColor: '#FFF' },
    profileButton: {
        width: 35, height: 35, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center', alignItems: 'center'
    },
    profileIcon: { color: '#FFF', fontWeight: 'bold' },
    welcomeText: { color: '#FFF', fontSize: 22, fontWeight: 'bold' },
    subWelcomeText: { color: '#A0BACC', fontSize: 14, marginTop: 5 },
    
    scrollContent: { padding: 20, paddingBottom: 50 },
    
    sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#555', marginBottom: 15, textTransform: 'uppercase', letterSpacing: 0.5 },
    
    plansGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30,
    },
    planCard: {
        width: CARD_WIDTH,
        height: CARD_WIDTH * 1.4, // Portrait aspect ratio
        borderRadius: 20,
        padding: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    planTitle: { color: '#FFF', fontSize: 20, fontWeight: '900', letterSpacing: 1 },
    planSubtitle: { color: 'rgba(255,255,255,0.7)', fontSize: 12, fontWeight: 'bold', marginTop: -5 },
    iconPlaceholder: { marginVertical: 10 },
    cardBtn: {
        backgroundColor: 'rgba(0,0,0,0.2)',
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 20,
        width: '100%',
        alignItems: 'center',
    },
    cardBtnText: { color: '#FFF', fontSize: 10, fontWeight: 'bold' },

    accessContainer: { gap: 15, marginBottom: 30 },
    accessFullButton: {
        backgroundColor: '#FFF',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderRadius: 15,
        elevation: 2,
        shadowColor: '#000', 
        shadowOpacity: 0.05, 
        shadowOffset: {width: 0, height: 2},
        borderWidth: 1, borderColor: '#E0E0E0'
    },
    accessIcon: { fontSize: 20, marginRight: 15 },
    accessText: { fontSize: 16, fontWeight: '600', color: '#333' },

    bottomNav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#FFF',
        paddingVertical: 15,
        borderRadius: 30,
        elevation: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    navItem: { alignItems: 'center' },
    navIcon: { fontSize: 20, marginBottom: 2 },
    navLabel: { fontSize: 10, color: '#555', fontWeight: '600' }
});