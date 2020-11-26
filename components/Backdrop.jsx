import React, {useContext} from 'react'
import {
    View,
    FlatList,
    Animated,
    Image
} from 'react-native'
import { AppContext } from '../context/AppContext';
import { LinearGradient } from 'expo-linear-gradient';

const Backdrop = ({ movies, scrollX }) => {
    const {  BACKDROP_HEIGHT, width, height, ITEM_SIZE } = useContext(AppContext)
    return (
      <View style={{ height: BACKDROP_HEIGHT, width, position: 'absolute' }}>
        <FlatList
          data={movies.reverse()}
          keyExtractor={(item) => item.key + '-backdrop'}
          removeClippedSubviews={false}
          contentContainerStyle={{ width, height: BACKDROP_HEIGHT }}
          renderItem={({ item, index }) => {
            if (!item.backdrop) {
              return null;
            }
            const translateX = scrollX.interpolate({
              inputRange: [(index - 2) * ITEM_SIZE, (index - 1) * ITEM_SIZE],
              outputRange: [0, width],
              // extrapolate:'clamp'
            });
            return (
              <Animated.View
                removeClippedSubviews={false}
                style={{
                  position: 'absolute',
                  width: translateX,
                  height,
                  overflow: 'hidden',
                }}
              >
                <Image
                  source={{ uri: item.backdrop }}
                  style={{
                    width,
                    height: BACKDROP_HEIGHT,
                    position: 'absolute',
                  }}
                />
              </Animated.View>
            );
          }}
        />
        <LinearGradient
          colors={['rgba(0, 0, 0, 0)', 'white']}
          style={{
            height: BACKDROP_HEIGHT,
            width,
            position: 'absolute',
            bottom: 0,
          }}
        />
      </View>
    );
  };

  export default Backdrop