import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TextInput, TouchableOpacity, Platform, Alert, ActivityIndicator } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CheckboxIcon = ({ checked }) => (
  <View style={[styles.checkboxBase, checked && styles.checkboxChecked]}>
    {checked && <Text style={styles.checkboxCheckmark}>✓</Text>}
  </View>
);

export default function RegistrationScreen({ route, navigation }) {
  const { planDetails } = route.params;

  const [form, setForm] = useState({
    name: '',
    cpf: '',
    email: '',
    password: '',
    whatsapp: '',
    address: { cep: '', street: '', number: '', neighborhood: '', city: '', state: '' },
  });
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cepLoading, setCepLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };
  
  const handleAddressChange = (field, value) => {
    setForm({ ...form, address: { ...form.address, [field]: value } });
  };

  const handleCepSearch = async () => {
    const cep = form.address.cep.replace(/\D/g, '');
    if (cep.length !== 8) {
      Alert.alert("Erro", "CEP inválido. Deve conter 8 dígitos.");
      return;
    }
    setCepLoading(true);
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      if (data.erro) {
        Alert.alert("Erro", "CEP não encontrado.");
      } else {
        setForm(prevForm => ({ ...prevForm, address: { ...prevForm.address, street: data.logradouro, neighborhood: data.bairro, city: data.localidade, state: data.uf }}));
      }
    } catch (error) {
      Alert.alert("Erro", "Não foi possível buscar o CEP.");
    } finally {
      setCepLoading(false);
    }
  };

  const handleConfirmSignature = async () => {
    if (!form.email || !form.password || !form.name) {
      Alert.alert("Erro", "Por favor, preencha pelo menos nome, e-mail e senha.");
      return;
    }
    setLoading(true);

    try {
        
        const existingUsersJson = await AsyncStorage.getItem('users');
        let users = existingUsersJson ? JSON.parse(existingUsersJson) : [];

        
        const emailExists = users.some(user => user.email.toLowerCase() === form.email.toLowerCase());
        if (emailExists) {
            Alert.alert("Erro", "Este e-mail já foi cadastrado.");
            setLoading(false);
            return;
        }

        const installationDateTime = new Date(date);
        installationDateTime.setHours(time.getHours());
        installationDateTime.setMinutes(time.getMinutes());

        
        const newUser = {
            id: new Date().getTime().toString(), 
            ...form,
            installationDateTime,
            plan: planDetails,
            createdAt: new Date(),
        };
        users.push(newUser);

        
        await AsyncStorage.setItem('users', JSON.stringify(users));

        Alert.alert("Cadastro Realizado!", "Sua conta foi criada com sucesso no dispositivo.", [
            { text: "Fazer Login", onPress: () => navigation.navigate('ClientLogin') }
        ]);

    } catch (error) {
        console.error("ERRO AO SALVAR NO ASYNCSTORAGE:", error);
        Alert.alert("Erro", "Ocorreu um problema ao salvar seus dados no dispositivo.");
    } finally {
        setLoading(false);
    }
  };

  const onChangeDate = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) setDate(selectedDate);
  };
  
  const onChangeTime = (event, selectedTime) => {
    setShowTimePicker(Platform.OS === 'ios');
    if (selectedTime) setTime(selectedTime);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Finalizar Contratação</Text>
        
        <View style={styles.summaryBox}>
          <Text style={styles.summaryTitle}>Resumo do seu Plano</Text>
          <Text style={styles.summaryText}>Plano: {planDetails.type}</Text>
          <Text style={styles.summaryText}>Velocidade: {planDetails.speed} Mbps</Text>
          <Text style={styles.summaryPrice}>Total: R$ {planDetails.total.toFixed(2).replace('.', ',')} /mês</Text>
        </View>

        <Text style={styles.formTitle}>Preencha seus dados</Text>
        <TextInput style={styles.input} placeholder="Nome Completo" onChangeText={(v) => handleInputChange('name', v)} placeholderTextColor="#888" />
        <TextInput style={styles.input} placeholder="CPF" onChangeText={(v) => handleInputChange('cpf', v)} keyboardType="numeric" placeholderTextColor="#888" />
        <TextInput style={styles.input} placeholder="E-mail" onChangeText={(v) => handleInputChange('email', v)} keyboardType="email-address" autoCapitalize="none" placeholderTextColor="#888" />
        <TextInput style={styles.input} placeholder="Crie uma Senha" onChangeText={(v) => handleInputChange('password', v)} secureTextEntry placeholderTextColor="#888" />
        <TextInput style={styles.input} placeholder="Nº de WhatsApp" onChangeText={(v) => handleInputChange('whatsapp', v)} keyboardType="phone-pad" placeholderTextColor="#888" />

        <Text style={styles.formTitle}>Endereço de Instalação</Text>
        <View style={styles.cepContainer}>
          <TextInput style={styles.cepInput} placeholder="CEP" value={form.address.cep} onChangeText={(v) => handleAddressChange('cep', v)} keyboardType="numeric" maxLength={8} placeholderTextColor="#888" />
          <TouchableOpacity style={styles.cepButton} onPress={handleCepSearch} disabled={cepLoading}>
            {cepLoading ? <ActivityIndicator size="small" color="#FFF" /> : <Text style={styles.cepButtonText}>Buscar</Text>}
          </TouchableOpacity>
        </View>
        <TextInput style={[styles.input, styles.disabledInput]} placeholder="Rua / Avenida" value={form.address.street} editable={false} />
        <TextInput style={styles.input} placeholder="Número e Complemento" value={form.address.number} onChangeText={(v) => handleAddressChange('number', v)} placeholderTextColor="#888" />
        <TextInput style={[styles.input, styles.disabledInput]} placeholder="Bairro" value={form.address.neighborhood} editable={false} />
        <TextInput style={[styles.input, styles.disabledInput]} placeholder="Cidade / Estado" value={form.address.city ? `${form.address.city} - ${form.address.state}` : ''} editable={false} />

        <Text style={styles.formTitle}>Agende a instalação</Text>
        <View style={styles.dateRow}>
          <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateButton}>
            <Text style={styles.dateButtonText}>{`Data: ${date.toLocaleDateString('pt-BR')}`}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowTimePicker(true)} style={styles.dateButton}>
            <Text style={styles.dateButtonText}>{`Hora: ${time.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`}</Text>
          </TouchableOpacity>
        </View>

        {showDatePicker && (<DateTimePicker value={date} mode="date" display="default" onChange={onChangeDate} minimumDate={new Date()} />)}
        {showTimePicker && (<DateTimePicker value={time} mode="time" display="default" is24Hour={true} onChange={onChangeTime} />)}


        <View style={styles.termsContainer}>
          <TouchableOpacity style={styles.checkboxContainer} onPress={() => setTermsAccepted(!termsAccepted)}>
            <CheckboxIcon checked={termsAccepted} />
          </TouchableOpacity>
          <Text style={styles.termsText}>
            Eu li e concordo com os{' '}
            <Text style={styles.linkText} onPress={() => navigation.navigate('Terms')}>
              Termos e Condições
            </Text>.
          </Text>
        </View>
        
        <TouchableOpacity style={[styles.button, (!termsAccepted || loading) && styles.buttonDisabled]} disabled={!termsAccepted || loading} onPress={handleConfirmSignature}>
          {loading ? (<ActivityIndicator size="small" color="#FFF" />) : (<Text style={styles.buttonText}>Confirmar Assinatura</Text>)}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#002147' },
  container: { padding: 20, paddingBottom: 40 },
  title: { fontSize: 26, fontWeight: 'bold', color: '#FFFFFF', textAlign: 'center', marginBottom: 20 },
  summaryBox: { backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: 10, padding: 20, marginBottom: 30 },
  summaryTitle: { fontSize: 18, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 10 },
  summaryText: { fontSize: 16, color: '#A0BACC', marginBottom: 5 },
  summaryPrice: { fontSize: 20, fontWeight: 'bold', color: '#4CAF50', marginTop: 10, textAlign: 'right' },
  formTitle: { fontSize: 20, fontWeight: '600', color: '#FFFFFF', marginBottom: 15, marginTop: 10 },
  input: { backgroundColor: '#FFF', borderRadius: 8, paddingHorizontal: 15, paddingVertical: 12, marginBottom: 15, fontSize: 16, color: '#000' },
  disabledInput: { backgroundColor: '#E0E0E0', color: '#888' },
  cepContainer: { flexDirection: 'row', alignItems: 'center' },
  cepInput: { flex: 1, borderTopLeftRadius: 8, borderBottomLeftRadius: 8, backgroundColor: '#FFF', paddingHorizontal: 15, paddingVertical: 12, marginBottom: 15, fontSize: 16 },
  cepButton: { backgroundColor: '#007BFF', padding: 12, borderTopRightRadius: 8, borderBottomRightRadius: 8, height: 49, marginBottom: 15, justifyContent: 'center' },
  cepButtonText: { color: '#FFF', fontWeight: 'bold' },
  dateRow: { flexDirection: 'row', justifyContent: 'space-between' },
  dateButton: { flex: 1, backgroundColor: '#FFF', padding: 15, borderRadius: 8, alignItems: 'center', marginHorizontal: 5 },
  dateButtonText: { fontSize: 16, color: '#000' },
  termsContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 25, marginBottom: 25 },
  checkboxContainer: { padding: 5 },
  checkboxBase: { width: 24, height: 24, justifyContent: 'center', alignItems: 'center', borderRadius: 4, borderWidth: 2, borderColor: '#007BFF', backgroundColor: 'transparent' },
  checkboxChecked: { backgroundColor: '#007BFF' },
  checkboxCheckmark: { color: 'white', fontWeight: 'bold' },
  termsText: { flex: 1, color: '#A0BACC', fontSize: 14, marginLeft: 10 },
  linkText: { color: '#007BFF', textDecorationLine: 'underline' },
  button: { backgroundColor: '#4CAF50', padding: 18, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  buttonDisabled: { backgroundColor: '#555' },
  buttonText: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' },
});
