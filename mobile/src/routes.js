import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import 'react-native-gesture-handler';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import HeaderGoBack from '~/components/HeaderGoBack';

import SignIn from '~/pages/SignIn';
import Dashboard from './pages/Dashboard';

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
        name="Deliveries"
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="reorder" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function Routes() {
  // const { signed } = useSelector(state => state.auth);
  const signed = true;
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