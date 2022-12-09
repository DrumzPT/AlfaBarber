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

export const BarberInfo = styled.View`
  margin-top: 40px;
  flex: 1;
`


export const BarberInfoArea = styled.View`
  flex-direction: row;
  margin-top: -20px;
`

export const BarberAvatar = styled.Image`
  width: 110px;
  height: 110px;
  border-radius: 20px;
  margin-left: 30px;
  margin-right: 20px;
  border-width: 4px;
  border-color: #FFF;
`

export const BarberInfoName = styled.Text`
  color: #000000;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px
`

export const BackButton = styled.TouchableOpacity`
  position: absolute;
  left: 0px;
  top: 30px;
  z-index: 9;
`
export const ServicesArea = styled.View`
  margin-top: 30px;
`

export const ServicesTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-left: 30px;
  margin-bottom: 20px;
`

export const ServiceItem = styled.View`
  flex-direction: row;
  margin-left: 30px;
  margin-right: 30px;
  margin-bottom: 30px;
`

export const ServiceInfo = styled.View`
  flex: 1;
`

export const ServiceName = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #000000
`

export const ServicePrice = styled.Text`
  font-size: 14px;
  color: #000000
`

export const ServiceTime = styled.Text`
  font-size: 14px;
  color: #000000
`

export const ServiceChooseButton = styled.TouchableOpacity`
  justify-content: center;
  border-radius: 10px;
  background-color: #4EADBE;
  padding: 10px 15px;
`

export const ServiceChooseBtnText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #FFF
`
