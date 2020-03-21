import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';

import 'react-native-gesture-handler';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Details from '~/components/DeliveryDetails';
import HeaderGoBack from '~/components/HeaderGoBack';
import SignIn from '~/pages/SignIn';

import ConfirmDelivery from './pages/ConfirmDelivery';
import Dashboard from './pages/Dashboard';
import AddProblem from './pages/Problems/AddProblem';
import ProblemView from './pages/Problems/ProblemView';
import Profile from './pages/Profile';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function DashboarMenu() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerTintColor: '#fff',
        headerStyle: {backgroundColor: '#7d40e7'},
        headerLeft: () => <HeaderGoBack />,
      }}>
      <Stack.Screen
        component={Dashboard}
        name="Dashboard"
        options={{headerShown: false}}
      />
      <Stack.Screen
        component={Details}
        name="Details"
        options={{
          title: 'Detalhes da encomenda',
        }}
      />
      <Stack.Screen
        component={AddProblem}
        name="AddProblem"
        options={{title: 'Informar problema'}}
      />
      <Stack.Screen
        component={ProblemView}
        name="ViewProblem"
        options={{title: 'Visualizar problemas'}}
      />
      <Stack.Screen
        component={ConfirmDelivery}
        name="ConfirmDelivery"
        options={{title: 'Confirmar entrega'}}
      />
    </Stack.Navigator>
  );
}

function MainScreen() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#7d40e7',
      }}>
      <Tab.Screen
        component={DashboarMenu}
        name="Entregas"
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="reorder" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        component={Profile}
        name="Perfil"
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="account-circle" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function Routes() {
  const {signed} = useSelector(state => state.auth);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!signed ? (
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{headerShown: false}}
          />
        ) : (
          <Stack.Screen
            name="Main"
            component={MainScreen}
            options={{headerShown: false}}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
