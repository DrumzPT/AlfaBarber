import React, {useState, useEffect, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import {weekdaysSchedule} from '../const/index'
import { hoursToRemove, hasAvailableTimeForService } from '../utils/booking-utils'
import { UserContext } from "../contexts/UserContext";

import ExpandIcon from '../assets/expand.svg' 
import NavPrevIcon from '../assets/nav_prev.svg'
import NavNextIcon from '../assets/nav_next.svg'
import Api from '../Api';

import {
  Modal,
  ModalArea,
  ModalBody,
  CloseButton,
  ModalItem,
  BarberInfo,
  BarberAvatar,
  BarberName,
  ServiceInfo,
  ServiceName,
  ServicePrice,
  FinishButton,
  FinishButtonText,
  DateInfo,
  DatePrevArea,
  DateTitleArea,
  DateTitle,
  DateNextArea,
  DateList,
  DateItem,
  DateItemWeekDay,
  DateItemNumber,
  TimeList,
  TimeItem,
  TimeItemText
} from './booking-modal-styles'

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
  const { state } = useContext(UserContext)


  const [barberAvailability, setBarberAvailability] = useState()
  const [selectedYear, setSelectedYear] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedHour, setSelectedHour] = useState(null);
  const [listDays, setListDays] = useState([]);
  const [listHours, setListHours] = useState([])

  const handleFinishClick = async() => {
    if(selectedHour !== null && selectedDay !== 0 && selectedYear !== 0){
      const listOfHoursToRemove = hoursToRemove(selectedHour, barber.services[service].timeBlocks)
      console.log("listOfHoursToRemove: ", listOfHoursToRemove)
      console.log("tem disponibilidade: ", hasAvailableTimeForService(listOfHoursToRemove, listHours))
      
      if(hasAvailableTimeForService(listOfHoursToRemove, listHours)){
        let response = await Api.removeBarberAvailability(
          barber.id, selectedYear,selectedMonth +1, selectedDay, listOfHoursToRemove
        )
        if(response.success){
          removeBookedHoursClientSide(listOfHoursToRemove)
          await Api.setUserReservation(state.email, barber.services[service], barber.name, selectedYear, selectedMonth+1, selectedDay, selectedHour)
        }
        

        
      }else{
        alert('Não é possível reservar pois não existe tempo o suficiente disponível para a hora requisitada \n' +
          'Por favor escolha outra hora'
        )
      }
     
    }
  }

  const removeBookedHoursClientSide = (listOfHoursToRemove) => {
    setListHours(listHours.filter(hour => !listOfHoursToRemove.includes(hour)))
  }

  const getBarberAvailability = async () => {

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
        setListHours(response.result.data().hours)
      }
    }else{
      alert("Ocorreu um erro ao obter horas disponíveis, por favor tente mais tarde e caso o erro persista contacte-nos")
    }
  }

  useEffect(()=> {
    if(selectedDay !== 0)
      getBarberAvailability()
  }, [selectedDay, selectedMonth])

  useEffect(()=> {
    setSelectedHour(null)
  }, [selectedDay])

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
    setSelectedDay(0);
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
    setSelectedDay(0);
  }

  const handleRightDateClick = () => {
    let mountDate = new Date( selectedYear, selectedMonth, 1)
    mountDate.setMonth(mountDate.getMonth() + 1)
    setSelectedYear( mountDate.getFullYear())
    setSelectedMonth( mountDate.getMonth())
    setSelectedDay(0);
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
                  <DateItemWeekDay
                    style={{
                      color: item.number === selectedDay ? '#FFFFFF' : '#000000'
                    }}
                  >{item.weekday}</DateItemWeekDay>
                  <DateItemNumber
                    style={{
                        color: item.number === selectedDay ? '#FFFFFF' : '#000000'
                      }}
                  >{item.number}</DateItemNumber>
                </DateItem>
              ))}
            </DateList>
          </ModalItem>
          
          {listHours.length > 0 && 
            <ModalItem>
              <TimeList horizontal = {true} showsHorizontalScrollIndication={false}>
                {listHours.map((item, key)=>(
                  <TimeItem
                    key={key}
                    onPress={()=>setSelectedHour(item)}
                    style={{
                      backgroundColor: item === selectedHour ? '#4EADBE' : '#FFFFFF'
                    }}
                  >
                    <TimeItemText
                      style={{
                        color: item.number === selectedHour ? '#FFFFFF' : '#000000',
                        fontWeight: item === selectedHour ? 'bold' : 'normal'
                      }}
                    >{item}</TimeItemText>
                  </TimeItem>
                ))}
              </TimeList>
            </ModalItem>
          }
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