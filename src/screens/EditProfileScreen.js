import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function EditProfileScreen({ route, navigation }) {
    const { currentUser } = route.params;
    
    // Inicializa o formulário com os dados atuais do usuário
    const [form, setForm] = useState({
        name: currentUser.name,
        whatsapp: currentUser.whatsapp,
        password: '', // Senha fica em branco por segurança
    });
    const [loading, setLoading] = useState(false);

    const handleInputChange = (field, value) => {
        setForm({ ...form, [field]: value });
    };

    const handleSaveChanges = async () => {
        if (!form.name || !form.whatsapp) {
            Alert.alert("Erro", "Nome e WhatsApp não podem ficar em branco.");
            return;
        }
        setLoading(true);

        try {
            const allUsersJson = await AsyncStorage.getItem('users');
            let allUsers = allUsersJson ? JSON.parse(allUsersJson) : [];
            
            // Encontra o usuário na lista e atualiza seus dados
            const updatedUsers = allUsers.map(user => {
                if (user.id === currentUser.id) {
                    return {
                        ...user,
                        name: form.name,
                        whatsapp: form.whatsapp,
                        // Atualiza a senha apenas se o usuário digitou uma nova
                        password: form.password ? form.password : user.password,
                    };
                }
                return user;
            });

            await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));
            Alert.alert("Sucesso", "Seus dados foram atualizados!", [
                { text: "OK", onPress: () => navigation.goBack() }
            ]);

        } catch (e) {
            console.error("Erro ao salvar alterações:", e);
            Alert.alert("Erro", "Não foi possível salvar as alterações.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>Editar Perfil</Text>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Nome Completo</Text>
                    <TextInput
                        style={styles.input}
                        value={form.name}
                        onChangeText={(v) => handleInputChange('name', v)}
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Nº de WhatsApp</Text>
                    <TextInput
                        style={styles.input}
                        value={form.whatsapp}
                        onChangeText={(v) => handleInputChange('whatsapp', v)}
                        keyboardType="phone-pad"
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Nova Senha (opcional)</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Deixe em branco para não alterar"
                        placeholderTextColor="#888"
                        secureTextEntry
                        onChangeText={(v) => handleInputChange('password', v)}
                    />
                </View>

                <TouchableOpacity 
                    style={[styles.button, loading && styles.buttonDisabled]} 
                    onPress={handleSaveChanges}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator size="small" color="#FFF" />
                    ) : (
                        <Text style={styles.buttonText}>Salvar Alterações</Text>
                    )}
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#001f3f' },
    container: { padding: 20 },
    title: { fontSize: 28, fontWeight: 'bold', color: '#FFFFFF', textAlign: 'center', marginBottom: 40 },
    inputGroup: { marginBottom: 25 },
    label: { color: '#A0BACC', fontSize: 16, marginBottom: 8 },
    input: { backgroundColor: 'rgba(0, 51, 102, 0.8)', borderRadius: 8, padding: 15, fontSize: 16, color: '#FFF' },
    button: { backgroundColor: '#007BFF', padding: 18, borderRadius: 8, alignItems: 'center', marginTop: 20 },
    buttonDisabled: { backgroundColor: '#555' },
    buttonText: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' },
});
