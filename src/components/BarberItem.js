import React, { useEffect, useState,useContext } from 'react'
import Api from '../Api'
import styled from 'styled-components/native'
import { useNavigation } from '@react-navigation/native'
import { UserContext } from "../contexts/UserContext"

const Area = styled.TouchableOpacity`
  background-color: #777777;
  margin-bottom: 20px;
  border-radius: 20px;
  padding: 15px;
  flex-direction: row;
`

const Avatar = styled.Image`
  width: 88px;
  height: 88px;
  border-radius: 20px;
`

const InfoArea = styled.View`
  margin-left: 20px ;
  justify-content: space-between;
`

const UserName = styled.Text`
  color: #ffffff;
  font-size: 17px;
  font-weight: bold;
`

const SelectBarberButton = styled.View`
  width: 105px;
  height: 26px;
  border: 1px solid #ffffff;
  border-radius: 10px;
  justify-content: center ;
  align-items: center ;
`

const SelectBarberButtonText = styled.Text`
  font-size: 13px;
  color: #ffffff;
`

export default (({BarberSnapshot}) => {
  const { state: userState } = useContext(UserContext)

  const navigation = useNavigation()

  const [picUrl, setPicUrl] = useState('')

  const getPicUrl = async () => {
    const url = await Api.getBarberPic(BarberSnapshot.data.foto)
    setPicUrl(url.result)
  }

  useEffect(() => {
    getPicUrl()
  }, [])

  const handleClick = () => {
    navigation.navigate('Barber', {
      id: BarberSnapshot.id,
      avatar: picUrl,
      name: BarberSnapshot.data.name
    })
  }

  return (
    <Area onPress={handleClick}>
      {picUrl !== '' ? <Avatar source={{uri: picUrl}}/> : <Avatar />}
      <InfoArea>
        <UserName>{BarberSnapshot.data.name}</UserName>

        <SelectBarberButton>
          <SelectBarberButtonText>
            Selecionar
          </SelectBarberButtonText>
        </SelectBarberButton>
      </InfoArea>
    </Area>
  )
})