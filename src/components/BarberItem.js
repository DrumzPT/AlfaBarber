import React from 'react'
import styled from 'styled-components/native'

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

export default (({data}) => {
  return (
    <Area>
      <Avatar source={{uri: data.foto}} />
      <InfoArea>
        <UserName>{data.name}</UserName>

        <SelectBarberButton>
          <SelectBarberButtonText>
            Selecionar
          </SelectBarberButtonText>
        </SelectBarberButton>
      </InfoArea>
    </Area>
  )
})