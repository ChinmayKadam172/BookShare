import { NavigationContainer } from '@react-navigation/native';
import React , {useState} from 'react'
import { View, Text, Image , StyleSheet, KeyboardAvoidingView} from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { TextInput } from 'react-native-paper'
import { Button } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import { Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen({navigation}) {
    const [email , setEmail] = useState('')
    const [password, setPassword] = useState('') 
    return (
        <ScrollView style={{padding:0,margin:0,backgroundColor:"#F7F7F7"}}>
            <View style={{marginVertical:15}}>
            <Image
            style={{
             width:260,
             height:50,
             alignSelf:"center",
             }}
             source={require('./BookShareLogo.jpeg')}/>
            </View>   
            <View style={{marginVertical:5}}>
            <Image
            style={{
             width:270,
             height:270,
             resizeMode:'contain',
             alignSelf:"center",
             }}
             source={require('./fly_book.jpeg')}/>
            </View>   
            <Text style={styles.text2}>Please Login to Continue</Text>
            <View style={styles.view2}>
            <TextInput
                style={styles.input}
                label="Email"
                value={email}
                mode = "outlined"
                onChangeText={text=>setEmail(text)}
            />
            <TextInput
                style={styles.input}
                label="Password"
                value={password}
                mode = "outlined"
                secureTextEntry = {true}
                onChangeText={text=>setPassword(text)}
            />
            <Button style={styles.button} mode="contained" onPress={() => userLogin(email,password)}>
            <Text style={styles.btntext}>Login</Text>
            </Button>
            <TouchableOpacity onPress={()=>navigation.goBack()}>
            <Text style={styles.text}>Don't have an account? Sign up</Text>
            </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

const userLogin = async (email,password) => {
    if(!email||!password) 
    {
        Alert.alert("Please input all necessary fields !")
        return;
    }
    try
    {
        Alert.alert("Please wait","We are logging you in")
        const result = await auth().signInWithEmailAndPassword(email,password);
        console.log(result.user);
    }catch(err){
        console.log(err);
        Alert.alert("Something went wrong, Please try again");
    }
}

const styles = StyleSheet.create({
    view1:{
        alignItems:'center',
        margin:15,
        marginBottom:0,
    },
    view2: {
        paddingHorizontal:20,
        justifyContent:"space-evenly",
        marginBottom:0,
    },
    text:{
        fontSize:16,
        textAlign:'center',
        marginVertical:10,
        color:"#1DA1F2",
    },
    input:{
        marginBottom:5,
    },
    button : {
        alignSelf:"center",
        backgroundColor:"black",
        padding:5,
        width:"100%",
        margin:5,
        borderRadius:10,
      },
      btntext:{
        fontSize:22,
        textAlign:"center",
        fontWeight:"bold",
        color:"white",
      },
      text2:{
          fontSize:16,
          color:"black",
        //   fontWeight:"bold",
          textAlign:"center",
      }
  })