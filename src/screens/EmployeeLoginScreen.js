import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function EmployeeLoginScreen({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!username || !password) {
            Alert.alert("Erro", "Por favor, preencha usuário e senha.");
            return;
        }
        setLoading(true);

        // Usuário Mestre (Admin)
        if (username.toLowerCase() === 'admin' && password === '123') {
            const adminUser = { username: 'admin', name: 'Administrador Mestre', role: 'admin' };
            navigation.replace('EmployeeDashboard', { loggedInEmployee: adminUser });
            setLoading(false);
            return;
        }

        // Lógica para outros funcionários
        try {
            const savedEmployeesJson = await AsyncStorage.getItem('employees');
            const employees = savedEmployeesJson ? JSON.parse(savedEmployeesJson) : [];

            const foundEmployee = employees.find(
                emp => emp.username.toLowerCase() === username.toLowerCase() && emp.password === password
            );

            if (foundEmployee) {
                navigation.replace('EmployeeDashboard', { loggedInEmployee: foundEmployee });
            } else {
                Alert.alert("Acesso Negado", "Usuário ou senha de funcionário incorretos.");
            }
        } catch (error) {
            Alert.alert("Erro", "Ocorreu um problema ao tentar fazer o login.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Text style={styles.title}>Acesso Restrito</Text>
                
                <TextInput
                    style={styles.input}
                    placeholder="Usuário"
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="none"
                    placeholderTextColor="#888"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Senha"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    placeholderTextColor="#888"
                />

                <TouchableOpacity 
                    style={[styles.button, loading && styles.buttonDisabled]} 
                    onPress={handleLogin}
                    disabled={loading}
                >
                    {loading ? <ActivityIndicator size="small" color="#FFF" /> : <Text style={styles.buttonText}>Entrar</Text>}
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#002147' },
    container: { flex: 1, justifyContent: 'center', padding: 20 },
    title: { fontSize: 28, fontWeight: 'bold', color: '#FFFFFF', textAlign: 'center', marginBottom: 40 },
    input: { backgroundColor: '#FFF', borderRadius: 8, padding: 15, marginBottom: 15, fontSize: 16 },
    button: { backgroundColor: '#c11e0f', padding: 18, borderRadius: 8, alignItems: 'center' },
    buttonDisabled: { backgroundColor: '#555' },
    buttonText: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' },
});