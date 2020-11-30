import React, { useContext, useEffect } from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, ScrollView, View, Image, ImageBackground } from 'react-native'
import { AppContext } from '../context/AppContext';
import { getImagePath} from '../api'
import Rating from '../components/Rating';
import * as Animatable from 'react-native-animatable'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

const Tabs = createMaterialTopTabNavigator()

const MovieDetails = ({route}) => {
    const {  BACKDROP_HEIGHT, width, height, ITEM_SIZE } = useContext(AppContext)
    useEffect(() => {
        console.log(item)
    }, [])
    const { item } = route.params
    return (
        <ScrollView style={{flex : 1, backgroundColor : 'white'}}>
            <ImageBackground 
                animation='slideInUp'
                style={{
                    width : width,
                    height : BACKDROP_HEIGHT,
                    backgroundColor : 'violet'
                }}
                source={{ uri : item.backdrop }}
            > 
                <View 
                style={{width, flexDirection : "row", justifyContent : "space-around", marginTop : BACKDROP_HEIGHT - 350}}>
                    <Animatable.View 
                        animation='fadeInLeft' delay={300}
                        style={styles.imageContainer}>
                        <Image 
                        borderRadius={10}
                        style={{ width : null, height : null, resizeMode : 'cover', flex : 1,  }}
                        source={{ uri : item.poster }}
                        />
                    </Animatable.View>

                    <Animatable.View
                        style={{flex : 1}}
                       animation='fadeInRight' delay={600}
                    >
                        <Text style={{color : 'white', fontSize : 20, fontWeight : "bold", marginTop : 20}}>{ item.title }</Text>
                        <Rating rating={item.rating} />
                    </Animatable.View>
                </View>
            </ImageBackground>

            <LinearGradient
          colors={['rgba(0, 0, 0, 0)', 'white']}
          style={{
            height: BACKDROP_HEIGHT - 230,
            width,
            position: 'absolute',
            bottom: 0,
          }}
        />

           
        </ScrollView>
    )
}

export default MovieDetails

const styles = StyleSheet.create({
    imageContainer : {
        width : '40%', 
        height : 240,
        padding : 5, 
        backgroundColor : 'white', 
        borderRadius : 10, 
        marginLeft : 50,
        marginRight : 10
        
    }
})
