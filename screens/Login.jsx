import React, { useContext } from 'react'
import { 
    ImageBackground,
     StyleSheet, 
     Text, 
     View, 
     Dimensions, 
     TouchableOpacity, 
     TextInput,
     StatusBar } from 'react-native'
import { AppContext } from '../context/AppContext'

const Login = ({ navigation}) => {
    const { setIsLogin } = useContext(AppContext)
    return (
        <ImageBackground 
        source={require('../assets/loginbkg.png')}
        style={styles.bkgLogin}
        >
        <StatusBar hidden />
        <View style={styles.loginContainer}>
            <Text style={styles.welcome}>Welcome to MovieAndMe</Text>
            <Text style={styles.h2}>Connectes toi à l'aide de tes identifiants</Text>
            <View>
                <TextInput style={styles.loginInput}/>
                <TouchableOpacity style={styles.loginBtn} onPress={() => setIsLogin(true)}>
                    <Text style={styles.loginBtnText}>Connection</Text>
                </TouchableOpacity>
                <View style={styles.noAccount}>
                    <Text>Pas de compte ?</Text>
                    <TouchableOpacity onPress={() => navigation.push('SignIn')}>
                        <Text>Creer un compte !</Text>
                    </TouchableOpacity> 
                </View>
                
            </View>
        </View>
           
        </ImageBackground>
    )
}
export default Login

const styles = StyleSheet.create({
    bkgLogin : {
        flex : 1,
        width : '100%',
        height : '100%',
    },
    loginContainer : {
        flex : 1,
        justifyContent : "center",
        alignItems : "center",
        flexDirection : "column"
    },
    welcome : {
        color : 'white',
        fontSize : 20,
        fontWeight : 'bold'
    },
    h2 : {
        color : 'lightgrey',
        fontSize : 15
    }
})
