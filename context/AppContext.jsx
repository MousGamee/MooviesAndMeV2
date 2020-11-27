import React, { createContext, useState } from 'react'
import {
    Dimensions,
    Platform,
  } from 'react-native';
  const { width, height } = Dimensions.get('window');

export const AppContext = createContext()

const AppContextProvider = ({ children }) => {

    //variable de taille
    const SPACING = 10;
    const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.72 : width * 0.74;
    const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;
    const BACKDROP_HEIGHT = height * 0.65;

    //variable de recherche
    const [isSearch, setIsSearch] = useState(false)
    const [query, setQuery] = useState('')
    const[movieResult, setMovieResult] = useState([])


    return(
        <AppContext.Provider value={{
            SPACING, 
            ITEM_SIZE, 
            EMPTY_ITEM_SIZE, 
            BACKDROP_HEIGHT, 
            width, height, 
            EMPTY_ITEM_SIZE, 
            isSearch, 
            setIsSearch,
            query,
            setQuery,
            movieResult,
            setMovieResult
        }}>
            { children }
        </AppContext.Provider>
    )
}

export default AppContextProvider