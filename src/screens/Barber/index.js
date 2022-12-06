import React, {useState, useEffect} from 'react';
import { useNavigation, useRoute} from "@react-navigation/native"
import BookingModal from '../../components/BookingModal'
import {
  Container,
  Scroller,
  BarberPhoto,
  PageBody,
  BarberInfoArea,
  BarberInfo,
  BarberInfoName,
  BarberAvatar,
  BackButton,
  ServicesArea,
  ServicesTitle,
  ServiceItem,
  ServiceInfo,
  ServiceName,
  ServicePrice,
  ServiceChooseButton,
  ServiceChooseBtnText
} from './styles'

import BackIcon from '../../assets/back.svg'
import Api from '../../Api';

export default () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [barberInfo, setbarberInfo] = useState({
    id: route.params.id,
    avatar: route.params.avatar,
    name: route.params.name,
    services: []
  })
  const [selectedService, setSelectedService] = useState(null);
  const [showModal, setShowModal] = useState(false)

  useEffect(()=> {
    const getServices = async () => {
      let response = await Api.getServices()
      console.log(response)

      if(response.success){
        let fetchedServices = []
        response.result.forEach((doc) => {
          fetchedServices.push(doc.data())
        })
        if(fetchedServices.length === 0){
          alert("Erro ao obter Serviços, por favor tente mais tarde, se o erro permanecer contacte-nos")
        }else{
          setbarberInfo({...barberInfo, services: fetchedServices})
        }
      }else{
        alert("Erro ao obter Serviços: ", response.errorMessage)
      }
  
    }
    getServices();
  }, [])

  const handleBackButton = () => {
    navigation.goBack()
  }

  const handleServiceChoose = (item,key) => {
    console.log("id do barbeiro", barberInfo.id)
    console.log(key)
    console.log(item)
    setSelectedService(key)
    setShowModal(true)
  }

  return(

    <Container>
      <Scroller>
        <BarberPhoto source={{uri: barberInfo.avatar}}/>
        <PageBody>
          <BarberInfoArea>
            <BarberAvatar source={{uri: barberInfo.avatar}}/>
            <BarberInfo>
              <BarberInfoName>
                {barberInfo.name}
              </BarberInfoName>
            </BarberInfo>
          </BarberInfoArea>
          <ServicesArea>
            <ServicesTitle>Lista de Serviços</ServicesTitle>
            {barberInfo.services
              .filter(item => item.providers.length === 0 || item.providers.includes(barberInfo.name))
              .map((item, key)=>(
              <ServiceItem key={key}>
                <ServiceInfo>
                  <ServiceName>{item.name}</ServiceName>
                  <ServicePrice>{item.price}€</ServicePrice>
                </ServiceInfo>
                <ServiceChooseButton onPress={()=> handleServiceChoose(item, key)}>
                  <ServiceChooseBtnText>Agendar</ServiceChooseBtnText>
                </ServiceChooseButton>
              </ServiceItem>
            ))}
          </ServicesArea>
        </PageBody>
      </Scroller>
      <BackButton onPress={handleBackButton}>
        <BackIcon width="44" height="44" fill="#FFFFFF" />
      </BackButton>
      <BookingModal
        show={showModal}
        setShowModal={setShowModal}
        barber={barberInfo}
        service={selectedService}
      />
    </Container>
  )
}