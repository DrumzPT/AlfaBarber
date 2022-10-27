export const initialState = {
  name: '',
  bookings: [],
  history: []
}

export const UserReducer = (state, action) => {
  switch(action.type){
    case 'setName':
      return {...state, name: action.payload.name};
      break;
    default:
      return state;
  }
} 