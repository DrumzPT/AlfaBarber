import React, { useEffect, useState } from 'react';
import { Image } from "react-native";
import Api from '../../Api';
import { Container, Scroller, HeaderArea, HeaderTitle, ListArea, LoadingIcon} from './styles'
import BarberItem from '../../components/BarberItem';

export default () => {

  const [barbers, setBarbers] = useState([])
  const [loading, setLoading] = useState(false)

  const getBarbers = async () => {
    setLoading(true)
    setBarbers([])
    let response = await Api.getBarbers()

    if(response.success){
      let fetchedBarbers = []
      response.result.forEach((doc) => {
        fetchedBarbers.push(doc.data())
      })
      if(fetchedBarbers.length === 0){
        alert("Erro ao obter barbeiros, por favor tente mais tarde, se o erro permanecer contacte-nos")
      }else{
        setBarbers(fetchedBarbers)
      }
    }else{
      alert("Erro ao obter barbeiros: ", response.errorMessage)
    }

    setLoading(false)
  }

  useEffect(() => {
    getBarbers()
  }, [])
  
  return(
    <Container>
    {console.log("dentro do render", barbers)}
      <Scroller>
        <HeaderArea>
          <HeaderTitle >
            AGENDAMENTO
          </HeaderTitle>

          <Image
            source={require("../../assets/logo.png")}
          />
        </HeaderArea>

        {loading &&
          <LoadingIcon size="large" color="#000" />
        }
        <ListArea>
          {barbers.map((item, k) => (
            <BarberItem key={k} data={item}/>
          ))}
        </ListArea>
      </Scroller>
    </Container>
  )
}