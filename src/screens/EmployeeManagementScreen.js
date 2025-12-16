import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, TextInput, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

export default function EmployeeManagementScreen() {
    const [employees, setEmployees] = useState([]);
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const loadEmployees = async () => {
        const savedEmployees = await AsyncStorage.getItem('employees');
        if (savedEmployees) setEmployees(JSON.parse(savedEmployees));
    };

    useFocusEffect(React.useCallback(() => { loadEmployees(); }, []));

    const handleAddEmployee = async () => {
        if (!name || !username || !password) {
            Alert.alert("Erro", "Preencha todos os campos.");
            return;
        }
        const newEmployee = { id: Date.now().toString(), name, username, password, role: 'employee' };
        const updatedEmployees = [...employees, newEmployee];
        await AsyncStorage.setItem('employees', JSON.stringify(updatedEmployees));
        setEmployees(updatedEmployees);
        setName(''); setUsername(''); setPassword(''); // Limpa os campos
    };
    
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.formContainer}>
                <Text style={styles.title}>Adicionar Funcionário</Text>
                <TextInput style={styles.input} placeholder="Nome Completo" value={name} onChangeText={setName} />
                <TextInput style={styles.input} placeholder="Usuário (para login)" value={username} onChangeText={setUsername} autoCapitalize="none"/>
                <TextInput style={styles.input} placeholder="Senha" value={password} onChangeText={setPassword} secureTextEntry />
                <TouchableOpacity style={styles.button} onPress={handleAddEmployee}>
                    <Text style={styles.buttonText}>Adicionar</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={employees}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View style={styles.employeeCard}>
                        <Text style={styles.employeeName}>{item.name}</Text>
                        <Text style={styles.employeeUser}>Usuário: {item.username}</Text>
                    </View>
                )}
                ListHeaderComponent={<Text style={styles.listHeader}>Funcionários Cadastrados</Text>}
            />
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#001f3f' },
    formContainer: { padding: 20, borderBottomWidth: 1, borderColor: '#003366' },
    title: { fontSize: 22, fontWeight: 'bold', color: '#FFF', marginBottom: 15 },
    input: { backgroundColor: 'rgba(0, 51, 102, 0.8)', color: 'white', borderRadius: 8, padding: 10, marginBottom: 10 },
    button: { backgroundColor: '#007BFF', padding: 12, borderRadius: 8, alignItems: 'center' },
    buttonText: { color: '#FFF', fontWeight: 'bold' },
    listHeader: { fontSize: 22, fontWeight: 'bold', color: '#FFF', padding: 20, },
    employeeCard: { backgroundColor: '#003366', padding: 15, marginHorizontal: 20, marginBottom: 10, borderRadius: 8 },
    employeeName: { color: 'white', fontSize: 16, fontWeight: 'bold' },
    employeeUser: { color: '#A0BACC' },
});