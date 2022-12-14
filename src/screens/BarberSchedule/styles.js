import React from 'react';
import styled from 'styled-components/native'

export const Container = styled.SafeAreaView`
  padding-top: 40px;
  flex: 1;
  background-color: #FFFFFF;
  justify-content: space-between;
  text-align: center;
  align-items: center
`

export const Scroller = styled.ScrollView`
  flex: 1;
  padding-left: 15%;
  padding-right: 15%;
  width: 100%;
`

export const HeaderArea = styled.View`
  justify-content: space-between;
  align-items: center;
  text-align: center;
  align-content: center;
`
export const HeaderTitle = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px
`

export const ListArea = styled.View`
  margin-top: 30px;
  margin-bottom: 30px;
`

export const LoadingIcon = styled.ActivityIndicator`
    margin-top: 200px;
    color: #000;
`;