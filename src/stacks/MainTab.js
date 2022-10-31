import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import CustomTabBar from "../components/CustomTabBar";
import Schedule from '../screens/Schedule';
import Profile from '../screens/Profile';
import CutHistory from '../screens/CutHistory';

const Tab = createBottomTabNavigator();

export default () => (
  <Tab.Navigator tabBar={props=><CustomTabBar {...props}/>}     
    screenOptions={{
      headerShown: false
  }}>
    <Tab.Screen name="Schedule" component={Schedule}/>
    <Tab.Screen name="CutHistory" component={CutHistory}/>
    <Tab.Screen name="Profile" component={Profile}/>
  </Tab.Navigator>
)