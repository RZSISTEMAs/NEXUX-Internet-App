import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// --- COMPONENTES --- //
const StatusDisplay = ({ status }) => {
    const statusInfo = {
        'Pendente': { text: 'Aguardando Instalação', color: '#FFDC00', icon: '⏳' },
        'Realizado': { text: 'Instalação Agendada', color: '#39CCCC', icon: '✅' },
        'Finalizado': { text: 'Serviço Ativo', color: '#2ECC40', icon: '🚀' },
        'Cancelado': { text: 'Serviço Cancelado', color: '#FF4136', icon: '❌' }, // Status novo
    };
    const currentStatus = statusInfo[status] || statusInfo['Pendente'];
    return (
        <View style={[styles.statusBox, { backgroundColor: currentStatus.color }]}>
            <Text style={styles.statusIcon}>{currentStatus.icon}</Text>
            <Text style={styles.statusText}>{currentStatus.text}</Text>
        </View>
    );
};

const PlanInfoCard = ({ label, value }) => (
    <View style={styles.infoCard}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
    </View>
);

const PaymentButton = ({ label, onPress, isActive }) => (
    <TouchableOpacity style={[styles.paymentButton, isActive && styles.paymentButtonActive]} onPress={onPress}>
        <Text style={[styles.paymentButtonText, isActive && styles.paymentButtonTextActive]}>{label}</Text>
    </TouchableOpacity>
);

// --- TELA PRINCIPAL --- //
export default function ClientDashboardScreen({ route, navigation }) {
    const { loggedInUser } = route.params;
    const [currentUser, setCurrentUser] = useState(loggedInUser);

    const updateUserData = async () => {
        try {
            const allUsersJson = await AsyncStorage.getItem('users');
            const allUsers = allUsersJson ? JSON.parse(allUsersJson) : [];
            const latestUser = allUsers.find(u => u.id === loggedInUser.id);
            if (latestUser) {
                setCurrentUser(latestUser);
            }
        } catch (e) {
            console.error("Failed to fetch latest user data.", e);
        }
    };
    
    useFocusEffect(
        React.useCallback(() => {
            updateUserData();
        }, [loggedInUser.id])
    );
    
    const handleSetPaymentMethod = async (method) => {
        const updatedUser = { ...currentUser, paymentMethod: method };
        try {
            const allUsersJson = await AsyncStorage.getItem('users');
            let allUsers = allUsersJson ? JSON.parse(allUsersJson) : [];
            const userIndex = allUsers.findIndex(u => u.id === currentUser.id);

            if (userIndex > -1) {
                allUsers[userIndex] = updatedUser;
                await AsyncStorage.setItem('users', JSON.stringify(allUsers));
                setCurrentUser(updatedUser);
                Alert.alert("Sucesso", `Forma de pagamento alterada para ${method}.`);
            }
        } catch (e) {
            Alert.alert("Erro", "Não foi possível salvar a forma de pagamento.");
        }
    };

    const getNextBillingDate = () => {
        if (currentUser.status === 'Cancelado') {
            return "Seu plano foi cancelado.";
        }
        if (currentUser.status !== 'Finalizado') {
            return "Seu serviço ainda não está ativo.";
        }
        const installationDate = new Date(currentUser.installationDateTime);
        installationDate.setMonth(installationDate.getMonth() + 1);
        return installationDate.toLocaleDateString('pt-BR');
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.welcomeTitle}>Olá, {currentUser.name.split(' ')[0]}!</Text>
                    <Text style={styles.welcomeSubtitle}>Este é o seu painel NEXUX.</Text>
                </View>

                <StatusDisplay status={currentUser.status} />

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Meu Plano</Text>
                    <PlanInfoCard label="Tipo de Conexão" value={currentUser.plan.type} />
                    <PlanInfoCard label="Velocidade" value={`${currentUser.plan.speed} Mbps`} />
                    <PlanInfoCard label="Valor Mensal" value={`R$ ${currentUser.plan.total.toFixed(2)}`} />
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Forma de Pagamento</Text>
                    <View style={styles.paymentContainer}>
                        <PaymentButton label="Boleto" isActive={currentUser.paymentMethod === 'Boleto'} onPress={() => handleSetPaymentMethod('Boleto')} />
                        <PaymentButton label="Pix" isActive={currentUser.paymentMethod === 'Pix'} onPress={() => handleSetPaymentMethod('Pix')} />
                        <PaymentButton label="Cartão" isActive={currentUser.paymentMethod === 'Cartão'} onPress={() => handleSetPaymentMethod('Cartão')} />
                    </View>
                    <PlanInfoCard label="Próxima Fatura" value={getNextBillingDate()} />
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Gerenciar Conta</Text>
                    <TouchableOpacity style={styles.manageButton} onPress={() => navigation.navigate('EditProfile', { currentUser })}>
                        <Text style={styles.manageButtonText}>Alterar Meus Dados</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#001f3f' },
    container: { padding: 20, paddingBottom: 40 },
    header: { marginBottom: 30 },
    welcomeTitle: { fontSize: 32, fontWeight: 'bold', color: '#FFF', textAlign: 'center' },
    welcomeSubtitle: { fontSize: 16, color: '#A0BACC', textAlign: 'center', marginTop: 5 },
    statusBox: { borderRadius: 15, padding: 20, flexDirection: 'row', alignItems: 'center', marginBottom: 30 },
    statusIcon: { fontSize: 30, marginRight: 15 },
    statusText: { fontSize: 18, fontWeight: 'bold', color: '#001f3f' },
    section: { marginBottom: 20, backgroundColor: 'rgba(0, 51, 102, 0.5)', borderRadius: 15, padding: 20 },
    sectionTitle: { fontSize: 22, fontWeight: 'bold', color: '#FFF', marginBottom: 15, borderBottomWidth: 1, borderBottomColor: '#007BFF', paddingBottom: 10 },
    infoCard: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: 'rgba(160, 186, 204, 0.2)' },
    infoLabel: { fontSize: 16, color: '#A0BACC' },
    infoValue: { fontSize: 16, color: '#FFF', fontWeight: 'bold' },
    paymentContainer: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 },
    paymentButton: { borderWidth: 1, borderColor: '#A0BACC', borderRadius: 20, paddingVertical: 8, paddingHorizontal: 18 },
    paymentButtonActive: { backgroundColor: '#39CCCC', borderColor: '#39CCCC' },
    paymentButtonText: { color: '#A0BACC', fontSize: 14 },
    paymentButtonTextActive: { color: 'white', fontWeight: 'bold' },
    manageButton: { backgroundColor: '#007BFF', padding: 15, borderRadius: 8, alignItems: 'center' },
    manageButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
});