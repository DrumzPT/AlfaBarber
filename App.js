// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';

import UserContextProvider from './src/contexts/UserContext';
import MainStack from './src/stacks/MainStack'

import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyAldVS063ATeVDSDsC3hV8Ddw2Wz5WQC4s",
  authDomain: "alfabarber-a0012.firebaseapp.com",
  projectId: "alfabarber-a0012",
  storageBucket: "alfabarber-a0012.appspot.com",
  messagingSenderId: "199621609370",
  appId: "1:199621609370:web:b59d05975d23aa57119c23",
  measurementId: "G-QYHNV5X1ER"
};

const app = initializeApp(firebaseConfig);

export default () => (
  <UserContextProvider>
    <NavigationContainer>
      <MainStack/>
    </NavigationContainer>
  </UserContextProvider>
)