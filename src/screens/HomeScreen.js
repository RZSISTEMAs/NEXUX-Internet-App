import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, Image, ScrollView, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Enhanced design constants
const LOGO_URL = 'https://placehold.co/200x100/FFFFFF/000000?text=NEXUX';

export default function HomeScreen({ navigation }) {
  const { width } = useWindowDimensions();
  // Dynamic calculation for responsiveness
  const isSmallScreen = width < 380;
  const cardWidth = (width - 60) / 2; // 60 = paddingHorizontal (20*2) + gap (20)

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#002147" />
      
      {/* Curved Header Background */}
      <View style={styles.headerContainer}>
        <SafeAreaView edges={['top', 'left', 'right']}>
             <View style={styles.headerContent}>
              <View style={styles.headerTopRow}>
                <Image source={{ uri: LOGO_URL }} style={styles.logo} />
                <TouchableOpacity style={styles.notificationBtn}>
                    <Text style={styles.notificationIcon}>🔔</Text>
                </TouchableOpacity>
              </View>
              
              <Text style={styles.greetingText}>Olá, Bem-vindo!</Text>
              <Text style={styles.subGreetingText}>Gerencie sua conexão com estilo.</Text>
            </View>
        </SafeAreaView>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          {/* Main Services - Overlapping the Header */}
          <View style={styles.cardsContainer}>
             
             {/* Fiber Option */}
             <TouchableOpacity 
                style={[styles.mainCard, styles.cardShadow, { width: cardWidth }]}
                onPress={() => navigation.navigate('FiberPlans')}>
                <View style={[styles.iconCircle, { backgroundColor: '#E1F5FE' }]}>
                   <Text style={{fontSize: isSmallScreen ? 24 : 32}}>⚡</Text>
                </View>
                <Text style={styles.cardMainTitle}>Fibra Óptica</Text>
                <Text style={styles.cardSubTitle}>Velocidade Máxima</Text>
             </TouchableOpacity>

             {/* Radio Option */}
             <TouchableOpacity 
                style={[styles.mainCard, styles.cardShadow, { width: cardWidth }]} 
                onPress={() => navigation.navigate('RadioPlans')}>
                 <View style={[styles.iconCircle, { backgroundColor: '#E0F2F1' }]}>
                   <Text style={{fontSize: isSmallScreen ? 24 : 32}}>📡</Text>
                </View>
                <Text style={styles.cardMainTitle}>Via Rádio</Text>
                <Text style={styles.cardSubTitle}>Estabilidade Rural</Text>
             </TouchableOpacity>
          </View>

          {/* Quick Actions Grid */}
          <Text style={styles.sectionHeader}>Acesso Rápido</Text>
          <View style={styles.gridContainer}>
             
             {/* Client Area */}
             <TouchableOpacity 
               style={[styles.gridItem, styles.cardShadow, { width: cardWidth }]}
               onPress={() => navigation.navigate('ClientLogin')}>
                <Text style={styles.gridIcon}>👤</Text>
                <Text style={[styles.gridLabel, { fontSize: isSmallScreen ? 12 : 14 }]}>Área do Cliente</Text>
             </TouchableOpacity>

             {/* Employee Area */}
             <TouchableOpacity 
               style={[styles.gridItem, styles.cardShadow, { width: cardWidth }]}
               onPress={() => navigation.navigate('EmployeeLogin')}>
                <Text style={styles.gridIcon}>💼</Text>
                <Text style={[styles.gridLabel, { fontSize: isSmallScreen ? 12 : 14 }]}>Colaborador</Text>
             </TouchableOpacity>

             {/* Registration */}
             <TouchableOpacity 
               style={[styles.gridItem, styles.cardShadow, { width: cardWidth }]}
               onPress={() => navigation.navigate('Registration')}>
                <Text style={styles.gridIcon}>📝</Text>
                <Text style={[styles.gridLabel, { fontSize: isSmallScreen ? 12 : 14 }]}>Cadastre-se</Text>
             </TouchableOpacity>

             {/* Support/About */}
             <TouchableOpacity 
               style={[styles.gridItem, styles.cardShadow, { width: cardWidth }]}
               onPress={() => navigation.navigate('AboutApp')}>
                <Text style={styles.gridIcon}>ℹ️</Text>
                <Text style={[styles.gridLabel, { fontSize: isSmallScreen ? 12 : 14 }]}>Sobre o App</Text>
             </TouchableOpacity>
          </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
    mainContainer: { flex: 1, backgroundColor: '#FAFBFF' },
    
    // Header Styles
    headerContainer: {
        backgroundColor: '#002147',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        paddingHorizontal: 25,
        paddingBottom: 130, // Much more space for text
        paddingTop: 10,
    },
    headerContent: { zIndex: 1 },
    headerTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
    logo: { width: 100, height: 40, resizeMode: 'contain', tintColor: '#fff' },
    notificationBtn: { backgroundColor: 'rgba(255,255,255,0.15)', padding: 8, borderRadius: 12 },
    notificationIcon: { fontSize: 16 },
    greetingText: { color: '#FFF', fontSize: 24, fontWeight: 'bold' },
    subGreetingText: { color: '#B0C4DE', fontSize: 14, marginTop: 5 },

    scrollContent: { paddingHorizontal: 20, paddingBottom: 40 },

    // Overlapping Cards
    cardsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: -60, // Adjusted to sit lower relative to the deeper header
        marginBottom: 25,
    },
    mainCard: {
        backgroundColor: '#FFFFFF',
        height: 160,
        borderRadius: 20,
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardShadow: {
        elevation: 8,
        shadowColor: '#0047AB',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    iconCircle: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    cardMainTitle: { fontSize: 16, fontWeight: 'bold', color: '#002147', marginBottom: 2 },
    cardSubTitle: { fontSize: 11, color: '#8898AA' },

    // Grid Actions
    sectionHeader: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 15, marginLeft: 5 },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 15,
    },
    gridItem: {
        backgroundColor: '#FFF',
        borderRadius: 16,
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        height: 70, // Fixed height for uniformity
    },
    gridIcon: { fontSize: 20 },
    gridLabel: { fontWeight: '600', color: '#444' },
});