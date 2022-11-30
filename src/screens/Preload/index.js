import React, {useEffect, useContext} from "react";
import { UserContext } from "../../contexts/UserContext";
import { Image } from "react-native";
import { Container, LoadingIcon } from "./styles";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth } from "firebase/auth";
import { useNavigation } from "@react-navigation/native/"
import Api from "../../Api";

export default () => {

  const navigation = useNavigation();
  const { dispatch: userDispatch } = useContext(UserContext)

  const saveUserInfoAndRedirectToDashboard = (user) => {
    console.log("dentro do redirect")
    
    userDispatch({
      type: 'setName',
      payload: user.displayName
    })

    navigation.reset({
      routes:[{name:'MainTab'}]
    })
  }

  useEffect(()=>{
    const checkLoggedUser =  async() => {
      
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        console.log("User is signed in")
        saveUserInfoAndRedirectToDashboard(user)
      } else {
        console.log("User is signed out")
        const email = await AsyncStorage.getItem('email');
        const password = await AsyncStorage.getItem('password');
        
        console.log(email)
        console.log(password)
        if(email !== undefined && password !== undefined){
          result = await Api.signIn(email, password)
          console.log(result)
          if(result.success){
            saveUserInfoAndRedirectToDashboard(result.user)
          }else{
            navigation.reset({
              routes:[{name:'SignIn'}]
            })
            AsyncStorage.removeItem("email")
            AsyncStorage.removeItem('password');
          }
        }else{
          navigation.reset({
            routes:[{name:'SignIn'}]
          })
        }
      }
    }
    checkLoggedUser();
  }, [])

  return (
    <Container>
      <Image
        source={require("../../assets/logo.png")}
      />
      <LoadingIcon size="large" color="#FFFFFF"/>
    </Container>
  )
}