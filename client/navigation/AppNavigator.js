import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack'
import Auth from '../screens/Auth';
import SingleRecipe from '../screens/SingleRecipe'


import MainTabNavigator from './MainTabNavigator';

const AuthNavigator = createStackNavigator({
  Login: Auth
})




export default createAppContainer(
  createSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Log: AuthNavigator,
    Main: MainTabNavigator,
  


  })
);
