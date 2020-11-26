import React from 'react'
import { getMovies } from '../api';
import { 
    StyleSheet,
    Text,
    View,
    Animated,
    StatusBar,
    Image, 
    Platform,
    Dimensions,
    TouchableOpacity,
    ScrollView
 } from 'react-native'
import Loading from '../components/Loading'
import Backdrop from '../components/Backdrop'
import Rating from '../components/Rating'
import Genres from '../components/Genres'

const { width } = Dimensions.get('window');
const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.72 : width * 0.74;
const SPACING = 10;
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;


const Home = ({ navigation }) => {
   
    const [movies, setMovies] = React.useState([]);
    const scrollX = React.useRef(new Animated.Value(0)).current;
    React.useEffect(() => {
      const fetchData = async () => {
        const movies = await getMovies();
        // Add empty items to create fake space
        // [empty_item, ...movies, empty_item]
        setMovies([{ key: 'empty-left' }, ...movies, { key: 'empty-right' }]);
      };
  
      if (movies.length === 0) {
        fetchData(movies);
      }
    }, [movies]);
  
    if (movies.length === 0) {
      return <Loading />;
    }
  
    return (
      <View style={styles.container}>
        <Backdrop movies={movies} scrollX={scrollX} />
        <StatusBar hidden />
        <Animated.FlatList
          showsHorizontalScrollIndicator={false}
          data={movies}
          keyExtractor={(item) => item.key}
          horizontal
          bounces={false}
          decelerationRate={Platform.OS === 'ios' ? 0 : 0.98}
          renderToHardwareTextureAndroid
          contentContainerStyle={{ alignItems: 'center' }}
          snapToInterval={ITEM_SIZE}
          snapToAlignment='start'
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={16}
          renderItem={({ item, index }) => {
            if (!item.poster) {
              return <View style={{ width: EMPTY_ITEM_SIZE }} />;
            }
  
            const inputRange = [
              (index - 2) * ITEM_SIZE,
              (index - 1) * ITEM_SIZE,
              index * ITEM_SIZE,
            ];
  
            const translateY = scrollX.interpolate({
              inputRange,
              outputRange: [100, 50, 100],
              extrapolate: 'clamp',
            });
  
            return (
              <>
             
                <TouchableOpacity onPress={() => navigation.navigate('MovieDetails', {item})}
                style={{ width: ITEM_SIZE }}>
                  <Animated.View
                    style={{
                      marginHorizontal: SPACING,
                      padding: SPACING * 2,
                      alignItems: 'center',
                      transform: [{ translateY }],
                      backgroundColor: 'white',
                      borderRadius: 34,
                    }}
                  >
                    <Image
                      source={{ uri: item.poster }}
                      style={styles.posterImage}
                    />
                    <Text style={{ fontSize: 24 }} numberOfLines={1}>
                      {item.title}
                    </Text>
                    <Rating rating={item.rating} />
                    <Genres genres={item.genres} />
                    <Text style={{ fontSize: 12 }} numberOfLines={3}>
                      {item.description}
                    </Text>
                  </Animated.View>
                </TouchableOpacity>
               
              </>
            );
          }}
        />
      </View>
    );
  }
  

export default Home

const styles = StyleSheet.create({
    loadingContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    container: {
      flex: 1,
    },
    paragraph: {
      margin: 24,
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    posterImage: {
      width: '100%',
      height: ITEM_SIZE * 1.2,
      resizeMode: 'cover',
      borderRadius: 24,
      margin: 0,
      marginBottom: 10,
    },
  });
