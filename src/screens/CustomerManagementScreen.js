import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, RefreshControl, TouchableOpacity, Alert, Share, Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

// --- Componentes do Card --- //
const UserItem = ({ user, onUpdate, onDelete, onChangePassword, isAdmin }) => {
    const currentStatus = user.status || 'Pendente';
    const isUrgent = user.urgent || false;

    const handleContact = (type) => {
        let url = '';
        if (type === 'email') {
            url = `mailto:${user.email}`;
        }
        if (type === 'maps') {
            url = `https://maps.google.com/?q=${encodeURIComponent(`${user.address.street}, ${user.address.number} - ${user.address.city}`)}`;
        }
        if (type === 'whatsapp') {
            const phone = user.whatsapp.replace(/\D/g, '');
            let message = '';
            const date = new Date(user.installationDateTime).toLocaleDateString('pt-BR');
            const time = new Date(user.installationDateTime).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

            switch(currentStatus) {
                case 'Pendente':
                case 'Realizado':
                    message = ` prezado(a) *${user.name}*,\n\n` +
                              `Confirmamos o agendamento da sua instalação *NEXUX*.\n\n` +
                              `*Detalhes do Serviço:*\n` +
                              `*- Plano:* ${user.plan.type} - ${user.plan.speed} Mbps\n` +
                              `*- Data:* ${date}\n` +
                              `*- Horário:* ${time}\n` +
                              `*- Endereço:* ${user.address.street}, ${user.address.number}\n\n` +
                              `Por favor, confirme o recebimento desta mensagem para garantir que nosso técnico se desloque até o local.\n\n` +
                              `Atenciosamente,\n*Equipe NEXUX*`;
                    break;
                case 'Finalizado':
                    message = `Olá, *${user.name}*!\n\n` +
                              `É com grande satisfação que confirmamos a ativação do seu plano *${user.plan.type} de ${user.plan.speed} Mbps*.\n\n` +
                              `Sua nova conexão de alta velocidade já está funcionando!\n\n` +
                              `Para suporte ou dúvidas, não hesite em nos contatar. Agradecemos por escolher a NEXUX.\n\n` +
                              `Atenciosamente,\n*Equipe NEXUX*`;
                    break;
                case 'Cancelado':
                     message = `Prezado(a) *${user.name}*,\n\n` +
                               `Este é um comunicado oficial sobre o cancelamento do seu contrato de serviço com a NEXUX.\n\n` +
                               `Caso necessite de mais informações ou queira discutir uma reativação, por favor, entre em contato com nosso suporte.\n\n` +
                               `Atenciosamente,\n*Equipe NEXUX*`;
                     break;
            }
            url = `https://wa.me/55${phone}?text=${encodeURIComponent(message)}`;
        }

        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                Linking.openURL(url);
            } else {
                Alert.alert("Erro", `Não foi possível abrir o aplicativo. Verifique se o ${type} está instalado.`);
            }
        }).catch(err => console.error('Ocorreu um erro', err));
    };

    return (
        <View style={[styles.userCard, isUrgent && styles.userCardUrgent, currentStatus === 'Cancelado' && styles.userCardCanceled]}>
            {isUrgent && <Text style={styles.urgentBanner}>URGENTE</Text>}
            <View style={styles.cardHeader}>
                <Text style={styles.userName}>{user.name}</Text>
                {isAdmin && (
                    <TouchableOpacity style={styles.deleteButton} onPress={() => onDelete(user.id)}>
                        <Text style={styles.deleteButtonText}>Excluir</Text>
                    </TouchableOpacity>
                )}
            </View>
            <View style={styles.cardBody}>
                <Text style={styles.userInfo}><Text style={styles.label}>Email:</Text> {user.email}</Text>
                <Text style={styles.userInfo}><Text style={styles.label}>Plano:</Text> {user.plan.type} - {user.plan.speed} Mbps</Text>
                <Text style={styles.userInfo}><Text style={styles.label}>Agendamento:</Text> {new Date(user.installationDateTime).toLocaleString('pt-BR')}</Text>
            </View>
            
            <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Ações Rápidas</Text>
                {/* BOTÕES CORRIGIDOS AQUI */}
                <View style={styles.actionsContainer}>
                    <TouchableOpacity style={styles.actionButton} onPress={() => handleContact('email')}><Text style={styles.actionButtonText}>Email</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton} onPress={() => handleContact('whatsapp')}><Text style={styles.actionButtonText}>WhatsApp</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton} onPress={() => handleContact('maps')}><Text style={styles.actionButtonText}>Mapa</Text></TouchableOpacity>
                </View>
            </View>

            <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Status do Serviço</Text>
                <View style={styles.statusButtonsContainer}>
                    <TouchableOpacity style={[styles.statusButton, currentStatus === 'Pendente' && styles.statusActivePendente]} onPress={() => onUpdate(user.id, { status: 'Pendente' })}><Text style={styles.statusButtonText}>Pendente</Text></TouchableOpacity>
                    <TouchableOpacity style={[styles.statusButton, currentStatus === 'Realizado' && styles.statusActiveRealizado]} onPress={() => onUpdate(user.id, { status: 'Realizado' })}><Text style={styles.statusButtonText}>Realizado</Text></TouchableOpacity>
                    <TouchableOpacity style={[styles.statusButton, currentStatus === 'Finalizado' && styles.statusActiveFinalizado]} onPress={() => onUpdate(user.id, { status: 'Finalizado' })}><Text style={styles.statusButtonText}>Finalizado</Text></TouchableOpacity>
                </View>
            </View>

            <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Gerenciamento Avançado</Text>
                <TouchableOpacity style={styles.managementButton} onPress={() => onUpdate(user.id, { urgent: !isUrgent })}>
                    <Text style={styles.managementButtonText}>{isUrgent ? 'Remover Urgência' : 'Marcar como Urgente'}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.managementButton} onPress={() => onChangePassword(user.id)}>
                    <Text style={styles.managementButtonText}>Alterar Senha</Text>
                </TouchableOpacity>

                {currentStatus !== 'Cancelado' ? (
                    <TouchableOpacity style={[styles.managementButton, styles.cancelButton]} onPress={() => onUpdate(user.id, { status: 'Cancelado' }, 'cancelar')}>
                        <Text style={styles.managementButtonText}>Cancelar Cliente</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity style={[styles.managementButton, styles.reactivateButton]} onPress={() => onUpdate(user.id, { status: 'Pendente' }, 'reativar')}>
                        <Text style={styles.managementButtonText}>Reativar Cliente</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

export default function CustomerManagementScreen({ route }) {
    const { loggedInEmployee } = route.params;
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadUsers = async () => {
        setLoading(true);
        try {
            const savedUsers = await AsyncStorage.getItem('users');
            setUsers(savedUsers ? JSON.parse(savedUsers) : []);
        } catch (error) { Alert.alert("Erro", "Não foi possível carregar os usuários."); }
        finally { setLoading(false); }
    };
    
    useFocusEffect(React.useCallback(() => { loadUsers(); }, []));

    const handleUpdateUser = async (userId, dataToUpdate, actionType) => {
        const messages = {
            'cancelar': "Tem certeza que deseja CANCELAR este cliente?",
            'reativar': "Deseja REATIVAR o plano para este cliente?",
            'default': "Tem certeza que deseja alterar o status?"
        };
        Alert.alert("Confirmar Ação", messages[actionType] || messages.default, [
            { text: "Voltar", style: "cancel" },
            { text: "Confirmar", onPress: async () => {
                const updatedUsers = users.map(user => user.id === userId ? { ...user, ...dataToUpdate } : user);
                await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));
                setUsers(updatedUsers);
            }}
        ]);
    };

    const handleChangePassword = (userId) => {
        Alert.prompt("Alterar Senha", "Digite a nova senha para o cliente:",
            [{ text: "Cancelar" }, { text: "Salvar", onPress: (pass) => { if (pass) handleUpdateUser(userId, { password: pass }); }}],
            'plain-text'
        );
    };

    const handleDeleteUser = (userId) => {
        Alert.alert("Confirmar Exclusão", "Esta ação não pode ser desfeita.",
            [{ text: "Cancelar" }, { text: "Excluir", style: "destructive", onPress: async () => {
                const updatedUsers = users.filter(user => user.id !== userId);
                await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));
                setUsers(updatedUsers);
            }}]
        );
    };

    const handleExportData = async () => {
        if (users.length === 0) { Alert.alert("Aviso", "Não há usuários para exportar."); return; }
        const reportHeader = `Relatório de Clientes - NEXUX - Gerado em: ${new Date().toLocaleString('pt-BR')}\n\n`;
        const reportBody = users.map(user => {
            return `----------------------------------------\nNome: ${user.name}\nStatus: ${user.status || 'Pendente'}${user.urgent ? ' (URGENTE)' : ''}\nContato: ${user.whatsapp}\nEmail: ${user.email}\nPlano: ${user.plan.type} - ${user.plan.speed} Mbps\nValor: R$ ${user.plan.total.toFixed(2)}\nEndereço: ${user.address.street}, ${user.address.number}\nAgendamento: ${new Date(user.installationDateTime).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })}`;
        }).join('\n');
        try {
            await Share.share({ message: reportHeader + reportBody });
        } catch (error) { Alert.alert("Erro", "Não foi possível compartilhar."); }
    };
    
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <Text style={styles.title}>Gestão de Clientes</Text>
                <TouchableOpacity onPress={handleExportData}><Text style={styles.exportButton}>Exportar</Text></TouchableOpacity>
            </View>
            <FlatList
                data={users}
                renderItem={({ item }) => (
                    <UserItem 
                        user={item} 
                        onDelete={handleDeleteUser} 
                        onUpdate={handleUpdateUser}
                        onChangePassword={handleChangePassword}
                        isAdmin={loggedInEmployee.role === 'admin'}
                    />
                )}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContainer}
                refreshControl={<RefreshControl refreshing={loading} onRefresh={loadUsers} tintColor="#FFF" />}
                ListEmptyComponent={!loading && <Text style={styles.emptyText}>Nenhum usuário cadastrado.</Text>}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#001f3f' },
    header: { paddingHorizontal: 20, paddingVertical: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#003366' },
    title: { fontSize: 24, fontWeight: 'bold', color: '#FFFFFF' },
    exportButton: { color: '#007BFF', fontSize: 16, fontWeight: 'bold' },
    listContainer: { padding: 20 },
    userCard: { backgroundColor: '#003366', borderRadius: 10, marginBottom: 15, borderWidth: 1, borderColor: '#003366' },
    userCardUrgent: { borderColor: '#FFDC00', borderWidth: 2 },
    userCardCanceled: { backgroundColor: '#5c2e2a', borderColor: '#FF4136' },
    urgentBanner: { backgroundColor: '#FFDC00', color: '#001f3f', fontWeight: 'bold', textAlign: 'center', paddingVertical: 4, fontSize: 12 },
    cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.2)', padding: 15 },
    userName: { fontSize: 18, fontWeight: 'bold', color: '#FFFFFF', flex: 1 },
    deleteButton: { backgroundColor: '#FF4136', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 5 },
    deleteButtonText: { color: 'white', fontWeight: 'bold', fontSize: 12 },
    cardBody: { padding: 15 },
    userInfo: { fontSize: 14, color: '#A0BACC', lineHeight: 20 },
    label: { fontWeight: 'bold', color: '#FFF' },
    sectionContainer: { borderTopWidth: 1, borderColor: '#004080', paddingTop: 15, paddingHorizontal: 15, paddingBottom: 10 },
    sectionTitle: { fontSize: 14, fontWeight: 'bold', color: '#FFF', marginBottom: 10, textTransform: 'uppercase', opacity: 0.7 },
    actionsContainer: { flexDirection: 'row', justifyContent: 'space-around' },
    actionButton: { padding: 5 },
    actionButtonText: { color: '#7FDBFF', fontWeight: 'bold' },
    statusButtonsContainer: { flexDirection: 'row', justifyContent: 'space-around', flexWrap: 'wrap' },
    statusButton: { borderWidth: 1, borderColor: '#A0BACC', borderRadius: 20, paddingVertical: 6, paddingHorizontal: 12, margin: 2 },
    statusActivePendente: { backgroundColor: '#FFDC00', borderColor: '#FFDC00' },
    statusActiveRealizado: { backgroundColor: '#39CCCC', borderColor: '#39CCCC' },
    statusActiveFinalizado: { backgroundColor: '#2ECC40', borderColor: '#2ECC40' },
    statusButtonText: { color: 'black', fontWeight: 'bold', fontSize: 12 },
    managementButton: { backgroundColor: 'rgba(0, 123, 255, 0.5)', paddingVertical: 10, borderRadius: 5, alignItems: 'center', marginBottom: 10 },
    cancelButton: { backgroundColor: '#FF851B' },
    reactivateButton: { backgroundColor: '#2ECC40' },
    managementButtonText: { color: 'white', fontWeight: 'bold' },
    emptyText: { color: '#A0BACC', textAlign: 'center', marginTop: 50, fontSize: 16 }
});