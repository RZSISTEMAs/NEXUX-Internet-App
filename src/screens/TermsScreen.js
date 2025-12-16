import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';


const TERMS_TEXT = `
Última atualização: 17 de Junho de 2024

Bem-vindo à NEXUX. Estes termos e condições descrevem as regras e regulamentos para o uso do website e dos serviços da NEXUX.

1. Contas de Usuário
Ao criar uma conta conosco, você garante que as informações fornecidas são precisas, completas e atuais. A falha em fazer isso constitui uma violação dos Termos, o que pode resultar na rescisão imediata da sua conta em nosso Serviço.

2. Planos e Pagamentos
As taxas para os planos de internet serão faturadas ou cobradas antecipadamente em uma base recorrente e periódica ("Ciclo de Faturamento"). Os ciclos de faturamento são definidos mensalmente.

3. Instalação
A NEXUX agendará uma data de instalação com você. É sua responsabilidade garantir que um adulto esteja presente no local durante o período de instalação agendado. A viabilidade técnica será confirmada no local.

4. Cancelamento
Você pode cancelar sua assinatura a qualquer momento. O cancelamento pode estar sujeito a uma taxa de rescisão se ocorrer dentro do período de fidelidade, conforme especificado no seu contrato.

5. Limitação de Responsabilidade
Em nenhuma circunstância a NEXUX, nem seus diretores, funcionários, parceiros, agentes, fornecedores ou afiliados, serão responsáveis por quaisquer danos indiretos, incidentais, especiais, consequenciais ou punitivos.
... 
`;

export default function TermsScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Termos e Condições</Text>
        <Text style={styles.termsContent}>{TERMS_TEXT}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#002147',
  },
  container: {
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  termsContent: {
    fontSize: 14,
    color: '#A0BACC',
    lineHeight: 22,
  },
});
