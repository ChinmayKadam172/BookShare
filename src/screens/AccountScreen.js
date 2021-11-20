import React, {useState, useEffect} from 'react'
import { View, FlatList, StyleSheet, Text, ScrollViewComponent } from 'react-native'
import auth from '@react-native-firebase/auth'
import { Button, Card, Title, Paragraph } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore'
import { SafeAreaView } from 'react-native-safe-area-context';
import { LogBox } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

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
  </Card>
    )
}


const AccountScreen = () => {
    useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    }, [])

    const [items, setItems] = useState([]);

    const getDetails =  async () => {
        const querySnap = await firestore().collection('ads').where("uid","==",auth().currentUser.uid).get()
        const result = querySnap.docs.map(docSnap=>docSnap.data()) // returns array of data
        console.log(result);
        setItems(result);
      }
      useEffect(() => {
        getDetails();
        return()=>{
          console.log("cleanup") // cleanup function to handle warning
        }
      }, [])


    return (
        <ScrollView>
            <Text style={styles.heading}>Account info</Text>
            <Text style={styles.Text}>Email : {auth().currentUser.email}</Text>
            <Button style={styles.button} mode="contained" onPress={() => auth().signOut()}>
            <Text style={{color:"white",textAlign:"center",fontWeight:"bold",fontSize:20,}}>Logout</Text>
            </Button>
            <Text style={styles.Text}>Your Listings</Text>
            <FlatList
                data = {items}
                keyExtractor = {(item) => item.key}
                renderItem = {({item})=>renderItem(item)}
            />
        </ScrollView>
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
        color:"black",
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
      Text:{
          padding:10,
          color:"black",
          fontSize:18,
          textAlign:"center",
      },
      pic:{
        margin:5,
        marginTop:0,
        borderRadius:10,
        width:"50%",
      },
      heading:{
          fontSize:24,
          fontWeight:'bold',
          color:"#00314F",
          backgroundColor:"#1DA1F2",
          padding:10,
          textAlign:"center",
      },
  })

export default AccountScreen
