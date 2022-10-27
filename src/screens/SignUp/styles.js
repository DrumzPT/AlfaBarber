import React from "react";
import styled from "styled-components/native"

export const Container = styled.SafeAreaView`
  background-color: #111111;
  flex: 1;
  justify-content: center;
  align-items: center ;
`;

export const InputArea = styled.View`
  padding: 40px;
  width: 100%;
`

export const CustomButton = styled.TouchableOpacity`
  height: 60px;
  background-color: #777777;
  border-radius: 30px;
  justify-content: center ;
  align-items: center;
`
export const CustomButtonText = styled.Text`
  font-size: 18px;
  color: #FFF
`

export const SignUpMessageButton = styled.TouchableOpacity`
  flex-direction: row ;
  justify-content: center ;
  margin-top: 50px ;
  margin-bottom: 20px ;
`
export const SignUpMessageButtonText = styled.Text`
  font-size: 16px;
  color: #bbbbbb;
`
export const SignUpMessageButtonTextBold = styled.Text`
  font-size: 16px;
  color: #bbbbbb;
  font-weight: bold;
  margin-left: 5px;
`