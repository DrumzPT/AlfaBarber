import React from 'react';
import styled from 'styled-components/native'

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #FFF ;
`

export const Scroller = styled.ScrollView`
  flex:1;
`

export const BarberPhoto = styled.Image`
  flex: 1;
  width: 100%;
  height: 240px;
`

export const PageBody = styled.View`
  background-color: #FFF;
  border-top-left-radius: 50px;
  margin-top: -50px;
  min-height: 400px ;
`

export const UserInfo = styled.View`
  margin-top: 40px;
  flex: 1;
`


export const UserInfoArea = styled.View`
  flex-direction: row;
  margin-top: -20px;
`

export const UserAvatar = styled.Image`
  width: 110px;
  height: 110px;
  border-radius: 20px;
  margin-left: 30px;
  margin-right: 20px;
  border-width: 4px;
  border-color: #FFF;
`

export const UserInfoName = styled.Text`
  color: #000000;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px
`

export const ServiceArea = styled.View``

export const BackButton = styled.TouchableOpacity`
  position: absolute;
  left: 0;
  top: 30;
  z-index: 9;
`
// Scroller,
// PageBody,
// UserInfoArea,
// ServiceArea
