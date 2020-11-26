import React, { useState, useEffect } from 'react'
import { 
    StyleSheet, 
    Text, 
    View,
    TextInput,
    Dimensions,
    FlatList,
    Image,
    TouchableOpacity
} from 'react-native'
import * as Animatable from 'react-native-animatable'
import { getMovieSearch, getImagePath } from '../api'
import Genres from '../components/Genres';
import Rating from '../components/Rating';
const { width, height } = Dimensions.get('window');

const Search = ({ navigation }) => {
    const[isfocused, setIfocused] = useState(false)
    const[movieResult, setMovieResult] = useState([])
    const [query, setQuery] = useState('')

    const loadMovie = search => {
        getMovieSearch(search).then(
            res => {
                setMovieResult(res.results)
                console.log(res.results)
            }
        )
    }
    useEffect(() => {
        
    }, [])
    return (
        <View style={{flex : 1}}>
            <Animatable.View animation='slideInRight' duration={900}   style={styles.header}>
                <TextInput  
                onSubmitEditing={() => loadMovie(query)} 
                value={query}
                onChangeText={(text) => setQuery(text) }
                onFocus={() => setIfocused(true)} 
                onBlur={() => setIfocused(false)}  
                style={styles.inputSearch} 
                placeholder="Recherche"/>
            </Animatable.View>
           <FlatList
                style={{ backgroundColor : isfocused ? 'rgba(0, 0, 0, 0.3)' : 'white'}}
                keyExtractor={item => item.id.toString()}
                data={movieResult}
                renderItem={({ item , i }) =>{
                    return(
                <TouchableOpacity 
                onPress={() => navigation.navigate('MovieDetails', {item})}
                    style={styles.row}>
                    <View style={styles.imageContainer} >
                        <Image 
                        borderRadius={20}
                            source={{ uri : getImagePath(item.poster_path)}}
                            style={styles.image}
                        />
                    </View>
                    <View style={styles.infoSection}>
                        <Text style={{ fontSize: 15 }} numberOfLines={1}>
                        {item.title}
                        </Text>
                        <Text style={{ fontSize: 12 }} numberOfLines={3}>
                            {item.overview.length == 0 ? 'pas de description' : item.overview}
                        </Text>
                    </View>     
                </TouchableOpacity>
                    )
                }}
            /> 
            
        </View>
    )
}

export default Search

const styles = StyleSheet.create({
    header:{
        height : 80,
        justifyContent : "center",
        paddingLeft : 60,
        paddingRight : 10
        
    },
    inputSearch : {
        borderColor : 'red',
        borderWidth : 1,
        width : '100%',
        height : 50,
        paddingLeft : 20
    },
    row : {
        width : width,
        height : 170,
        flexDirection : "row",
        marginBottom : 10
    },
    imageContainer : {
        height : '100%',
        width : '30%',
        padding : 5,
        backgroundColor : 'white',
        borderRadius : 20
    },
    image : {
        width : null,
        height : null,
        resizeMode : "cover",
        flex : 1
    },
    infoSection : {
        width : '70%',
        height : '100%',
        backgroundColor : 'orange',
        padding : 10
    }
   
})
