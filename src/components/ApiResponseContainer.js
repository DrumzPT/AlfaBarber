import React from 'react';
import {View} from 'react-native';
import styled from 'styled-components/native'

export default ({message, isError = false}) => {

  const ApiResponseSuccess = styled.View`
    background-color: #6ff484;
    border-width: 3px;
    border-color: #1fb136;
    margin-bottom: 15px;
    align-items: center ;
    padding: 10px;
  `

  const ApiResponseError = styled.View`
    background-color: #f46f6f;
    border-width: 3px;
    border-color: #d32323;
    margin-bottom: 15px;
    align-items: center ;
    padding: 10px;
  `

  const ApiText = styled.Text`
    color: #000000;
    font-size: 18px ;
  `

  return(
    <View>
      {isError ?
        <ApiResponseError>
          <ApiText>
            {message}
          </ApiText>
        </ApiResponseError>
      :
      <ApiResponseSuccess>
        <ApiText>
          {message}
        </ApiText>
      </ApiResponseSuccess>
      }
    </View>
  )

}