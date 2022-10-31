import React, { useState, useContext } from "react";
import { Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from '../../contexts/UserContext'
import { 
  Container, 
  InputArea,
  CustomButton,
  CustomButtonText,
  SignUpMessageButton,
  SignUpMessageButtonText,
  SignUpMessageButtonTextBold
} from "./styles";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Api from '../../Api'

import EmailIcon from '../../assets/email.svg'
import LockIcon from '../../assets/lock.svg'

import SignInput from "../../components/SignInput";

export default () => {
  
  const { dispatch: userDispatch } = useContext(UserContext)
  const navigation = useNavigation()

  const [emailField, setEmailField] = useState('')
  const [passwordField, setPasswordField] = useState('')

  const handleLoginClick = async () => {
    if(emailField != '' && passwordField != ''){
      let response = await Api.signIn(emailField, passwordField)

      console.log(response)
      if(response.success){
        alert("Login efectuado com sucesso")
        await AsyncStorage.setItem('password', passwordField)
        await AsyncStorage.setItem('email', emailField)

        userDispatch({
          type: 'setName',
          payload: response.user.displayName
        })

        navigation.reset({
          routes:[{name:'MainTab'}]
        })
      }else{
        alert(response.errorMessage)
      }
    }else {
      alert("Escreva o campo de email e password!")
    }
  }

  const handleSignUpMessageClick = () => {
    console.log("cliquei no sign up")
    navigation.reset({
      routes: [{name: 'SignUp'}]
    })
  }

  return (
    <Container>
      <Image
        source={require("../../assets/logo.png")}
      />
      <InputArea>
        <SignInput 
          IconSvg={EmailIcon}
          placeHolder="Digite o seu e-mail"   
          value={emailField}
          onChangeText={t=>setEmailField(t)}
          isPassword={false}
        />
        <SignInput 
          IconSvg={LockIcon}
          placeHolder="Digite a sua password"
          value={passwordField}
          onChangeText={t=>setPasswordField(t)}
          isPassword={true}
        />
        <CustomButton onPress={handleLoginClick} >
          <CustomButtonText>
            LOGIN
          </CustomButtonText>
        </CustomButton>
      </InputArea>

      <SignUpMessageButton onPress={handleSignUpMessageClick}>
        <SignUpMessageButtonText>
          Ainda não possui uma conta?
        </SignUpMessageButtonText>
        <SignUpMessageButtonTextBold>
          Registe-se
        </SignUpMessageButtonTextBold>
      </SignUpMessageButton>
    </Container>
  )
}