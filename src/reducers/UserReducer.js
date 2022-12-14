export const initialState = {
  name: '',
  email: '',
  phoneNumber: '',
  bookings: [],
  history: []
}

export const UserReducer = (state, action) => {
  switch(action.type){
    case 'setName':
      return {...state, name: action.payload.name, email: action.payload.email, phoneNumber: action.payload.phoneNumber};
    default:
      return state;
  }
} 