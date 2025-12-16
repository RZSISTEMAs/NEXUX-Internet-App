import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';

const DashboardButton = ({ label, icon, onPress }) => (
    <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonIcon}>{icon}</Text>
        <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
);

export default function EmployeeDashboardScreen({ route, navigation }) {
    const { loggedInEmployee } = route.params;

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.welcomeTitle}>Bem-vindo, {loggedInEmployee.name}!</Text>
                    <Text style={styles.welcomeSubtitle}>Painel de Gerenciamento</Text>
                </View>

                {/* Grid de botões centralizada */}
                <View style={styles.grid}>
                    <DashboardButton 
                        label="Gerenciar Clientes" 
                        icon="👥" 
                        // Passando os dados do funcionário para a próxima tela
                        onPress={() => navigation.navigate('CustomerManagement', { loggedInEmployee })}
                    />
                    <DashboardButton 
                        label="Gerenciar Funcionários" 
                        icon="👨‍💼" 
                        onPress={() => navigation.navigate('EmployeeManagement')}
                    />
                </View>

                 <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.replace('Home')}>
                    <Text style={styles.logoutButtonText}>Sair</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#001f3f' },
    container: { flex: 1, justifyContent: 'center', padding: 20 },
    header: { position: 'absolute', top: 60, alignSelf: 'center', alignItems: 'center' },
    welcomeTitle: { fontSize: 28, fontWeight: 'bold', color: '#FFF' },
    welcomeSubtitle: { fontSize: 16, color: '#A0BACC', marginTop: 5 },
    grid: { 
        flexDirection: 'row', 
        flexWrap: 'wrap', 
        justifyContent: 'center', // Garante o alinhamento central
        alignItems: 'center',
    },
    button: {
        backgroundColor: 'rgba(0, 51, 102, 0.8)',
        width: 150,
        height: 150,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        elevation: 5,
    },
    buttonIcon: { fontSize: 40 },
    buttonText: { color: '#FFF', marginTop: 10, fontWeight: 'bold', textAlign: 'center' },
    logoutButton: {
        position: 'absolute',
        bottom: 40,
        alignSelf: 'center',
        paddingVertical: 10,
        paddingHorizontal: 30,
        backgroundColor: '#FF4136',
        borderRadius: 50,
    },
    logoutButtonText: {
        color: 'white',
        fontWeight: 'bold',
    }
});