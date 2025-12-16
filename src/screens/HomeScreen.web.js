import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, useWindowDimensions, Platform } from 'react-native';

const LOGO_URL = 'https://placehold.co/200x100/003366/FFFFFF?text=NEXUX';

// Standard React Native for Web supports standard CSS properties in the style object for some things,
// or we can use View style with platform specific code. 
// Basic palette
const COLORS = {
  primary: '#002147',
  accent: '#007BFF',
  secondary: '#17A2B8',
  white: '#FFFFFF',
  gray: '#F8F9FA',
  text: '#333333',
  lightText: '#A0BACC'
};

export default function HomeScreen({ navigation }) {
  const { width } = useWindowDimensions();
  const isDesktop = width > 768;

  return (
    <View style={styles.mainContainer}>
      {/* Navbar Fixed at Top */}
      <View style={styles.navbar}>
        <Image source={{ uri: LOGO_URL }} style={styles.navLogo} />
        <View style={styles.navLinks}>
           {isDesktop && (
            <>
             <TouchableOpacity onPress={() => navigation.navigate('AboutApp')} style={styles.navLinkItem}>
                <Text style={styles.navLinkText}>Sobre</Text>
             </TouchableOpacity>
            </>
           )}
           <TouchableOpacity onPress={() => navigation.navigate('ClientLogin')} style={styles.navButtonOutline}>
             <Text style={styles.navButtonOutlineText}>Área do Cliente</Text>
           </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Hero Section */}
        <View style={[styles.heroSection, { minHeight: isDesktop ? 500 : 400 }]}>
          <View style={styles.heroOverlay}>
             <Text style={[styles.heroTitle, { fontSize: isDesktop ? 60 : 36 }]}>
               CONEXÃO QUE <Text style={{color: '#4FC3F7'}}>TRANSFORMA</Text>
             </Text>
             <Text style={[styles.heroSubtitle, { fontSize: isDesktop ? 22 : 16 }]}>
               Fibra Óptica de ultravelocidade e Internet Rádio com estabilidade garantida. 
               O futuro chegou na sua casa.
             </Text>
             <View style={styles.heroButtons}>
                <TouchableOpacity 
                   style={styles.heroButtonPrimary}
                   onPress={() => navigation.navigate('FiberPlans')}>
                   <Text style={styles.heroButtonText}>Ver Planos Fibra</Text>
                </TouchableOpacity>
             </View>
          </View>
          {/* Decorative Circle Background (CSS hack via style prop if supported or just Views) */}
          <View style={styles.decorativeCircle} />
        </View>

        {/* Features / Plans Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionHeader}>Escolha sua Tecnologia</Text>
          <View style={[styles.cardsWrapper, { flexDirection: isDesktop ? 'row' : 'column' }]}>
            
            {/* Fiber Card */}
            <View style={[styles.card, isDesktop ? styles.cardDesktop : styles.cardMobile]}>
              <Text style={styles.cardIcon}>⚡</Text>
              <Text style={styles.cardTitle}>Fibra Óptica</Text>
              <Text style={styles.cardDescription}>
                Ideal para jogos, streaming 4K e downloads pesados. Velocidade da luz na sua casa.
              </Text>
              <TouchableOpacity 
                style={styles.cardButton}
                onPress={() => navigation.navigate('FiberPlans')}>
                <Text style={styles.cardButtonText}>Conhecer Fibra</Text>
              </TouchableOpacity>
            </View>

            {/* Radio Card */}
            <View style={[styles.card, isDesktop ? styles.cardDesktop : styles.cardMobile]}>
               <Text style={styles.cardIcon}>📡</Text>
              <Text style={styles.cardTitle}>Internet Rádio</Text>
              <Text style={styles.cardDescription}>
                Alcance onde ninguém mais chega. Conexão estável para zonas rurais e remotas.
              </Text>
              <TouchableOpacity 
                style={[styles.cardButton, { backgroundColor: COLORS.secondary }]}
                onPress={() => navigation.navigate('RadioPlans')}>
                <Text style={styles.cardButtonText}>Conhecer Rádio</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>

        {/* Functionality / About Brief */}
        <View style={styles.infoSection}>
           <View style={[styles.infoWrapper, { flexDirection: isDesktop ? 'row' : 'column-reverse' }]}>
              <View style={styles.infoContent}>
                 <Text style={styles.infoHeader}>Tudo na palma da mão</Text>
                 <Text style={styles.infoText}>
                   Com nosso novo aplicativo e portal web, você tem controle total.
                   Emita boletos, verifique o consumo, abra chamados e muito mais.
                 </Text>
                 <TouchableOpacity onPress={() => navigation.navigate('AboutApp')} style={{marginTop: 20}}>
                    <Text style={{color: COLORS.accent, fontWeight: 'bold', fontSize: 16}}>Saiba como funciona →</Text>
                 </TouchableOpacity>
              </View>
              <View style={styles.infoImagePlaceholder}>
                 {/* Placeholder for an app screenshot */}
                 <Text style={{color: '#AAA'}}>📱 App Preview</Text>
              </View>
           </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2024 NEXUX Internet. Todos os direitos reservados.</Text>
          <View style={styles.footerLinks}>
             <TouchableOpacity onPress={() => navigation.navigate('Terms')}>
               <Text style={styles.footerLink}>Termos de Uso</Text>
             </TouchableOpacity>
             <TouchableOpacity onPress={() => navigation.navigate('EmployeeLogin')}>
               <Text style={styles.footerLink}>Área do Colaborador</Text>
             </TouchableOpacity>
          </View>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 40,
    height: 80,
    backgroundColor: COLORS.primary,
    // Shadow for depth
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 10,
  },
  navLogo: {
    width: 120,
    height: 50,
    resizeMode: 'contain',
  },
  navLinks: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navLinkItem: {
    marginRight: 30,
  },
  navLinkText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '500',
  },
  navButtonOutline: {
    borderWidth: 1,
    borderColor: '#4FC3F7',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
    transition: '0.3s', // Web specific transition property works in some RNWeb versions or ignored
  },
  navButtonOutlineText: {
    color: '#4FC3F7',
    fontWeight: 'bold',
  },
  scrollContent: {
    flexGrow: 1,
  },
  heroSection: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#00152e', // Fallback
    overflow: 'hidden',
    position: 'relative',
    // We can simulate gradient with background styles on web if we wanted, 
    // but a solid dark blue #00152e is classy too.
  },
  decorativeCircle: {
    position: 'absolute',
    top: -100,
    right: -100,
    width: 400,
    height: 400,
    borderRadius: 200,
    backgroundColor: 'rgba(79, 195, 247, 0.1)',
  },
  heroOverlay: {
    zIndex: 2,
    alignItems: 'center',
    maxWidth: 900,
  },
  heroTitle: {
    fontWeight: '900',
    color: '#FFFFFF',
    textAlign: 'center',
    letterSpacing: 1,
    lineHeight: 65, // Adjust based on font size dynamically?
  },
  heroSubtitle: {
    color: '#B0BEC5',
    textAlign: 'center',
    marginTop: 20,
    maxWidth: 600,
    lineHeight: 28,
  },
  heroButtons: {
    marginTop: 40,
  },
  heroButtonPrimary: {
    backgroundColor: '#007BFF',
    paddingHorizontal: 40,
    paddingVertical: 18,
    borderRadius: 50,
    shadowColor: "#007BFF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 10,
  },
  heroButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  sectionContainer: {
    paddingVertical: 80,
    paddingHorizontal: 20,
    backgroundColor: '#F7F9FC',
    alignItems: 'center',
  },
  sectionHeader: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 50,
  },
  cardsWrapper: {
    width: '100%',
    maxWidth: 1000,
    justifyContent: 'center',
    gap: 30, // Works in RN 0.71+
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 40,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
    marginBottom: 20,
  },
  cardDesktop: {
    flex: 1,
    marginBottom: 0,
  },
  cardMobile: {
    width: '100%',
  },
  cardIcon: {
    fontSize: 50,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 15,
  },
  cardDescription: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 30,
    lineHeight: 24,
  },
  cardButton: {
    backgroundColor: COLORS.accent,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  cardButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  infoSection: {
    paddingVertical: 80,
    paddingHorizontal: 20,
    backgroundColor: '#FFF',
    alignItems: 'center',
  },
  infoWrapper: {
    maxWidth: 1000,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 50,
  },
  infoContent: {
    flex: 1,
  },
  infoHeader: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 20,
  },
  infoText: {
    fontSize: 18,
    color: '#555',
    lineHeight: 28,
  },
  infoImagePlaceholder: {
    width: 300,
    height: 300,
    backgroundColor: '#EEF2F6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    backgroundColor: '#1A202C',
    paddingVertical: 30,
    paddingHorizontal: 40,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerText: {
    color: '#718096',
    fontSize: 14,
  },
  footerLinks: {
    flexDirection: 'row',
    gap: 20,
  },
  footerLink: {
    color: '#A0AEC0',
    fontSize: 14,
  },
});
