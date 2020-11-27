import React, { useContext } from 'react'
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack'
import Home from '../screens/Home'
import MovieDetails from '../screens/MovieDetails'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Search from '../screens/Search'
import { AppContext } from '../context/AppContext';

const HomeStack = createStackNavigator()
const HomeStackPage = ({ navigation }) => {
    const {isSearch , setIsSearch, setQuery, setMovieResult } = useContext(AppContext)
    const resetQuery = () => {
        setIsSearch(false)
        setQuery('')
        setMovieResult([])
    }
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
            <HomeStack.Screen name="Search" component={Search} options={({ navigation, route }) => (
                {
                    headerTitle : false,
                    headerBackTitleVisible : false,
                    headerTransparent : true, 
                    headerTintColor : 'tomato',
                    headerLeft : () => (
                        <HeaderBackButton 
                        onPress={() => resetQuery()}
                        tintColor='tomato'
                        style={{marginTop : 23, color : 'tomato', display : isSearch ? 'flex' : 'none'}}/>
                    )
                }
            )}
                 
            />
        </HomeStack.Navigator>
    )
}

export default HomeStackPage
