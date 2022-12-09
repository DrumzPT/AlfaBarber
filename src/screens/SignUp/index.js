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

import PersonIcon from '../../assets/person.svg'
import EmailIcon from '../../assets/email.svg'
import LockIcon from '../../assets/lock.svg'

import SignInput from "../../components/SignInput";

export default () => {

  const { dispatch: userDispatch } = useContext(UserContext)
  const navigation = useNavigation()

  const [nameField, setNameField] = useState('')
  const [emailField, setEmailField] = useState('')
  const [passwordField, setPasswordField] = useState('')

  const handleLoginClick = async () => {
    if(emailField != '' && passwordField != '' && nameField != ''){
      let response = await Api.signUp(emailField, passwordField )
      if(response.success){
        alert("Registo efectuado com sucesso")
        await Api.updateUser(nameField)
        await AsyncStorage.setItem('password', passwordField)
        await AsyncStorage.setItem('email', emailField)

        userDispatch({
          type: 'setName',
          payload: {
            name: nameField,
            email: emailField
          }
        })

        navigation.reset({
          routes:[{name:'MainTab'}]
        })
      }else{
        alert(response.errorMessage)
      }
    }else {
      alert("Por favor preencha todos os campos")
    }
  }

  const handleSignUpMessageClick = () => {
    navigation.reset({
      routes: [{name: 'SignIn'}]
    })
  }

  return (
    <Container>
      <Image
        source={require("../../assets/logo.png")}
      />
      <InputArea>
      <SignInput 
          IconSvg={PersonIcon}
          placeHolder="Digite o seu nome"   
          value={nameField}
          onChangeText={t=>setNameField(t)}
          isPassword={false}
        />
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
            Registar
          </CustomButtonText>
        </CustomButton>
      </InputArea>

      <SignUpMessageButton onPress={handleSignUpMessageClick}>
        <SignUpMessageButtonText>
          Já possui uma conta?
        </SignUpMessageButtonText>
        <SignUpMessageButtonTextBold>
          Faça Login
        </SignUpMessageButtonTextBold>
      </SignUpMessageButton>
    </Container>
  )
}