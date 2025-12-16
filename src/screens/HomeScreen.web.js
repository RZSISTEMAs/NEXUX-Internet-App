import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, useWindowDimensions, Platform } from 'react-native';

const LOGO_URL = 'https://placehold.co/200x100/003366/FFFFFF?text=NEXUX';

const COLORS = {
  primary: '#002147',
  accent: '#007BFF',
  secondary: '#17A2B8',
  white: '#FFFFFF',
  text: '#333333',
};

export default function HomeScreen({ navigation }) {
  const { width } = useWindowDimensions();
  const isDesktop = width > 1024;
  const isMobile = width <= 768;

  // Layout Constraints
  const MAX_CONTENT_WIDTH = 1200;
  const contentWidth = Math.min(width, MAX_CONTENT_WIDTH);
  const paddingX = isMobile ? 20 : 40;

  return (
    <View style={styles.mainContainer}>
      {/* Navbar - Centered Content */}
      <View style={styles.navbarBackground}>
        <View style={[styles.navbarContent, { maxWidth: MAX_CONTENT_WIDTH, paddingHorizontal: paddingX }]}>
             <Image source={{ uri: LOGO_URL }} style={styles.navLogo} resizeMode="contain" />
             <View style={styles.navLinks}>
                {!isMobile && (
                    <>
                    <TouchableOpacity onPress={() => navigation.navigate('AboutApp')} style={styles.navLinkItem}>
                        <Text style={styles.navLinkText}>Sobre</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('FiberPlans')} style={styles.navLinkItem}>
                        <Text style={styles.navLinkText}>Planos</Text>
                    </TouchableOpacity>
                    </>
                )}
                <TouchableOpacity onPress={() => navigation.navigate('ClientLogin')} style={styles.navButtonOutline}>
                    <Text style={styles.navButtonOutlineText}>Área do Cliente</Text>
                </TouchableOpacity>
             </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Hero Section */}
        <View style={[styles.heroSection, { minHeight: isMobile ? 400 : 600 }]}>
            {/* Center Content in Container */}
           <View style={[styles.heroContainer, { maxWidth: MAX_CONTENT_WIDTH, paddingHorizontal: paddingX }]}>
                <View style={styles.heroTextContent}>
                    <Text style={[styles.heroTitle, { fontSize: isMobile ? 36 : 58 }]}>
                    CONEXÃO QUE <Text style={{color: '#4FC3F7'}}>TRANSFORMA</Text>
                    </Text>
                    <Text style={[styles.heroSubtitle, { fontSize: isMobile ? 16 : 20 }]}>
                    Fibra Óptica de ultravelocidade e Internet Rádio com estabilidade garantida. 
                    </Text>
                    <View style={[styles.heroButtons, { flexDirection: isMobile ? 'column' : 'row' }]}>
                        <TouchableOpacity 
                            style={styles.heroButtonPrimary}
                            onPress={() => navigation.navigate('FiberPlans')}>
                            <Text style={styles.heroButtonText}>Ver Planos Fibra</Text>
                        </TouchableOpacity>
                        {!isMobile && (
                            <TouchableOpacity 
                                style={[styles.heroButtonPrimary, styles.heroButtonSecondary]}
                                onPress={() => navigation.navigate('RadioPlans')}>
                                <Text style={[styles.heroButtonText, { color: '#FFF' }]}>Ver Internet Rádio</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
           </View>
           <View style={[styles.decorativeCircle, { width: width * 0.4, height: width * 0.4, borderRadius: width * 0.2, right: -width * 0.05 }]} />
        </View>

        {/* Features / Plans Section - White Background */}
        <View style={styles.sectionBackground}>
           <View style={[styles.sectionContainer, { maxWidth: MAX_CONTENT_WIDTH, paddingHorizontal: paddingX }]}>
                <Text style={[styles.sectionHeader, { fontSize: isMobile ? 26 : 32 }]}>
                    Escolha sua Tecnologia
                </Text>
                
                <View style={styles.cardsWrapper}>
                    {/* Use FlexGap if supported, or margins */}
                    <Card 
                        title="Fibra Óptica" 
                        icon="⚡" 
                        color="#E1F5FE"
                        desc="Ideal para jogos, streaming 4K e downloads pesados."
                        btnText="Conhecer Fibra"
                        onPress={() => navigation.navigate('FiberPlans')}
                        width={isMobile ? '100%' : '30%'}
                    />
                    <Card 
                        title="Internet Rádio" 
                        icon="📡" 
                        color="#E0F2F1"
                        desc="Conexão estável para zonas rurais e remotas."
                        btnText="Conhecer Rádio"
                        onPress={() => navigation.navigate('RadioPlans')}
                        width={isMobile ? '100%' : '30%'}
                    />
                     <Card 
                        title="Suporte Premium" 
                        icon="🎧" 
                        color="#F3E5F5"
                        desc="Equipe dedicada para garantir que você esteja sempre conectado."
                        btnText="Fale Conosco"
                        onPress={() => navigation.navigate('AboutApp')}
                        width={isMobile ? '100%' : '30%'}
                    />
                </View>
           </View>
        </View>

        {/* Info Section - Light Gray */}
        <View style={[styles.infoSectionBackground, { paddingHorizontal: paddingX }]}>
             <View style={[styles.infoWrapper, { 
                 maxWidth: MAX_CONTENT_WIDTH, 
                 flexDirection: isDesktop ? 'row' : 'column-reverse' 
             }]}>
                 <View style={[styles.infoContent, { alignItems: isDesktop ? 'flex-start' : 'center' }]}>
                     <Text style={[styles.infoHeader, { textAlign: isDesktop ? 'left' : 'center' }]}>
                         Controle Total na Palma da Mão
                     </Text>
                     <Text style={[styles.infoText, { textAlign: isDesktop ? 'left' : 'center' }]}>
                        Acesse faturas, desbloqueio de confiança e consumo de dados pelo nosso App ou Área do Cliente.
                     </Text>
                     <TouchableOpacity onPress={() => navigation.navigate('ClientLogin')} style={styles.infoButton}>
                         <Text style={styles.infoButtonText}>Acessar Minha Conta</Text>
                     </TouchableOpacity>
                 </View>
                 {/* Visual Placeholder */}
                 <View style={styles.infoVisual}>
                     <Text style={{fontSize: 50}}>📱</Text>
                 </View>
             </View>
        </View>

        {/* Footer */}
        <View style={styles.footerBackground}>
             <View style={[styles.footerContent, { maxWidth: MAX_CONTENT_WIDTH, paddingHorizontal: paddingX, flexDirection: isMobile ? 'column' : 'row' }]}>
                <View style={{marginBottom: isMobile ? 20 : 0}}>
                    <Text style={styles.footerBrand}>NEXUX</Text>
                    <Text style={styles.footerText}>© 2024 NEXUX Internet.</Text>
                </View>
                <View style={styles.footerLinks}>
                    <TouchableOpacity onPress={() => navigation.navigate('Terms')}><Text style={styles.footerLink}>Termos</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('EmployeeLogin')}><Text style={styles.footerLink}>Colaborador</Text></TouchableOpacity>
                </View>
             </View>
        </View>
      </ScrollView>
    </View>
  );
}

