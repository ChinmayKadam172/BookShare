import React, {useState, useEffect} from 'react'
import { View, FlatList, StyleSheet , Linking, TouchableNativeFeedbackBase, Image, TouchableNativeFeedback} from 'react-native'
import { Text, Button, Card, Title, Paragraph } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore'
import { ScrollView } from 'react-native-gesture-handler';
import { LogBox } from 'react-native';


const renderItem = (item) => {
    return (
    <Card style={styles.card}>
    <Text style={styles.subject}>{item.subject}</Text>
    <View style={{flex: 1, flexDirection: 'row'}}>
    <Card.Cover style={styles.pic} source={{uri:item.image}} />
    <View style={styles.miniContainer}>
      <Text style={styles.mini}>By {item.author + ", " + item.publisher}</Text>
      <Text style={styles.mini}>Purchased in {item.year}</Text>
      <Text style={styles.mini}>Condition : {item.condition}</Text>
      <Text style={styles.mini}>Price : {item.price} ₹</Text>
    </View>
    </View>
      <View style={styles.button}><Text style={{color:"white",textAlign:"center",fontWeight:"bold",fontSize:20,}} onPress={()=>{Linking.openURL('tel:'+item.phone);}}>Contact Seller</Text></View>
      
  </Card>
    )
}
const ListItemScreen = () => {
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
}, [])


    const [items, setItems] = useState([]);
    const getDetails =  async () => {
      const querySnap = await firestore().collection('ads').get()
      const result = querySnap.docs.map(docSnap=>docSnap.data()) // returns array of data
      console.log(result);
      setItems(result);
    }
    useEffect(() => {
     // setInterval(getDetails(),1000);
     getDetails()
      return()=>{
        console.log("cleanup") // cleanup function to handle warning
      }
    }, [])
    return (
      <View style={{paddingBottom:50}}>
      <View style={{paddingTop:10}}>
            <Image
            style={{
            //  width:250,
            //  height:50,
            width:200,
            height:30,
             alignSelf:"center",
             }}
             source={require('./BookShareLogo.jpeg')}/>
            </View>   
        <ScrollView style={{backgroundColor:"#F7F7F7"}}>        
            <FlatList
                data = {items}
                keyExtractor = {(item) => item.key}
                renderItem = {({item})=>renderItem(item)}
            />
        </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    card : {
      margin : 10,
      // marginBottom: 55,
      elevation : 10,
    },
    subject : {
      fontSize:18,
      textAlign:"left",
      padding: 15,
      color:"#00314F",
      fontWeight:"bold",
      backgroundColor:"#1DA1F2",
      borderTopLeftRadius:10,
      borderTopRightRadius:10,
      marginBottom:5,
    },
    mini:{
      fontWeight:"500",
      padding:2,
    },
    miniContainer:{
      width:"50%",
      padding:5,
    },
    button : {
      alignSelf:"center",
      backgroundColor:"black",
      padding:10,
      width:"95%",
      margin:5,
      borderRadius:10,
    },
    text:{
      fontSize:24,
      textAlign:"center",
      fontWeight:"bold",
    },
    pic:{
      margin:5,
      marginBottom:0,
      marginTop:0,
      borderRadius:10,
      width:"50%",
    },
  })

export default ListItemScreen
