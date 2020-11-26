import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Home from '../screens/Home'
import MovieDetails from '../screens/MovieDetails'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Search from '../screens/Search'

const HomeStack = createStackNavigator()
const HomeStackPage = ({ navigation }) => {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen name="home" component={Home} options={{
                  headerTitle : false,
                  headerBackTitleVisible : false,
                  headerTransparent : true, 
                  headerTintColor : '#ffffff',
                  headerRight : () => (
                    <Ionicons 
                    name='ios-search' 
                    size={25} 
                    color='#ffffff' 
                    style={{marginRight : 20, padding : 10,}} 
                    onPress={() => navigation.navigate('Search')}/>
                  )
            }}/>
            <HomeStack.Screen name="MovieDetails" component={MovieDetails} />
            <HomeStack.Screen name="Search" component={Search} options={{
                 headerTitle : false,
                 headerBackTitleVisible : false,
                 headerTransparent : true, 
                 headerTintColor : '#ffffff',
            }}/>
        </HomeStack.Navigator>
    )
}

export default HomeStackPage
