import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Switch, ScrollView } from 'react-native';


const PLANS = [
  { id: 1, speed: 200, price: 99.90 },
  { id: 2, speed: 400, price: 119.90 },
  { id: 3, speed: 600, price: 139.90 },
];

const EXTRA_SERVICES = {
  wifiPlus: { name: 'Wi-Fi Plus', price: 15.00 },
  staticIp: { name: 'IP Fixo', price: 25.00 },
};

export default function FiberPlansScreen({ navigation }) {
  const [selectedPlan, setSelectedPlan] = useState(PLANS[0]);
  const [extras, setExtras] = useState({
    wifiPlus: false,
    staticIp: false,
  });
  const [totalPrice, setTotalPrice] = useState(0);

  
  useEffect(() => {
    let currentTotal = selectedPlan.price;
    if (extras.wifiPlus) {
      currentTotal += EXTRA_SERVICES.wifiPlus.price;
    }
    if (extras.staticIp) {
      currentTotal += EXTRA_SERVICES.staticIp.price;
    }
    setTotalPrice(currentTotal);
  }, [selectedPlan, extras]);

  const handleHire = () => {
    const planDetails = {
      type: 'Fibra Óptica',
      speed: selectedPlan.speed,
      extras: {
        wifiPlus: extras.wifiPlus,
        staticIp: extras.staticIp,
      },
      total: totalPrice,
    };
    navigation.navigate('Registration', { planDetails });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Monte seu Plano Fibra</Text>
        <Text style={styles.subtitle}>Escolha a velocidade e adicione serviços.</Text>

       
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
            <Text style={styles.extraText}>{EXTRA_SERVICES.wifiPlus.name} (+ R$ {EXTRA_SERVICES.wifiPlus.price.toFixed(2)})</Text>
            <Switch
              value={extras.wifiPlus}
              onValueChange={(value) => setExtras({ ...extras, wifiPlus: value })}
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={extras.wifiPlus ? "#007BFF" : "#f4f3f4"}
            />
          </View>
          <View style={styles.extraOption}>
            <Text style={styles.extraText}>{EXTRA_SERVICES.staticIp.name} (+ R$ {EXTRA_SERVICES.staticIp.price.toFixed(2)})</Text>
            <Switch
              value={extras.staticIp}
              onValueChange={(value) => setExtras({ ...extras, staticIp: value })}
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={extras.staticIp ? "#007BFF" : "#f4f3f4"}
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
    borderColor: '#007BFF',
    backgroundColor: 'rgba(0, 123, 255, 0.2)',
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
