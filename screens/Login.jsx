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

const WIDTH = Dimensions.get("window").width
const HEIGHT = Dimensions.get("window").height

const Login = ({ navigation}) => {
    const { setIsLogin } = useContext(AppContext)
    return (
        <ImageBackground 
        source={require('../assets/loginbkg.png')}
        style={styles.bkgLogin}
        >
        <StatusBar hidden />
        <View style={styles.loginContainer}>
            <Text style={styles.welcome}>Login</Text>
            <View style={styles.loginForm}>

                <TextInput 
                placeholder={'Pseudo'}
                underlineColorAndroid='transparent'
                style={styles.loginInput}/>

                 <TextInput 
                placeholder={'Password'} 
                secureTextEntry={true}
                underlineColorAndroid='transparent'
                style={styles.loginInput}/>

                <TouchableOpacity style={styles.loginBtn} onPress={() => setIsLogin(true)}>
                    <Text style={styles.loginBtnText}>Connection</Text>
                </TouchableOpacity>

                <View style={{flexDirection : "row"}}>
                    <Text>Pas de compte ? </Text>
                    <TouchableOpacity onPress={() => navigation.push('SignIn')}>
                        <Text style={{color : 'white'}}> Creer un compte !</Text>
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
        width : WIDTH,
        height : HEIGHT,
        resizeMode : "cover"
    },
    loginContainer : {
        flex : 1,
        justifyContent : "center",
        alignItems : "center",
        flexDirection : "column"
    },
    welcome : {
        color : 'white',
        fontSize : 30,
        fontWeight : 'bold',
        marginBottom : 10
    },
    loginForm : {
        paddingHorizontal : 20,  
        width : '100%', 
        justifyContent : "center", 
        alignItems : "center"
    },
    loginInput : {
        width : '100%',
        height : 50,
        borderColor : 'white',
        borderWidth : 2,
        backgroundColor : 'rgba(255, 255, 255,1)',
        borderRadius : 25,
        paddingLeft : 40,
        fontSize : 15,
        marginBottom : 10
    },
    loginBtn : {
        width : '100%',
        height : 50,
        backgroundColor : '#EF6644',
        borderRadius : 25,
        fontSize : 15,
        marginBottom : 10,
        justifyContent : "center",
        alignItems : "center",
        marginBottom : 30
    },
    loginBtnText : {
        color : 'white',
        fontSize : 17,
        fontWeight : 'bold', 
    }
})
