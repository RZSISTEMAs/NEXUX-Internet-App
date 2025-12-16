import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ClientLoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert("Erro", "Por favor, preencha e-mail e senha.");
            return;
        }
        setLoading(true);

        try {
            const savedUsers = await AsyncStorage.getItem('users');
            const users = savedUsers ? JSON.parse(savedUsers) : [];

            const foundUser = users.find(
                user => user.email.toLowerCase() === email.toLowerCase() && user.password === password
            );

            if (foundUser) {
                // SUCESSO! Navega para o Dashboard e passa os dados do usuário
                // Usamos 'replace' para que o usuário não possa voltar para a tela de login
                navigation.replace('ClientDashboard', { loggedInUser: foundUser });
            } else {
                Alert.alert("Falha no Login", "E-mail ou senha incorretos.");
            }
        } catch (error) {
            console.error("Erro ao fazer login:", error);
            Alert.alert("Erro", "Ocorreu um problema ao tentar fazer o login.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Text style={styles.title}>Área do Cliente</Text>
                
                <TextInput
                    style={styles.input}
                    placeholder="Seu e-mail"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    placeholderTextColor="#888"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Sua senha"
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
                    {loading ? (
                        <ActivityIndicator size="small" color="#FFF" />
                    ) : (
                        <Text style={styles.buttonText}>Entrar</Text>
                    )}
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
    button: { backgroundColor: '#007BFF', padding: 18, borderRadius: 8, alignItems: 'center' },
    buttonDisabled: { backgroundColor: '#555' },
    buttonText: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' },
});