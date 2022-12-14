import React, {useContext} from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import CustomTabBar from "../components/CustomTabBar";
import Schedule from '../screens/Schedule';
import UserBookings from '../screens/UserBookings';
import BarberSchedule from '../screens/BarberSchedule';
import { UserContext } from '../contexts/UserContext';

const Tab = createBottomTabNavigator();

export default () => {
  const { state } = useContext(UserContext)
  return(
    <Tab.Navigator tabBar={props=><CustomTabBar {...props}/>}     
      screenOptions={{
        headerShown: false
    }}>
      <Tab.Screen name="Schedule" component={Schedule}/>
      <Tab.Screen name="UserBookings" component={state.email === "alfabarberapp@gmail.com"? BarberSchedule : UserBookings}/>
      <Tab.Screen name="Profile" component={NullComponent}/>
    </Tab.Navigator>
  )
}

const NullComponent = () => (
  <>
  </>
)