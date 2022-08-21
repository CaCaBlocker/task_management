import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import MainScreen from '../screens/MainScreen';
import NewTaskScreen from '../screens/NewTaskScreen';
import EditTaskScreen from "../screens/EditTaskScreen";
import ViewTaskScreen from '../screens/ViewTaskScreen';
import SearchScreen from "../screens/SearchScreen";

const Stack = createStackNavigator();
function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Main" component={MainScreen} options={{ headerShown: false, gestureEnabled: true }}/>
        <Stack.Screen name="NewTask" component={NewTaskScreen} options={{ headerShown: false, gestureEnabled: true }}/>
        <Stack.Screen name="EditTask" component={EditTaskScreen} options={{ headerShown: false, gestureEnabled: true }}/>
        <Stack.Screen name="ViewTask" component={ViewTaskScreen} options={{ headerShown: false, gestureEnabled: true }}/>
        <Stack.Screen name="SearchTask" component={SearchScreen} options={{ headerShown: false, gestureEnabled: true }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;

