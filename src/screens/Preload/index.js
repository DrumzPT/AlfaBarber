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
  const { state, dispatch: userDispatch } = useContext(UserContext)

  const saveUserInfoAndRedirectToDashboard = (user) => {
    userDispatch({
      type: 'setName',
      payload: {
        name: user.displayName,
        email: user.email
      }
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
        saveUserInfoAndRedirectToDashboard(user)
      } else {
        const email = await AsyncStorage.getItem('email');
        const password = await AsyncStorage.getItem('password');
        
        if(email !== undefined && password !== undefined){
          result = await Api.signIn(email, password)
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