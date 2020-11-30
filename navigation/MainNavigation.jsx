import React, { useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import MainBottomTab from './MainBottomTab'
import LoginStackPage from './LoginStackPage';
import { AppContext } from '../context/AppContext';


const MainNavigation = () => {
    const { isLogin } = useContext(AppContext)
    return (

        <NavigationContainer>
           { isLogin ? 
            (<MainBottomTab/>) 
           : 
            (<LoginStackPage />) 
            }
        </NavigationContainer>

    )
}

export default MainNavigation


