import React, { useState, useEffect } from 'react';
import Api from '../../Api';
import { Container } from './styles'
import { useRoute} from "@react-navigation/native"

import NavPrevIcon from '../../assets/nav_prev.svg'
import NavNextIcon from '../../assets/nav_next.svg'

import {months, days, sortServicesByTime} from '../../utils/booking-utils'

import {
  HeaderArea,
  HeaderTitle,
  DateInfo,
  Body,
  DatePrevArea,
  DatePrevDisabledArea,
  DateTitleArea,
  DateTitle,
  DateNextArea,
  DateList,
  DateItem,
  DateItemNumber,
  DateItemWeekDay,
  BookingItem,
  NoBookingsText,
  BarberInfo,
  BarberName,
  ServiceInfo,
  ServiceDetails,
  ServiceTime,
  HourText,
  HourTime,
  ClientPhoneInfo,
  ClientPhone
} from './styles'

export default () => {

  const route = useRoute();

  const [selectedYear, setSelectedYear] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [selectedDay, setSelectedDay] = useState(0);
  const [listDays, setListDays] = useState([])
  const [listOfBookedDays, setListOfBookedDays] = useState([])
  const [listOfServices, setListOfServices] = useState([])

  const getBarberBooking = async () => {
    console.log("Get BarberBookings")
    const result = await Api.getBarberBookingDays(route.params.id, selectedMonth + 1, selectedYear)
    console.log("result: ", result)
    setListOfBookedDays(result)
  }

  const showPrevDate = () => {
    let mountDate = new Date( selectedYear, selectedMonth, 1)
    let today = new Date()
    return mountDate > today
  }

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

  const handleSelectDay = async (day) => {
    setSelectedDay(day)
    const result = await Api.getBarberBookingsByDay(route.params.id, selectedMonth + 1, selectedYear, day)
    const sortedServices= sortServicesByTime(result)
    setListOfServices(sortedServices)
  }

  useEffect(()=> {
    let daysInMonth = new Date(selectedYear, selectedMonth +1, 0).getDate();
    let newListDays = [];
    const today = new Date()

    for(let i=1; i<= daysInMonth; i++){
      let d = new Date(selectedYear, selectedMonth, i)

      if(d > today){
        newListDays.push({
          weekday: days[d.getDay()],
          number: i
        })
      }
    }

    setListOfServices([])
    setListDays(newListDays)
    setSelectedDay(0);

    if(selectedYear !== 0)
      getBarberBooking()
    
  }, [selectedMonth, selectedYear])

  useEffect(()=> {
    let today = new Date();
    setSelectedYear ( today.getFullYear());
    setSelectedMonth ( today.getMonth() );
  }, [])

  return(
    <Container>
      <HeaderArea>
        <HeaderTitle >
          Lista de Agendamentos para {`${route.params.name}`}
        </HeaderTitle>
      </HeaderArea>
      <Body>
        <BookingItem>
          <DateInfo>
            { showPrevDate() ?
              <DatePrevArea onPress={handleLeftDateClick}>
                <NavPrevIcon width="35" height="35" fill="#000000"/>
              </DatePrevArea>
              :
              <DatePrevDisabledArea/>
            }
            <DateTitleArea>
              <DateTitle>{months[selectedMonth]} {selectedYear}</DateTitle>
            </DateTitleArea>
            <DateNextArea onPress={handleRightDateClick}>
              <NavNextIcon width="35" height="35" fill="#000000"/>
            </DateNextArea>
          </DateInfo>

          <DateList 
            horizontal={true}
            showsHorizontalScrollIndication={false}
            contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            {listOfBookedDays.length !== 0 && listDays.filter((item) => listOfBookedDays.includes(item.number)).map((item, key)=>(
              <DateItem 
                key={key}
                onPress={()=>{listOfBookedDays.includes(item.number) && handleSelectDay(item.number)}}
                style={{
                  backgroundColor: item.number === selectedDay ? '#0047AB' : '#FFFFFF'
                }}
              >
                <DateItemWeekDay
                  style={{
                    opacity: listOfBookedDays.includes(item.number) ? 1 : 0.5,
                    color: item.number === selectedDay ? '#FFFFFF' : '#000000'
                  }}
                >{item.weekday}</DateItemWeekDay>
                <DateItemNumber
                  style={{
                      opacity: listOfBookedDays.includes(item.number) ? 1 : 0.5,
                      color: item.number === selectedDay ? '#FFFFFF' : '#000000'
                    }}
                >{item.number}</DateItemNumber>
              </DateItem>
            ))}
          </DateList>
        </BookingItem>

        {
          listOfBookedDays.length === 0 && selectedYear !== 0 &&
          <BookingItem>
            <NoBookingsText>
              Não existem reservas para este mês
            </NoBookingsText>
          </BookingItem>
        }

        { listOfServices.length !== 0 && 
          listOfServices.map((item, key) => (
          <BookingItem key={key}>
          {console.log("item",item)}
            <BarberInfo>
              <BarberName>Cliente: </BarberName>
              <BarberName>{item.clientName}</BarberName>
            </BarberInfo>
            <ClientPhoneInfo>
              <ClientPhone>Telemóvel: </ClientPhone>
              <ClientPhone>{item.clientPhoneNumber}</ClientPhone>
            </ClientPhoneInfo>
            <ServiceInfo>
              <ServiceDetails>Serviço: {item.serviceName}</ServiceDetails>
              <ServiceDetails>Preço: {item.servicePrice} €</ServiceDetails>
            </ServiceInfo>
            <ServiceTime>
              <HourText>Hora: </HourText>
              <HourTime> {item.hour}</HourTime>
            </ServiceTime>
          </BookingItem>
          ))
        }
        
      </Body>
    </Container>
  )
}