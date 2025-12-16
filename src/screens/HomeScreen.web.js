import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, useWindowDimensions, Platform } from 'react-native';

const LOGO_URL = 'https://placehold.co/200x100/003366/FFFFFF?text=NEXUX';

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
  const isDesktop = width > 1024;
  const isTablet = width > 768 && width <= 1024;
  const isMobile = width <= 768;

  // Responsive padding
  const containerPadding = isMobile ? 20 : 50;
  
  return (
    <View style={styles.mainContainer}>
      {/* Navbar Fixed at Top */}
      <View style={[styles.navbar, { paddingHorizontal: containerPadding }]}>
        <Image source={{ uri: LOGO_URL }} style={styles.navLogo} resizeMode="contain" />
        
        {/* Simple Mobile Menu Toggle could go here, for now keeping links simple */}
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

      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Hero Section */}
        <View style={[styles.heroSection, { minHeight: isMobile ? 500 : 700 }]}>
          <View style={[styles.heroOverlay, { paddingHorizontal: containerPadding }]}>
             <Text style={[styles.heroTitle, { fontSize: isMobile ? 42 : isDesktop ? 72 : 56 }]}>
               CONEXÃO QUE <Text style={{color: '#4FC3F7'}}>TRANSFORMA</Text>
             </Text>
             <Text style={[styles.heroSubtitle, { fontSize: isMobile ? 18 : 24 }]}>
               Fibra Óptica de ultravelocidade e Internet Rádio com estabilidade garantida. 
               O futuro chegou na sua casa.
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
          {/* Decorative Elements */}
          <View style={[styles.decorativeCircle, { width: width * 0.5, height: width * 0.5, borderRadius: width * 0.25, right: -width * 0.1 }]} />
        </View>

        {/* Features / Plans Section */}
        <View style={[styles.sectionContainer, { paddingHorizontal: containerPadding }]}>
          <Text style={[styles.sectionHeader, { fontSize: isMobile ? 28 : 36 }]}>Escolha sua Tecnologia</Text>
          
          <View style={styles.cardsWrapper}>
            {/* Fiber Card */}
            <View style={[styles.card, { width: isMobile ? '100%' : isTablet ? '45%' : '30%' }]}>
              <View style={[styles.iconContainer, { backgroundColor: '#E3F2FD' }]}>
                  <Text style={styles.cardIcon}>⚡</Text>
              </View>
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
            <View style={[styles.card, { width: isMobile ? '100%' : isTablet ? '45%' : '30%' }]}>
               <View style={[styles.iconContainer, { backgroundColor: '#E0F7FA' }]}>
                  <Text style={styles.cardIcon}>📡</Text>
               </View>
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

             {/* Support Card (New context) */}
             <View style={[styles.card, { width: isMobile ? '100%' : isTablet ? '95%' : '30%' }]}>
               <View style={[styles.iconContainer, { backgroundColor: '#F3E5F5' }]}>
                  <Text style={styles.cardIcon}>🎧</Text>
               </View>
              <Text style={styles.cardTitle}>Suporte Premium</Text>
              <Text style={styles.cardDescription}>
                Equipe dedicada para garantir que você esteja sempre conectado, 24/7.
              </Text>
              <TouchableOpacity 
                style={[styles.cardButton, { backgroundColor: '#6C757D' }]}
                onPress={() => navigation.navigate('AboutApp')}>
                <Text style={styles.cardButtonText}>Fale Conosco</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>

        {/* Info Section split */}
        <View style={[styles.infoSection, { paddingHorizontal: containerPadding }]}>
           <View style={[styles.infoWrapper, { flexDirection: isDesktop ? 'row' : 'column-reverse' }]}>
              <View style={[styles.infoContent, { alignItems: isDesktop ? 'flex-start' : 'center', textAlign: isDesktop ? 'left' : 'center' }]}>
                 <Text style={[styles.infoHeader, { textAlign: isDesktop ? 'left' : 'center' }]}>Controle Total</Text>
                 <Text style={[styles.infoText, { textAlign: isDesktop ? 'left' : 'center' }]}>
                   Gerencie sua assinatura, emita segunda via de boletos, verifique seu consumo de dados e desbloqueie sua conexão com confiança.
                 </Text>
                 <View style={{flexDirection: 'row', marginTop: 20, gap: 10}}>
                    <TouchableOpacity onPress={() => navigation.navigate('ClientLogin')} style={styles.infoButton}>
                        <Text style={styles.infoButtonText}>Acessar Minha Conta</Text>
                    </TouchableOpacity>
                 </View>
              </View>
              <View style={[styles.infoImagePlaceholder, { 
                  width: isMobile ? '100%' : 400, 
                  height: isMobile ? 250 : 350,
                  marginBottom: isDesktop ? 0 : 40 
              }]}>
                 <Text style={{color: '#AAA', fontSize: 20}}>📱 App Dashboard</Text>
              </View>
           </View>
        </View>

        {/* Footer */}
        <View style={[styles.footer, { paddingHorizontal: containerPadding, flexDirection: isMobile ? 'column' : 'row' }]}>
          <View style={{marginBottom: isMobile ? 20 : 0}}>
             <Text style={styles.footerBrand}>NEXUX</Text>
             <Text style={styles.footerText}>© 2024 NEXUX Internet.</Text>
          </View>
          <View style={[styles.footerLinks, { flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'center' : 'center' }]}>
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
    // On web, we want the scrollbar to be natural
  },
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 80,
    backgroundColor: COLORS.primary,
    zIndex: 100,
    boxShadow: '0px 2px 4px rgba(0,0,0,0.2)', // Web standard
  },
  navLogo: {
    width: 120,
    height: 50,
  },
  navLinks: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  navLinkItem: {
    padding: 10,
  },
  navLinkText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '500',
    opacity: 0.9,
  },
  navButtonOutline: {
    borderWidth: 1,
    borderColor: '#4FC3F7',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 50,
    backgroundColor: 'rgba(79, 195, 247, 0.1)',
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
    backgroundColor: '#00152e',
    position: 'relative',
    overflow: 'hidden',
  },
  decorativeCircle: {
    position: 'absolute',
    top: -50,
    backgroundColor: 'rgba(79, 195, 247, 0.05)',
  },
  heroOverlay: {
    zIndex: 2,
    alignItems: 'center',
    maxWidth: 1200,
    width: '100%',
  },
  heroTitle: {
    fontWeight: '900',
    color: '#FFFFFF',
    textAlign: 'center',
    letterSpacing: -0.5,
    marginBottom: 20,
    lineHeight: 1.1,
  },
  heroSubtitle: {
    color: '#B0BEC5',
    textAlign: 'center',
    marginBottom: 40,
    maxWidth: 800,
    lineHeight: 1.5,
  },
  heroButtons: {
    gap: 20,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroButtonPrimary: {
    backgroundColor: '#007BFF',
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 50,
    borderRadius: 50,
    boxShadow: '0px 4px 10px rgba(0, 123, 255, 0.4)',
    minWidth: 200,
    alignItems: 'center',
  },
  heroButtonSecondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#FFF',
    shadowOpacity: 0,
  },
  heroButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionContainer: {
    paddingVertical: 80,
    backgroundColor: '#F7F9FC',
    alignItems: 'center',
  },
  sectionHeader: {
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 50,
    textAlign: 'center',
  },
  cardsWrapper: {
    width: '100%',
    maxWidth: 1200,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 30,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 24,
    padding: 30,
    alignItems: 'center',
    alignItems: 'center',
    boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.05)',
    elevation: 2,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  cardIcon: {
    fontSize: 32,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 10,
  },
  cardDescription: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 25,
    lineHeight: 24,
    fontSize: 15,
  },
  cardButton: {
    backgroundColor: COLORS.accent,
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
  },
  cardButtonText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 15,
  },
  infoSection: {
    paddingVertical: 80,
    backgroundColor: '#FFF',
    alignItems: 'center',
  },
  infoWrapper: {
    maxWidth: 1200,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 60,
  },
  infoContent: {
    flex: 1,
  },
  infoHeader: {
    fontSize: 36,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 20,
    letterSpacing: -0.5,
  },
  infoText: {
    fontSize: 18,
    color: '#555',
    lineHeight: 30,
  },
  infoButton: {
    marginTop: 10,
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 50,
  },
  infoButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  infoImagePlaceholder: {
    backgroundColor: '#E3F2FD',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#BBDEFB',
  },
  footer: {
    backgroundColor: '#00152e',
    paddingVertical: 40,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerBrand: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  footerText: {
    color: '#718096',
    fontSize: 14,
  },
  footerLinks: {
    gap: 20,
  },
  footerLink: {
    color: '#A0AEC0',
    fontSize: 14,
    marginBottom: 5,
  },
});
