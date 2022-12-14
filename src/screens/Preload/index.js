import React, {useEffect, useContext} from "react";
import { UserContext } from "../../contexts/UserContext";
import { Image } from "react-native";
import { Container, LoadingIcon } from "./styles";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native/"
import Api from "../../Api";

export default () => {

  const navigation = useNavigation();
  const { state, dispatch: userDispatch } = useContext(UserContext)

  const saveUserInfoAndRedirectToDashboard = (user, phoneNumber) => {
    userDispatch({
      type: 'setName',
      payload: {
        name: user.displayName,
        email: user.email,
        phoneNumber: phoneNumber
      }
    })
    
    navigation.reset({
      routes:[{name:'MainTab'}]
    })
  }

  useEffect(()=>{
    const checkLoggedUser =  async() => {

      const email = await AsyncStorage.getItem('email');
      const password = await AsyncStorage.getItem('password');
      
      if(email !== undefined && password !== undefined){
        result = await Api.signIn(email, password)
        const phoneNumber = await Api.getUserNumber(email)
        if(result.success){
          saveUserInfoAndRedirectToDashboard(result.user, phoneNumber)
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
    checkLoggedUser()
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