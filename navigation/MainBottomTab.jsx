import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeStackPage from './HomeStackPage'


const Tab = createBottomTabNavigator()
const mainBottomTab = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeStackPage}/>
        </Tab.Navigator>
    )
}

export default mainBottomTab
