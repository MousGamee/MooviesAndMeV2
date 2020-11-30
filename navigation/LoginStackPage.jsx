import React from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import Login from '../screens/Login'
import SignIn from '../screens/SignIn'

const LoginStack = createStackNavigator()
const LoginStackPage = () => {
    return (
        <LoginStack.Navigator screenOptions={{
            headerShown : false,
        }}>
            <LoginStack.Screen name='Login' component={Login}/>
            <LoginStack.Screen name='SignIn' component={SignIn}/>
        </LoginStack.Navigator>
    )
}

export default LoginStackPage
