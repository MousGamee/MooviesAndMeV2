import React, { useState, useEffect } from 'react'
import { 
    StyleSheet, 
    Text, 
    View,
    TextInput,
    Dimensions,
    FlatList,
} from 'react-native'
import * as Animatable from 'react-native-animatable'
import { getMovieSearch } from '../api'
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
            <Animatable.View animation='slideInRight' duration={900} style={styles.header}>
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
                style={{ backgroundColor : isfocused ? 'rgba(0, 0, 0, 0.3)' : 'white',}}
                keyExtractor={item => item.id.toString()}
                data={movieResult}
                renderItem={({ item , i }) =>{
                    return(
                        <View style={styles.row}>

                        </View>
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
        height : 50
    },
   
})
