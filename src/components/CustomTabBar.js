import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';

import ScrollIcon from '../assets/scroll.svg';
import TodayIcon from '../assets/today.svg';
import AccountIcon from '../assets/account.svg';


const TabArea = styled.View`
  height: 60px;
  background-color: #4EADBE;
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

    const goTo = (screenName) => {
        navigation.navigate(screenName);
    }

    return (
        <TabArea>
            <TabItem onPress={()=>goTo('Schedule')}>
              <TodayIcon style={{opacity: state.index===0? 1 : 0.5}} width="24" height="24" fill="#FFFFFF"  />
              <TabText>Agendar</TabText>
            </TabItem>
            <TabItem onPress={()=>goTo('CutHistory')}>
              <ScrollIcon style={{opacity: state.index===1? 1 : 0.5}} width="24" height="24" fill="#FFFFFF"  />
              <TabText>Histórico</TabText>
            </TabItem>
            <TabItem onPress={()=>goTo('Profile')}>
              <AccountIcon style={{opacity: state.index===2? 1 : 0.5}} width="24" height="24" fill="#FFFFFF" />
              <TabText>Profile</TabText>
            </TabItem>
        </TabArea>
    );
}