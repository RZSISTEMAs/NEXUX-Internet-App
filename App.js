import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './src/screens/HomeScreen';
import FiberPlansScreen from './src/screens/FiberPlansScreen';
import RadioPlansScreen from './src/screens/RadioPlansScreen';
import ClientLoginScreen from './src/screens/ClientLoginScreen';
import EmployeeLoginScreen from './src/screens/EmployeeLoginScreen';
import RegistrationScreen from './src/screens/RegistrationScreen';
import TermsScreen from './src/screens/TermsScreen';
import CustomerManagementScreen from './src/screens/CustomerManagementScreen';
import ClientDashboardScreen from './src/screens/ClientDashboardScreen';
import EditProfileScreen from './src/screens/EditProfileScreen';
import EmployeeDashboardScreen from './src/screens/EmployeeDashboardScreen';
import EmployeeManagementScreen from './src/screens/EmployeeManagementScreen';
import AboutAppScreen from './src/screens/AboutAppScreen';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: '#002147' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
          headerBackTitle: 'Voltar'
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="FiberPlans" component={FiberPlansScreen} options={{ title: 'Planos Fibra' }} />
        <Stack.Screen name="RadioPlans" component={RadioPlansScreen} options={{ title: 'Planos Rádio' }} />
        <Stack.Screen name="ClientLogin" component={ClientLoginScreen} options={{ title: 'Login do Cliente' }} />
        <Stack.Screen name="EmployeeLogin" component={EmployeeLoginScreen} options={{ title: 'Login de Funcionário' }} />
        <Stack.Screen name="Registration" component={RegistrationScreen} options={{ title: 'Cadastro' }} />
        <Stack.Screen name="Terms" component={TermsScreen} options={{ title: 'Termos e Condições' }} />
        <Stack.Screen name="CustomerManagement" component={CustomerManagementScreen} options={{ title: 'Gestão de Clientes' }} />
        <Stack.Screen name="ClientDashboard" component={ClientDashboardScreen} options={{ title: 'Minha Área' }} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ title: 'Editar Meus Dados' }} />
        <Stack.Screen name="EmployeeDashboard" component={EmployeeDashboardScreen} options={{ title: 'Painel do Funcionário' }} />
        <Stack.Screen name="EmployeeManagement" component={EmployeeManagementScreen} options={{ title: 'Gestão de Funcionários' }} />
        <Stack.Screen name="AboutApp" component={AboutAppScreen} options={{ title: 'Sobre o App' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}