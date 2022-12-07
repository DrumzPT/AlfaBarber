export const initialState = {
  name: '',
  email: '',
  bookings: [],
  history: []
}

export const UserReducer = (state, action) => {
  switch(action.type){
    case 'setName':
      return {...state, name: action.payload.name, email: action.payload.email};
    default:
      return state;
  }
} 