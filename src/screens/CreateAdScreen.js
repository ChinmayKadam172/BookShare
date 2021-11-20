import React , {useState} from 'react'
import { View, Text, StyleSheet, Alert , Modal, ActivityIndicator} from 'react-native'
import { TextInput } from 'react-native-paper'
import { Button } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import { ScrollView } from 'react-native-gesture-handler';
import {Picker} from '@react-native-picker/picker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
const CreateAdScreen = () => {
    const date = new Date();
    //Subject, Author, Publisher,DateofPurchase,Price,Contact Details
    const[subject,setSubject] = useState('');
    const[author,setAuthor] = useState('');
    const[publisher,setPublisher] = useState('');
    const[year,setYear] = useState('');
    const[price,setPrice] = useState('');
    const[phone,setPhone] = useState('');
    const[image,setImage] = useState('');
    const[stream,setStream] = useState('');
    const[loadState,setLoadState] = useState(false);
    const[temp,setTemp] = useState('');
    const[condition,setCondition] = useState('');
    const postData = async ()=>{
        //Alert.alert("Button Pressed!");
        if(subject==""||author==""||publisher==""||year==""||price==""||phone==""||stream=="")
        {
            Alert.alert("Please input all necessary details !");
            return;
        }
        try{
        await firestore().collection('ads')
            .add({
            subject,
            author,
            publisher,
            year,
            price,
            phone,
            image,
            stream,
            condition,
            date:Date.now(),
            uid: auth().currentUser.uid,
            key: ""+date.getFullYear()+date.getMonth()+date.getDay()+date.getHours()+date.getMinutes()+date.getMilliseconds()+condition+price+auth().currentUser.uid,
            keyPrice: price+""+date.getFullYear()+date.getMonth()+date.getDay()+date.getHours()+date.getMinutes()+date.getMilliseconds()+auth().currentUser.uid,
        })
        Alert.alert("Your Ad has been posted"); 
        setSubject("")
        setAuthor("")
        setPublisher("")
        setYear("")
        setPrice("")
        setPhone("")
        setStream("")
        setTemp("")
        setImage("")
        setLoadState(false)
        }catch(err)
        {
            console.log(err);
            Alert.alert("Something went wrong, please try again");

        }
        // add if statements to check if any field is empty and set all fields as empty after posting
    }



    const openCamera = ()=>{
        launchCamera({quality:0.5},(fileobj)=>{
               //console.log(fileobj.assets[0].uri)
               alert("Image uploading , please wait")
            const uploadTask =  storage().ref().child("/items/"+Date.now()+auth().currentUser.uid).putFile(fileobj.assets[0].uri)
            uploadTask.on('state_changed', 
            (snapshot) => {
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                 if(progress==100){
                     setLoadState(true);
                     alert("Image uploaded");
                    }
            }, 
            (error) => {
               alert("something went wrong")
            }, 
            () => {
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    console.log("urlll56 ; " +downloadURL)
                    setImage(downloadURL)
                });
            }
            );
           })
       }
       //cry

    

    return (
            <>
            <Text style = {styles.appBar}>Enter Book Details</Text>
            <ScrollView style = {styles.container}>
            <TextInput
                style={styles.input}
                label="Subject"
                value={subject}
                mode = "outlined"
                onChangeText={text=>setSubject(text)}
            />
            <Text style = {styles.label}>Stream</Text>
            <Picker
                style={styles.drop}
                selectedValue={stream}
                onValueChange={(itemValue, itemIndex) => {
                setTemp(itemValue)
                setStream(itemValue)}   }>
                <Picker.Item label="Select" value="null" />
                 <Picker.Item label="Engineering" value="engineering" />
                 <Picker.Item label="Medical" value="medical" />
                 <Picker.Item label="Science" value="science" />
                 <Picker.Item label="Commerce" value="commerce" />
                 <Picker.Item label="Law" value="law" />
                 <Picker.Item label="Arts" value="arts" />
                 <Picker.Item label="Design" value="design" />
                 <Picker.Item label="Architecture" value="architecture"/>
                 <Picker.Item label="Other" value="other"/>
            </Picker>
            {  temp=="other" && 
            <TextInput
                label="Enter stream"
                value={stream}
                mode = "outlined"
                onChangeText={text=>setStream(text)}
                style={styles.input}
            />}
            <TextInput
                label="Author name"
                value={author}
                mode = "outlined"
                onChangeText={text=>setAuthor(text)}
                style={styles.input}
            />
            <TextInput
                label="Publisher"
                value={publisher}
                mode = "outlined"
                onChangeText={text=>setPublisher(text)}
                style={styles.input}
            />
            <TextInput
                label="Year of purchase"
                value={year}
                mode = "outlined"
                keyboardType = "numeric"
                onChangeText={text=>setYear(text)}
                style={styles.input}
            />
            <Text style = {styles.label}>Condition</Text>
            <Picker
                style={styles.drop}
                selectedValue={condition}
                onValueChange={(itemValue, itemIndex) => {
                setCondition(itemValue)}}>
                <Picker.Item label="Select" value="na" />
                 <Picker.Item label="Used (well maintained)" value="Used" />
                 <Picker.Item label="New" value="New" />
                 <Picker.Item label="Rough Use" value="Rough-use" />
            </Picker>
            <TextInput
                label="Price (Enter 0 for Donations)"
                value={price}
                mode = "outlined"
                keyboardType = "numeric"
                onChangeText={text=>setPrice(text)}
                style={styles.input}
            />
            <TextInput
                label="Contact number"
                value={phone}
                mode = "outlined"
                keyboardType = "numeric"
                onChangeText={text=>setPhone(text)}
                style={styles.input}
            />
            <Button style={styles.button} icon ="camera" mode="contained" onPress={() => openCamera()}>
            Upload Image
            </Button>
            <Button style={styles.button} mode="contained" disabled={loadState == false} onPress={() => postData()}>
            Post Ad
            </Button>
        </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
   container : {
       flex :1,
       paddingHorizontal : 20,
       height : "100%"
   },
   text :{
       fontSize : 22,
       textAlign: 'center',
       paddingVertical:10,
   },
   input:{
       marginBottom:10,
   },
   label:{
       paddingHorizontal:10,
       fontSize:15,
       color:"black",
   },
   drop : {
       color:"grey",
       borderStyle:"solid",
       borderColor:"black",
   },
   button : {
       paddingVertical:10,
       marginVertical: 10,
   },
   appBar : {
    fontSize:24,
    fontWeight:'bold',
    color:"#00314F",
    backgroundColor:"#1DA1F2",
    padding:10,
    width:"100%",
    textAlign:"center",
   }
  })

export default CreateAdScreen
