import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MyInterface from './MyInterface'
import Category from './Category'
import PayCategory from './PayCategory'
import ReceiptCategory from './ReceiptCategory'
import Login from './Login'


const MyStack = createStackNavigator();
function My(){
    return (<MyStack.Navigator>
        <MyStack.Screen name="MyInterface" component={MyInterface} options={{headerShown: false}}/>
        <MyStack.Screen name="Category" component={Category} options={{headerShown: false}}/>
        <MyStack.Screen name="PayCategory" component={PayCategory} options={{headerShown: false}}/>
        <MyStack.Screen name="ReceiptCategory" component={ReceiptCategory} options={{headerShown: false}}/>
        <MyStack.Screen name="Login" component={Login} options={{headerShown: false}}/>
    </MyStack.Navigator>);
}

export default My;