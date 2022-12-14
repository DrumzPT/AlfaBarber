import React from 'react';
import styled from 'styled-components/native';

import ScrollIcon from '../assets/scroll.svg';
import TodayIcon from '../assets/today.svg';
import LogoutIcon from '../assets/logout.svg';

import Api from '../Api';
import AsyncStorage from '@react-native-async-storage/async-storage';


const TabArea = styled.View`
  height: 60px;
  background-color: #0047AB;
  flex-direction: row;
`;
const TabItem = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const TabText = styled.Text`
  color: #FFFFFF
`

export default ({ state, navigation }) => {

  const handleLogoutClick = async () => {
    let result = await Api.signOff()
    if(result.success){
      AsyncStorage.removeItem("email")
      AsyncStorage.removeItem('password');
      navigation.reset({routes:[{name:'SignIn'}]})
    }
  }

  const goTo = (screenName) => {
    navigation.navigate(screenName);
  }

  return (
    <TabArea>
      <TabItem onPress={()=>goTo('Schedule')}>
        <TodayIcon style={{opacity: state.index===0? 1 : 0.5}} width="24" height="24" fill="#FFFFFF"  />
        <TabText>Agendar</TabText>
      </TabItem>
      <TabItem onPress={()=>goTo('UserBookings')}>
        <ScrollIcon style={{opacity: state.index===1? 1 : 0.5}} width="24" height="24" fill="#FFFFFF"  />
        <TabText>Agendamentos</TabText>
      </TabItem>
      <TabItem onPress={()=>handleLogoutClick()}>
        <LogoutIcon style={{opacity: state.index===2? 1 : 0.5}} width="24" height="24" fill="#FFFFFF" />
        <TabText>Sair da Conta</TabText>
      </TabItem>
    </TabArea>
  );
}