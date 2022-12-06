import React, {useState, useEffect } from 'react';
import styled from 'styled-components/native'
import { useNavigation } from '@react-navigation/native';
import {weekdaysSchedule} from '../const/index'

import ExpandIcon from '../assets/expand.svg' 
import NavPrevIcon from '../assets/nav_prev.svg'
import NavNextIcon from '../assets/nav_next.svg'
import Api from '../Api';

const Modal = styled.Modal``

const ModalArea = styled.View`
  flex: 1;
  justify-content: flex-end;
  background-color: rgba(0,0,0,0.4);
`

const ModalBody = styled.View`
  background-color: #83d6e3;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  min-height: 300px;
  padding: 10px 20px 40px 20px;
`

const CloseButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
`

const ModalItem = styled.View`
  background-color: #ffffff;
  border-radius: 10px;
  margin-bottom: 15px;
  padding: 10px;
`

const BarberInfo = styled.View`
  flex-direction: row;
  align-items: center ;
`

const BarberAvatar= styled.Image`
  width: 56px ;
  height: 56px ;
  border-radius: 20px;
  margin-right: 15px ;
`

const BarberName = styled.Text`
  color: #000000;
  font-size: 18px ;
  font-weight: bold;
`

const ServiceInfo = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const ServiceName = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;
const ServicePrice = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

const FinishButton = styled.TouchableOpacity`
  background-color: #268596;
  height: 60px ;
  justify-content: center;
  align-items: center ;
  border-radius: 10px;
`

const FinishButtonText = styled.Text`
  color: #ffffff;
  font-size: 17px;
  font-weight: bold;
`

const DateInfo = styled.View`
  flex-direction: row ;
`

const DatePrevArea = styled.TouchableOpacity`
  flex: 1;
  justify-content: flex-end;
  align-items: flex-end;
`

const DateTitleArea = styled.View`
  width: 140px;
  justify-content: center;
  align-items: center;
`

const DateTitle = styled.Text`
  font-size: 17px;
  color: #000000;
  font-weight: bold ;
`

const DateNextArea = styled.TouchableOpacity`
  flex: 1;
  align-items: flex-start;
`

const DateList = styled.ScrollView``;


const DateItem = styled.TouchableOpacity`
  width: 45px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
`

const DateItemWeekDay = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

const DateItemNumber = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

const months = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro'
];
const days = [
  'Dom',
  'Seg',
  'Ter',
  'Qua',
  'Qui',
  'Sex',
  'Sab'
]

export default ({show, setShowModal, barber, service}) => {
  const navigation = useNavigation();

  const [barberAvailability, setBarberAvailability] = useState()
  const [selectedYear, setSelectedYear] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedHour, setSelectedHour] = useState(null);
  const [listDays, setListDays] = useState([]);
  const [listHours, setListHours] = useState([])

  const getBarberAvailability = async () => {
    console.log("A correr Barber Availabilty")

    let d = new Date(selectedYear, selectedMonth, selectedDay)
    let year = d.getFullYear();
    let month = d.getMonth() + 1;
    let day = d.getDate();
    let selDate = year+'-'+month+'-'+day;

    let response = await Api.getBarberAvailability(barber.id, selDate)
    
    if(response.success){
      if(response.result === "created"){
        setListHours(weekdaysSchedule)
      }else{
        setListHours("data:", response.result.data().hours)
      }
    }
  }

  useEffect(()=> {
    if(selectedDay !== 0)
      getBarberAvailability()
  }, [selectedDay, selectedMonth])

  useEffect(()=> {
    let daysInMonth = new Date(selectedYear, selectedMonth +1, 0).getDate();
    let newListDays = [];

    for(let i=1; i<= daysInMonth; i++){
      let d = new Date(selectedYear, selectedMonth, i)

      newListDays.push({
        weekday: days[d.getDay()],
        number: i
      })
    }

    setListDays(newListDays)
    setSelectedDay(new Date().getDate());
    setListHours([]);
    setSelectedHour(0);
  }, [selectedMonth, selectedYear])

  useEffect(()=> {
    let today = new Date();
    setSelectedYear ( today.getFullYear());
    setSelectedMonth ( today.getMonth() );
  }, [])
  
  const handleLeftDateClick = () => {
    let mountDate = new Date( selectedYear, selectedMonth, 1)
    mountDate.setMonth(mountDate.getMonth() -1)
    setSelectedYear( mountDate.getFullYear())
    setSelectedMonth( mountDate.getMonth())
    setSelectedDay(1);
  }

  const handleRightDateClick = () => {
    let mountDate = new Date( selectedYear, selectedMonth, 1)
    mountDate.setMonth(mountDate.getMonth() + 1)
    setSelectedYear( mountDate.getFullYear())
    setSelectedMonth( mountDate.getMonth())
    setSelectedDay(1);
  }

  const handleFinishClick = () => {

  }

  const handleCloseButton = () => {
    setShowModal(false)
  }

  return(
    <Modal
      transparent={true}
      visible={show}
      animationType="slide"
    >
      <ModalArea>
        <ModalBody>
          <CloseButton onPress={handleCloseButton}>
            <ExpandIcon width="40" height ="40" fill="#000000"/>
          </CloseButton>
          <ModalItem>
            <BarberInfo>
              <BarberAvatar source={{uri: barber.avatar}}/>
              <BarberName>
                {barber.name}
              </BarberName>
            </BarberInfo>
          </ModalItem>
          
          {service != null &&
          <ModalItem>
            <ServiceInfo>
              <ServiceName>{barber.services[service].name}</ServiceName>
              <ServicePrice>{barber.services[service].price}€</ServicePrice>
            </ServiceInfo>
          </ModalItem>
          }

          <ModalItem>
            <DateInfo>
              <DatePrevArea onPress={handleLeftDateClick}>
                <NavPrevIcon width="35" height="35" fill="#000000"/>
              </DatePrevArea>
              <DateTitleArea>
                <DateTitle>{months[selectedMonth]} {selectedYear}</DateTitle>
              </DateTitleArea>
              <DateNextArea onPress={handleRightDateClick}>
                <NavNextIcon width="35" height="35" fill="#000000"/>
              </DateNextArea>
            </DateInfo>
            <DateList horizontal={true} showsHorizontalScrollIndication={false}>
              {listDays.map((item, key)=>(
                <DateItem 
                  key={key}
                  onPress={()=>{setSelectedDay(item.number)}}
                  style={{
                    backgroundColor: item.number === selectedDay ? '#4EADBE' : '#FFFFFF'
                  }}
                >
                  <DateItemWeekDay>{item.weekday}</DateItemWeekDay>
                  <DateItemNumber>{item.number}</DateItemNumber>
                </DateItem>
              ))}
            </DateList>
          </ModalItem>

          <FinishButton onPress={handleFinishClick}>
            <FinishButtonText>
              Finalizar Agendamento
            </FinishButtonText>
          </FinishButton>
        </ModalBody>
      </ModalArea>
    </Modal>
  )
}