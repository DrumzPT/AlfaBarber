import React, {useState, useEffect} from 'react';
import { Text } from 'react-native'
import { useNavigation, useRoute} from "@react-navigation/native"
import {
  Container,
  Scroller,
  BarberPhoto,
  PageBody,
  UserInfoArea,
  UserInfo,
  UserInfoName,
  ServiceArea,
  UserAvatar,
  BackButton
} from './styles'

import BackIcon from '../../assets/back.svg'

export default () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [userInfo, setUserInfo] = useState({
    id: route.params.id,
    avatar: route.params.avatar,
    name: route.params.name
  })

  const handleBackButton = () => {
    navigation.goBack()
  }

  return(
    <Container>
      <Scroller>
        <BarberPhoto source={{uri: userInfo.avatar}}/>
        <PageBody>
          <UserInfoArea>
            <UserAvatar source={{uri: userInfo.avatar}}/>
            <UserInfo>
              <UserInfoName>
                {userInfo.name}
              </UserInfoName>
            </UserInfo>
          </UserInfoArea>
          <ServiceArea>

          </ServiceArea>
        </PageBody>
      </Scroller>
      <BackButton onPress={handleBackButton}>
        <BackIcon width="44" height="44" fill="#FFFFFF" />
      </BackButton>
    </Container>
  )
}