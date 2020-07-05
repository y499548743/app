import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DiscoveryInterface from './DiscoveryInterface'
import AnnualAccount from './AnnualAccount'

const MyStack = createStackNavigator();
function Discovery(){
    return (<MyStack.Navigator>
        <MyStack.Screen name="DiscoveryInterface" component={DiscoveryInterface} options={{headerShown: false}}/>
        <MyStack.Screen name="AnnualAccount" component={AnnualAccount} options={{headerShown: false}}/>
    </MyStack.Navigator>);
}

export default Discovery;