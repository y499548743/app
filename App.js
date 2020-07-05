import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';
import Detailed from './src/views/detailed/Detailed';
import Chart from './src/views/chart/Chart';
import Account from './src/views/account/Account';
import Discovery from './src/views/discovery/Discovery';
import My from './src/views/my/My';

const Tab = createBottomTabNavigator();
function App() {
  return (<NavigationContainer>
    <Tab.Navigator initialRouteName="Detailed" tabBarOptions={{ activeTintColor: '#FFDA44', inactiveTintColor: '#555' }}>
      <Tab.Screen name="Detailed" component={Detailed} options={{ tabBarIcon: ({ color }) => <Icon color={color} name="pay-circle-o1" type="antdesign" />, tabBarLabel: '明细' }} />
      <Tab.Screen name="Chart" component={Chart} options={{ tabBarIcon: ({ color }) => <Icon color={color} name="chart-line" type="material-community" />, tabBarLabel: '图表' }} />
      <Tab.Screen name="Account" component={Account} options={{ tabBarIcon: ({ color }) => <Icon color={color} name="add-circle" />, tabBarLabel: '记账' }} />
      <Tab.Screen name="Discovery" component={Discovery} options={{ tabBarIcon: ({ color }) => <Icon color={color} name="eye-circle" type="material-community" />, tabBarLabel: '发现' }} />
      <Tab.Screen name="My" component={My} options={{ tabBarIcon: ({ color }) => <Icon color={color} name="account-circle" />, tabBarLabel: '我的' }} />
    </Tab.Navigator>
  </NavigationContainer>)
}
export default App;
