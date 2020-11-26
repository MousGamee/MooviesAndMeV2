import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import MainBottomTab from './MainBottomTab'


const MainNavigation = () => {
    return (
        <NavigationContainer>
            <MainBottomTab/>
        </NavigationContainer>
    )
}

export default MainNavigation