// Helper Component for consistency
const Card = ({ title, icon, color, desc, btnText, onPress, width }) => (
    <View style={[styles.card, { width: width, marginBottom: 20 }]}>
        <View style={[styles.iconCircle, { backgroundColor: color }]}>
            <Text style={{fontSize: 28}}>{icon}</Text>
        </View>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardDesc}>{desc}</Text>
        <TouchableOpacity style={styles.cardBtn} onPress={onPress}>
            <Text style={styles.cardBtnText}>{btnText}</Text>
        </TouchableOpacity>
    </View>
);

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: '#FFFFFF' },
  
  // Navbar
  navbarBackground: {
      width: '100%',
      backgroundColor: COLORS.primary,
      height: 80,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 100,
      boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
  },
  navbarContent: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
  },
  navLogo: { width: 120, height: 40 },
  navLinks: { flexDirection: 'row', alignItems: 'center', gap: 20 },
  navLinkItem: { padding: 5 },
  navLinkText: { color: '#FFF', fontWeight: '500' },
  navButtonOutline: { 
      borderWidth: 1, borderColor: '#4FC3F7', 
      paddingVertical: 8, paddingHorizontal: 20, borderRadius: 50,
      backgroundColor: 'rgba(79, 195, 247, 0.1)'
  },
  navButtonOutlineText: { color: '#4FC3F7', fontWeight: 'bold' },

  // Hero
  heroSection: {
      backgroundColor: '#00152e',
      position: 'relative',
      overflow: 'hidden',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
  },
  heroContainer: { width: '100%', alignItems: 'center', zIndex: 2 },
  heroTextContent: { alignItems: 'center', maxWidth: 800 },
  heroTitle: {
      fontWeight: '900', color: '#FFFFFF', textAlign: 'center', 
      marginBottom: 20, lineHeight: 1.1 
  },
  heroSubtitle: {
      color: '#B0BEC5', textAlign: 'center', marginBottom: 40, lineHeight: 1.5 
  },
  heroButtons: { gap: 15 },
  heroButtonPrimary: {
      backgroundColor: '#007BFF', paddingHorizontal: 35, paddingVertical: 15,
      borderRadius: 50, alignItems: 'center', minWidth: 180,
      boxShadow: '0px 4px 15px rgba(0, 123, 255, 0.4)'
  },
  heroButtonSecondary: { backgroundColor: 'transparent', borderWidth: 1, borderColor: '#FFF', boxShadow: 'none' },
  heroButtonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  decorativeCircle: { position: 'absolute', top: -50, backgroundColor: 'rgba(79, 195, 247, 0.05)' },

  // Sections
  sectionBackground: { backgroundColor: '#F8F9FA', width: '100%', alignItems: 'center', paddingVertical: 60 },
  sectionContainer: { width: '100%' },
  sectionHeader: { fontWeight: 'bold', color: COLORS.primary, marginBottom: 40, textAlign: 'center' },
  cardsWrapper: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 30 },
  
  // Card
  card: {
      backgroundColor: '#FFF', borderRadius: 20, padding: 30, alignItems: 'center',
      boxShadow: '0px 8px 20px rgba(0,0,0,0.05)',
  },
  iconCircle: { width: 70, height: 70, borderRadius: 35, justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  cardTitle: { fontSize: 20, fontWeight: 'bold', color: COLORS.primary, marginBottom: 10 },
  cardDesc: { textAlign: 'center', color: '#666', marginBottom: 20, fontSize: 14, lineHeight: 22 },
  cardBtn: { backgroundColor: COLORS.accent, paddingVertical: 10, paddingHorizontal: 25, borderRadius: 10 },
  cardBtnText: { color: '#FFF', fontWeight: 'bold' },

  // Info
  infoSectionBackground: { backgroundColor: '#FFF', width: '100%', alignItems: 'center', paddingVertical: 80 },
  infoWrapper: { width: '100%', alignItems: 'center', justifyContent: 'space-between', gap: 50 },
  infoContent: { flex: 1, maxWidth: 600 },
  infoHeader: { fontSize: 32, fontWeight: 'bold', color: COLORS.primary, marginBottom: 20 },
  infoText: { fontSize: 18, color: '#555', lineHeight: 28 },
  infoButton: { marginTop: 25, backgroundColor: COLORS.primary, paddingVertical: 12, paddingHorizontal: 30, borderRadius: 50 },
  infoButtonText: { color: '#FFF', fontWeight: 'bold' },
  infoVisual: { width: 300, height: 300, backgroundColor: '#E3F2FD', borderRadius: 20, justifyContent: 'center', alignItems: 'center' },

  // Footer
  footerBackground: { backgroundColor: '#00152e', width: '100%', alignItems: 'center', paddingVertical: 40 },
  footerContent: { width: '100%', justifyContent: 'space-between', alignItems: 'center' },
  footerBrand: { color: '#FFF', fontSize: 22, fontWeight: 'bold', marginBottom: 5 },
  footerText: { color: '#718096', fontSize: 14 },
  footerLinks: { flexDirection: 'row', gap: 20 },
  footerLink: { color: '#A0AEC0', fontSize: 14 },
});
