import React, { useState, useEffect, useContext } from 'react'
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
import { getMovieSearch, getImagePath, getDefaultMovie, genres } from '../api'
import Genres from '../components/Genres';
import Loading from '../components/Loading'
import Rating from '../components/Rating';
import { AppContext } from '../context/AppContext';

const { width, height } = Dimensions.get('window');

const Search = ({ navigation }) => {
    const {isSearch , setIsSearch, query, setQuery, movieResult,setMovieResult} = useContext(AppContext)
    const[isfocused, setIfocused] = useState(false)
    const [defaultMovies, setDefaultMovie] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [apiGenre, setApiGenre] = useState(genres)

    const loadMovie = search => {
        if(query != ''){
        getMovieSearch(search).then(
            res => {
                setMovieResult(res.results)
                setIsSearch(true)
                console.log(res.results)   
                }
            )
        }
        
    }
    
    const defaultMovie = () => {
        getDefaultMovie().then(res => {
            setDefaultMovie(res.results)   
        })
    }

    useEffect(() => {
        
        if(movieResult.length == 0){
            setIsSearch(false)
        }
        if(defaultMovie.length == 0){
            defaultMovie()
        }
    }, [movieResult,defaultMovies])

    const setLoader = () => {
            return <Loading />;
    }
    

    return (
        <View style={{flex : 1, backgroundColor : 'white'}}>
            <Animatable.View animation='slideInRight' duration={900}   
            style={{paddingLeft : isSearch ? 60 : 10 ,
                height : 80,
                justifyContent : "center",
                paddingRight : 10,
                backgroundColor : 'white'}}>
                <TextInput  
                onSubmitEditing={() => loadMovie(query)} 
                value={query}
                onChangeText={(text) => setQuery(text) }
                onFocus={() => setIfocused(true)} 
                onBlur={() => setIfocused(false)}  
                style={styles.inputSearch} 
                placeholder="Recherche"/>
            </Animatable.View>
            {
                movieResult.length == 0 ? (
                   <FlatList
                   key={'_'}
                   numColumns={3}
                   contentContainerStyle={{ alignItems: 'center' }}
                   data={defaultMovies}
                    style={{ backgroundColor : isfocused ? 'rgba(0, 0, 0, 0.3)' : 'white'}}
                    keyExtractor={item => '_' + item.id.toString()}
                   renderItem={({ item , i}) => {
                       return(
                        <TouchableOpacity 
                        onPress={() => navigation.navigate('MovieDetails', {item})}
                        style={{width : '33%', height : 200, padding : 2}}>
                            <Image 
                                
                                source={{ uri : getImagePath(item.poster_path)}}
                                style={{width : null, height : null, resizeMode : "cover", flex : 1}}
                            />
                        </TouchableOpacity>
                        
                       )
                   }}
                    />
                ) : (
                    <FlatList
                    key={'#'}
                    style={{ backgroundColor : isfocused ? 'rgba(0, 0, 0, 0.3)' : 'white'}}
                    keyExtractor={item => '#' + item.id.toString()}
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
                            <Text style={{ fontSize: 15, fontWeight : "bold", marginBottom : 10 }} numberOfLines={1}>
                            {item.title}
                            </Text>
                            <Text style={{ fontSize: 12, marginBottom : 5 }} numberOfLines={3}>
                                {item.overview.length == 0 ? 'pas de description' : item.overview}
                            </Text>
                            <Genres genres={item.genre_ids.map((genre) => apiGenre[genre])}/>
                            <Rating rating={item.vote_average} />
                        </View>     
                    </TouchableOpacity>
                        )
                    }}
                /> 
                )
            }
        </View>
    )
}

export default Search

const styles = StyleSheet.create({
    inputSearch : {
        borderColor : 'tomato',
        borderWidth : 1,
        width : '100%',
        height : 50,
        paddingLeft : 20,
        borderRadius : 30
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
        padding : 10
    },
    genres: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginVertical: 4,
      },
      genre: {
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderWidth: 1,
        borderRadius: 14,
        borderColor: '#ccc',
        marginRight: 4,
        marginBottom: 4,
      },
      genreText: {
        fontSize: 9, 
        opacity: 0.4
      }
   
})
