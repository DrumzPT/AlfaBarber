import React from "react";
import styled from "styled-components/native";

const InputArea = styled.View`
  width: 100%;
  height: 60px;
  background-color: #666666;
  flex-direction: row ;
  border-radius: 30px ;
  padding-left: 15px ;
  align-items: center ;
  margin-bottom: 15px ;
  padding-right: 15px ;
`

const Input = styled.TextInput`
  flex: 1;
  font-size: 16px;
  color: #dddddd;
  margin-left: 10px;
`;

export default ({IconSvg, placeHolder, value, onChangeText, isPassword }) => {
  return (
    <InputArea>
      <IconSvg width="24" height="24" fill="#dddddd"/>
      <Input 
        placeholder={placeHolder}
        placeholderTextColor={"#dddddd"}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={isPassword}
      />
    </InputArea>
  )
}