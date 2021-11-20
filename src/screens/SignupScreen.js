import React , {useState} from 'react'
import { View, Text, Image , StyleSheet, KeyboardAvoidingView, TouchableOpacity, Alert} from 'react-native'
import { TextInput } from 'react-native-paper'
import { Button } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import { ScrollView } from 'react-native-gesture-handler';

export default function SignupScreen({navigation}) {
    const [email , setEmail] = useState('')
    const [password, setPassword] = useState('') 
    return (
        <>
        <ScrollView style={{backgroundColor:"#F7F7F7"}}>
        <View style={{marginVertical:15,}}>
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
             width:250,
             height:250,
             resizeMode:'contain',
             alignSelf:"center",
             }}
             source={require('./signup_bookshare.jpeg')}/>
            </View>   
            <Text style={styles.text2}>Let's get you Signed up and ready to go!</Text>
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
            <Button style={styles.button} mode="contained" onPress={() => userSignup(email,password)}>
            <Text style={styles.btntext}>Signup</Text>
            </Button>
            <TouchableOpacity onPress={()=>navigation.navigate("login")}>
            <Text style={styles.text}>Already have an account? Login</Text>
            </TouchableOpacity>
            </View>
        </ScrollView>
        </>
    )
}

const userSignup = async (email,password) => {
    if(!email||!password) 
    {
        Alert.alert("Please input all necessary fields !")
        return;
    }
    try
    {
        Alert.alert("Please wait","Sign up in process...")
        await auth().createUserWithEmailAndPassword(email,password);
    }catch(err){
        Alert.alert("Something went wrong, Please try again");
    }
}

const styles = StyleSheet.create({
    view1:{
        alignItems:'center'
    },
    view2: {
        paddingHorizontal:20,
    },
    text:{
        fontSize:16,
        textAlign:'center',
        marginVertical:10,
        color:"#1DA1F2",
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
          paddingBottom: 5,
      },
      input:{
        marginBottom:5,
    },
  })