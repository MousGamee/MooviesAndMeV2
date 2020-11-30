import React, { useContext, useEffect, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, ScrollView, View, Image, ImageBackground, FlatList, TouchableOpacity } from 'react-native'
import { AppContext } from '../context/AppContext';
import { getImagePath, getSimilarMovie, genres} from '../api'
import Rating from '../components/Rating';
import * as Animatable from 'react-native-animatable'
import Genres from '../components/Genres';
import { G } from 'react-native-svg';

const MovieDetails2 = ({route, navigation}) => {

    const [similarMovie, setSimilarMovie] = useState([])
    const [unmounted, setUnmounted] = useState(false)
    const [apiGenre, setApiGenre] = useState(genres)
    const { item } = route.params
    const {  BACKDROP_HEIGHT, width, height, ITEM_SIZE } = useContext(AppContext)

    
    const fetchData = () => {
        getSimilarMovie(item.id).then(
            res => setSimilarMovie(res)
        )
    }

    useEffect(() => {
        console.log('component monté')
        if(!unmounted){
            getSimilarMovie(item.id).then(
                res =>{ 
                    setSimilarMovie(res.results)
                    console.log('res monté => ',similarMovie)
                }
            )
        }
       return () => {
           setUnmounted(true)
           console.log('component pas monté')
           console.log('res pas monté => ',similarMovie)

       }
    }, [unmounted])

    return (
        <ScrollView style={{flex : 1, backgroundColor : 'white'}}>
            <ImageBackground 
                animation='slideInUp'
                style={{
                    width : width,
                    height : BACKDROP_HEIGHT,
                    backgroundColor : 'violet'
                }}
                source={{ uri : getImagePath(item.backdrop_path) }}
            > 
                <View 
                style={{width, flexDirection : "row", justifyContent : "space-around", marginTop : BACKDROP_HEIGHT - 350}}>
                    <Animatable.View 
                        animation='fadeInLeft' delay={300}
                        style={styles.imageContainer}>
                        <Image 
                        borderRadius={10}
                        style={{ width : null, height : null, resizeMode : 'cover', flex : 1,  }}
                        source={{ uri : getImagePath(item.poster_path) }}
                        />
                    </Animatable.View>

                    <Animatable.View
                        style={{flex : 1}}
                       animation='fadeInRight' delay={600}
                    >
                        <Text style={{color : 'white', fontSize : 20, fontWeight : "bold", marginTop : 20}}>{ item.title }</Text>
                        <Rating rating={item.vote_average} />
                        <Genres custumColor='white' genres={item.genre_ids.map((genre) => apiGenre[genre])}/>
                    </Animatable.View>
                </View>
                    <LinearGradient
                        colors={['rgba(0, 0, 0, 0)', 'white']}
                        style={{
                        height: BACKDROP_HEIGHT - 290,
                        width,
                        position: 'absolute',
                        bottom: 0,
                        }}
            />  
            </ImageBackground>
                       
            <Animatable.View style={{ paddingHorizontal : 20}} animation='fadeInRight' delay={700} >
                <Text style={{fontSize : 20, color : 'tomato', fontWeight : "bold", marginBottom : 15}}>Synopsis</Text>
                <Text>{item.overview.length == 0 ? 'pas de description' : item.overview}</Text>
            </Animatable.View>


            <Text style={{fontSize : 20, color : 'tomato', fontWeight : "bold", marginTop : 15, marginLeft : 15}}>Titre similaire</Text>
            <FlatList 
                style={{marginTop : 20, paddingHorizontal : 10}}
                renderToHardwareTextureAndroid
                key={'__'}
                data={similarMovie}
                showsHorizontalScrollIndicator={false}
                horizontal
                keyExtractor={item => '__' + item.id.toString()}
                renderItem={({item}) => {
                    return(
                        <TouchableOpacity 
                        onPress={() => navigation.navigate('MovieDetails2', {item})}
                        style={{width : 200, height : 350, backgroundColor : 'white', flex : 1, marginRight : 10, padding : 10, borderRadius : 20}}>
                            <Image borderRadius={20}  style={{width : '100%', height : '70%', resizeMode : "cover"}}source={{ uri : getImagePath(item.poster_path)}}/>
                            <View style={{justifyContent : "center"}}>
                                <Text numberOfLines={2} style={{textAlign : "center", marginBottom : 5}}>{item.title}</Text>
                                <Rating rating={item.vote_average} />
                                <Genres custumColor='black' genres={item.genre_ids.map((genre) => apiGenre[genre])}/>
                            </View>
                        </TouchableOpacity>
                    )
                }}
                /> 
        </ScrollView>
    )
}

export default MovieDetails2

const styles = StyleSheet.create({
    imageContainer : {
        width : '40%', 
        height : 240,
        padding : 5, 
        backgroundColor : 'white', 
        borderRadius : 10, 
        marginLeft : 50,
        marginRight : 10
    },

})
