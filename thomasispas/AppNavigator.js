
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Choose from './screens 1/Choose';
import MLogin from './screens 1/MLogin';
import WLogin from './screens 1/WLogin';

import MChat from './screens 1/MChat';
import MDash from './screens 1/MDash';
import WDash from './screens 1/WDash';
import ShiftManagement from './screens 1/ShiftManagement';
import StockManagement from './screens 1/StockManagement';


const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator  screenOptions={{headerShown: false}}>
     
      <Stack.Screen name="Choose" component={Choose} />
      <Stack.Screen name="MLogin" component={MLogin} />
      <Stack.Screen name="WLogin" component={WLogin} /> 
      <Stack.Screen name="WDash" component={WDash} />
      <Stack.Screen name="MDash" component={MDash} />
      <Stack.Screen name="MChat" component={MChat} />
      <Stack.Screen name="ShiftManagement" component={ShiftManagement} />
      <Stack.Screen name="StockManagement" component={StockManagement} />
   
    </Stack.Navigator>
  );
}


