import React from 'react';
import { Button, Text } from 'react-native'
import Api from '../../Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Container } from './styles'

export default () => {
  const navigation = useNavigation()

  const handleLogoutClick = async () => {
    let result = await Api.signOff()
    if(result.success){
      AsyncStorage.removeItem("email")
      AsyncStorage.removeItem('password');
      navigation.reset({routes:[{name:'SignIn'}]})
    }
  }

  return(
    <Container>
      <Text>Perfil</Text>
      <Button title="Sair" onPress={handleLogoutClick} />
    </Container>
  )
}