import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Switch, ScrollView } from 'react-native';


const PLANS = [
  { id: 1, speed: 10, price: 79.90 },
  { id: 2, speed: 25, price: 99.90 },
  { id: 3, speed: 50, price: 129.90 },
];

const EXTRA_SERVICES = {
  highGainAntenna: { name: 'Antena Potencializada', price: 20.00 },
  prioritySupport: { name: 'Suporte Prioritário', price: 10.00 },
};

export default function RadioPlansScreen({ navigation }) {
  const [selectedPlan, setSelectedPlan] = useState(PLANS[0]);
  const [extras, setExtras] = useState({
    highGainAntenna: false,
    prioritySupport: false,
  });
  const [totalPrice, setTotalPrice] = useState(0);

 
  useEffect(() => {
    let currentTotal = selectedPlan.price;
    if (extras.highGainAntenna) {
      currentTotal += EXTRA_SERVICES.highGainAntenna.price;
    }
    if (extras.prioritySupport) {
      currentTotal += EXTRA_SERVICES.prioritySupport.price;
    }
    setTotalPrice(currentTotal);
  }, [selectedPlan, extras]);

  const handleHire = () => {
    const planDetails = {
      type: 'Internet Rádio', 
      speed: selectedPlan.speed,
      extras: {
        highGainAntenna: extras.highGainAntenna,
        prioritySupport: extras.prioritySupport,
      },
      total: totalPrice,
    };
    
    navigation.navigate('Registration', { planDetails });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Monte seu Plano Rádio</Text>
        <Text style={styles.subtitle}>Escolha a velocidade ideal para sua localidade.</Text>

       
        <View style={styles.optionsContainer}>
          <Text style={styles.sectionTitle}>1. Escolha a velocidade</Text>
          {PLANS.map((plan) => (
            <TouchableOpacity
              key={plan.id}
              style={[styles.planButton, selectedPlan.id === plan.id && styles.planButtonSelected]}
              onPress={() => setSelectedPlan(plan)}
            >
              <Text style={styles.planSpeed}>{plan.speed} Mbps</Text>
              <Text style={styles.planPrice}>R$ {plan.price.toFixed(2).replace('.', ',')}</Text>
            </TouchableOpacity>
          ))}
        </View>

      
        <View style={styles.optionsContainer}>
          <Text style={styles.sectionTitle}>2. Serviços Adicionais</Text>
          <View style={styles.extraOption}>
            <Text style={styles.extraText}>{EXTRA_SERVICES.highGainAntenna.name} (+ R$ {EXTRA_SERVICES.highGainAntenna.price.toFixed(2)})</Text>
            <Switch
              value={extras.highGainAntenna}
              onValueChange={(value) => setExtras({ ...extras, highGainAntenna: value })}
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={extras.highGainAntenna ? "#17A2B8" : "#f4f3f4"}
            />
          </View>
          <View style={styles.extraOption}>
            <Text style={styles.extraText}>{EXTRA_SERVICES.prioritySupport.name} (+ R$ {EXTRA_SERVICES.prioritySupport.price.toFixed(2)})</Text>
            <Switch
              value={extras.prioritySupport}
              onValueChange={(value) => setExtras({ ...extras, prioritySupport: value })}
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={extras.prioritySupport ? "#17A2B8" : "#f4f3f4"}
            />
          </View>
        </View>

        
        <View style={styles.footer}>
          <Text style={styles.totalLabel}>TOTAL MENSAL</Text>
          <Text style={styles.totalPrice}>R$ {totalPrice.toFixed(2).replace('.', ',')}</Text>
          <TouchableOpacity style={styles.hireButton} onPress={handleHire}>
            <Text style={styles.hireButtonText}>Contratar Agora</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#002147' },
  container: { padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#FFF', textAlign: 'center' },
  subtitle: { fontSize: 16, color: '#A0BACC', textAlign: 'center', marginBottom: 30 },
  optionsContainer: { marginBottom: 30 },
  sectionTitle: { fontSize: 20, fontWeight: '600', color: '#FFF', marginBottom: 15 },
  planButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  planButtonSelected: {
    borderColor: '#17A2B8', 
    backgroundColor: 'rgba(23, 162, 184, 0.2)',
  },
  planSpeed: { fontSize: 18, color: '#FFF', fontWeight: 'bold' },
  planPrice: { fontSize: 16, color: '#A0BACC' },
  extraOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  extraText: { fontSize: 16, color: '#FFF' },
  footer: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderColor: '#A0BACC',
    alignItems: 'center',
  },
  totalLabel: { fontSize: 16, color: '#A0BACC' },
  totalPrice: { fontSize: 32, fontWeight: 'bold', color: '#FFF', marginVertical: 10 },
  hireButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 50,
    width: '100%',
    alignItems: 'center',
  },
  hireButtonText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
});
