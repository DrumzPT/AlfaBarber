import React from 'react';
import styled from 'styled-components/native'

export const Container = styled.ScrollView`
  background-color: #777777;
  min-height: 100%;
`

export const Body = styled.View`
  background-color: #777777;
`

export const BookingItem = styled.View`
  background-color: #ffffff;
  border-radius: 10px;
  margin: 15px;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 30px;
  padding-bottom: 30px;
`

export const HeaderArea = styled.View`
  margin-top: 40px;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  align-content: center;
`
export const HeaderTitle = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #ffffff;
`

export const DateInfo = styled.View`
  flex-direction: row ;
`

export const DatePrevArea = styled.TouchableOpacity`
  flex: 1;
  justify-content: flex-end;
  align-items: flex-end;
`

export const DateTitleArea = styled.View`
  width: 140px;
  justify-content: center;
  align-items: center;
`

export const DateTitle = styled.Text`
  font-size: 17px;
  color: #000000;
  font-weight: bold ;
`

export const DateNextArea = styled.TouchableOpacity`
  flex: 1;
  align-items: flex-start;
`

export const DatePrevDisabledArea = styled.View`
  flex: 1;
`
export const DateList = styled.ScrollView``;


export const DateItem = styled.TouchableOpacity`
  width: 45px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
`

export const DateItemWeekDay = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

export const DateItemNumber = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

export const NoBookingsText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  text-align: center;
`

export const BarberInfo = styled.View`
  flex-direction: row ;
  justify-content: space-between; 
  padding-left: 20px;
  padding-right: 20px;
`

export const BarberName = styled.Text`
  font-size: 16px;
  font-weight: bold;
`

export const ServiceInfo = styled.View`
  justify-content: center; ;
  flex-direction: row ;
  justify-content: space-between;
  padding-left: 20px;
  padding-right: 20px;
`

export const ServiceDetails = styled.Text`
  font-size: 16px;
  font-weight: bold;
`
export const ServiceTime = styled.View`
  padding-left: 20px;
  padding-right: 20px;
  flex-direction: row;
  justify-content: space-between;
`

export const HourText = styled.Text`
  font-size: 16px;
  font-weight: bold;
`

export const HourTime = styled.Text`
  font-size: 16px;
  color: #000000;
  font-weight: bold;
`
