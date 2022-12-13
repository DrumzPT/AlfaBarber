export const hoursToRemove = (startHour, timeBlocks) => {
  let arrayOfHoursToRemove = [startHour]
  for(let i = 1; i < timeBlocks; i++){
    let hourToPush =  arrayOfHoursToRemove[i-1]
    let hourSubPart = parseInt(hourToPush.substr(0,2))
    let minutesSubPart = parseInt(hourToPush.substr(3,5))

    if(minutesSubPart == 30){
      hourSubPart= hourSubPart +1
      minutesSubPart= '00'
    }else{
      minutesSubPart= '30'
    }
    hourSubPart < 10 ? hourSubPart = "0"+hourSubPart : `${hourSubPart}`
    hourToPush = `${hourSubPart}:${minutesSubPart}`

    arrayOfHoursToRemove.push(hourToPush)
  }
  return arrayOfHoursToRemove
}

export const hasAvailableTimeForService = (arrayOfHoursToRemove, arrayOfAvailableHours) => {
  return arrayOfHoursToRemove.every(hoursToRemove => arrayOfAvailableHours.includes(hoursToRemove))
}

export const sortServicesByTime = (services) => {
  return services.sort((a,b) => (a.hour > b.hour) ? 1 : ((b.hour > a.hour) ? -1 : 0))
}


export const months = [
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
export const days = [
  'Dom',
  'Seg',
  'Ter',
  'Qua',
  'Qui',
  'Sex',
  'Sab'
]