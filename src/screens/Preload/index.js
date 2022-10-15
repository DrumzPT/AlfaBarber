import React, {useEffect} from "react";
import { Image } from "react-native";
import { Container, LoadingIcon } from "./styles";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native/"

export default () => {

  const navigation = useNavigation();

  useEffect(()=>{
    console.log("Aquii")
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("token");
      console.log("no async")
      if(token){
        // Validate token
      }else{
        console.log("no else")
        navigation.navigate("SignIn")
      }
    }
    checkToken();
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