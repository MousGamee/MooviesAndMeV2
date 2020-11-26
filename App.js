import * as React from 'react';
import AppContextProvider from './context/AppContext';
import MainNavigation from './navigation/MainNavigation';
import Home from './screens/Home'

export default function App() {
  return(
   
      <AppContextProvider>
       <MainNavigation />
      </AppContextProvider>
  
  )
}


