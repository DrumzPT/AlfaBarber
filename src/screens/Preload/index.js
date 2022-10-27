import React, {useEffect} from "react";
import { Image } from "react-native";
import { Container, LoadingIcon } from "./styles";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth } from "firebase/auth";
import { useNavigation } from "@react-navigation/native/"
import Api from "../../Api";

export default () => {

  const navigation = useNavigation();

  useEffect(()=>{
    const checkLoggedUser =  async() => {
      
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        console.log("User is signed in")
      } else {
        console.log("User is signed out")
        const email = await AsyncStorage.getItem('email');
        const password = await AsyncStorage.getItem('password');
        if(email && password){
          result = Api.signIn(email, password)
          if(result.success){
            //dashboard
          }else{
            navigation.navigate("SignIn")
          }
        }else{
          navigation.navigate("SignIn")
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