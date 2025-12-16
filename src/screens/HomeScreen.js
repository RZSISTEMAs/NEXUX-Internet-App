import { StyleSheet, Text, View, TouchableOpacity, StatusBar, Image, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

// Enhanced design constants
const LOGO_URL = 'https://placehold.co/200x100/FFFFFF/000000?text=NEXUX';

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#001B3A" />
      
      {/* Curved Header Background */}
      <View style={styles.headerContainer}>
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
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          {/* Main Services - Overlapping the Header */}
          <View style={styles.cardsContainer}>
             
             {/* Fiber Option */}
             <TouchableOpacity 
                style={[styles.mainCard, styles.cardShadow]}
                onPress={() => navigation.navigate('FiberPlans')}>
                <View style={[styles.iconCircle, { backgroundColor: '#E1F5FE' }]}>
                   <Text style={{fontSize: 32}}>⚡</Text>
                </View>
                <Text style={styles.cardMainTitle}>Fibra Óptica</Text>
                <Text style={styles.cardSubTitle}>Velocidade Máxima</Text>
             </TouchableOpacity>

             {/* Radio Option */}
             <TouchableOpacity 
                style={[styles.mainCard, styles.cardShadow]} 
                onPress={() => navigation.navigate('RadioPlans')}>
                 <View style={[styles.iconCircle, { backgroundColor: '#E0F2F1' }]}>
                   <Text style={{fontSize: 32}}>📡</Text>
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
               style={[styles.gridItem, styles.cardShadow]}
               onPress={() => navigation.navigate('ClientLogin')}>
                <Text style={styles.gridIcon}>👤</Text>
                <Text style={styles.gridLabel}>Área do Cliente</Text>
             </TouchableOpacity>

             {/* Employee Area */}
             <TouchableOpacity 
               style={[styles.gridItem, styles.cardShadow]}
               onPress={() => navigation.navigate('EmployeeLogin')}>
                <Text style={styles.gridIcon}>💼</Text>
                <Text style={styles.gridLabel}>Colaborador</Text>
             </TouchableOpacity>

             {/* Registration */}
             <TouchableOpacity 
               style={[styles.gridItem, styles.cardShadow]}
               onPress={() => navigation.navigate('Registration')}>
                <Text style={styles.gridIcon}>📝</Text>
                <Text style={styles.gridLabel}>Cadastre-se</Text>
             </TouchableOpacity>

             {/* Support/About */}
             <TouchableOpacity 
               style={[styles.gridItem, styles.cardShadow]}
               onPress={() => navigation.navigate('AboutApp')}>
                <Text style={styles.gridIcon}>ℹ️</Text>
                <Text style={styles.gridLabel}>Sobre o App</Text>
             </TouchableOpacity>
          </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#FAFBFF' },
    
    // Header Styles
    headerContainer: {
        backgroundColor: '#002147',
        height: 220,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        paddingHorizontal: 25,
        paddingTop: 20,
    },
    headerContent: { zIndex: 1 },
    headerTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 25 },
    logo: { width: 110, height: 45, resizeMode: 'contain', tintColor: '#fff' },
    notificationBtn: { backgroundColor: 'rgba(255,255,255,0.15)', padding: 8, borderRadius: 12 },
    notificationIcon: { fontSize: 18 },
    greetingText: { color: '#FFF', fontSize: 26, fontWeight: 'bold' },
    subGreetingText: { color: '#B0C4DE', fontSize: 15, marginTop: 5 },

    scrollContent: { paddingHorizontal: 20, paddingBottom: 40 },

    // Overlapping Cards
    cardsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: -50, // This creates the overlap effect
        marginBottom: 30,
    },
    mainCard: {
        backgroundColor: '#FFFFFF',
        width: (width - 55) / 2, // Calculated width
        height: 180,
        borderRadius: 25,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardShadow: {
        elevation: 10,
        shadowColor: '#0047AB',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
    },
    iconCircle: {
        width: 70,
        height: 70,
        borderRadius: 35,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
    },
    cardMainTitle: { fontSize: 18, fontWeight: 'bold', color: '#002147', marginBottom: 4 },
    cardSubTitle: { fontSize: 12, color: '#8898AA' },

    // Grid Actions
    sectionHeader: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 15, marginLeft: 5 },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 15,
    },
    gridItem: {
        width: (width - 55) / 2,
        backgroundColor: '#FFF',
        borderRadius: 20,
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 15,
    },
    gridIcon: { fontSize: 24 },
    gridLabel: { fontSize: 14, fontWeight: '600', color: '#444' },
});