import React, {useState , useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { configureFonts, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import CreateAdScreen from './screens/CreateAdScreen';
import ListItemScreen from './screens/ListItemScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Feather from 'react-native-vector-icons/Feather'
import AccountScreen from './screens/AccountScreen';
import auth from '@react-native-firebase/auth'

const App = () => {
  return (
    <PaperProvider theme={theme}>
    <StatusBar barStyle="dark-content" backgroundColor="#1DA1F2"/>
    <View style={styles.container}>
    <Navigation/>
    </View>
    </PaperProvider>
  );
};

const fontConfig = {
  android: {
    bold:{
      fontFamily: 'Montserrat-Bold',
      fontWeight: 'normal',
    },
    regular: {
      fontFamily: 'Montserrat-Regular',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'Montserrat-medium',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'Montserrat-thin',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'Montserrat-thin',
      fontWeight: 'normal',
    },
  }
}

const theme = {
  ...DefaultTheme,
  roundness: 18,
  colors: {
    ...DefaultTheme.colors,
    primary: '#1DA1F2',
    fonts: configureFonts(fontConfig),
  },
};

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AuthNavigator = () => {
  return(
    <Stack.Navigator>
        <Stack.Screen name = "signup" component = {SignupScreen}  options = {{headerShown:false}}/>
        <Stack.Screen name = "login" component = {LoginScreen} options = {{headerShown:false}}/>
      </Stack.Navigator>
  )
}

const Navigation = () => {
  const [user,setUser] = useState('')
  useEffect(()=>{
    const unsubscribe = auth().onAuthStateChanged((userExist)=>{
      if(userExist){
        setUser(userExist)
      }else{
        setUser("")
      }
    })
    return unsubscribe
  },[])
  return (
    <NavigationContainer>
      {user?<TabNavigator />:<AuthNavigator />}
    </NavigationContainer>
  )
}

const TabNavigator = () => {
  return (
    <Tab.Navigator 
    screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color}) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'home'
            }
            else if(route.name ==='Create'){
              iconName = 'plus-circle'
            }
            else
            {
              iconName = 'user'
            }
            // You can return any component that you like here!
            return <Feather name={iconName} size={25} color={color}/>;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
        >
        <Tab.Screen name="Home" component={ListItemScreen} options={{title:""}}/>
        <Tab.Screen name="Create" component={CreateAdScreen} options={{title:""}}/>
        <Tab.Screen name="Account" component={AccountScreen} options={{title:""}}/>
      </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  container : {
    flex:1,
  }
})

export default App;
//2:05:10
//https://www.youtube.com/watch?v=ntPQ-IPm3AM