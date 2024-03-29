import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Preload from "../screens/Preload";
import SignIn from "../screens/SignIn";
import SignUp from "../screens/SignUp";
import MainTab from "../stacks/MainTab";
import Barber from "../screens/Barber";
import BackOffice from "../screens/BackOffice";
import BarberBookings from "../screens/BarberBookings";

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator
    initialRouteName="Preload"
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="Preload" component={Preload} />
    <Stack.Screen name="SignIn" component={SignIn} />
    <Stack.Screen name="SignUp" component={SignUp} />
    <Stack.Screen name="MainTab" component={MainTab} />
    <Stack.Screen name="Barber" component={Barber} />
    <Stack.Screen name="BarberBookings" component={BarberBookings} />
    <Stack.Screen name="BackOffice" component={BackOffice} />
  </Stack.Navigator>
);
