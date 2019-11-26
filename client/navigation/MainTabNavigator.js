import React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";

// import TabBarIcon from '../components/TabBarIcon'
// import HomeScreen from '../screens/HomeScreen'
// import LinksScreen from '../screens/LinksScreen'
// import SettingsScreen from '../screens/SettingsScreen'

import Fridge from "../screens/Fridge";
import Recipes from "../screens/Recipes";
import UserProfile from "../screens/UserProfile";
import CameraScanner from "../screens/CameraScanner";

const config = Platform.select({
  web: { headerMode: "screen" },
  default: {}
});

const CameraStack = createStackNavigator(
  {
    Camera: CameraScanner
  },
  config
);

CameraStack.navigationOptions = {
  tabBarLabel: "Camera"
  // tabBarIcon: ({focused}) => (
  //   <TabBarIcon
  //     focused={focused}
  //     name={
  //       Platform.OS === 'ios'
  //         ? `ios-information-circle${focused ? '' : '-outline'}`
  //         : 'md-information-circle'
  //     }
  //   />
  // )
};

CameraStack.path = "";

const FridgeStack = createStackNavigator(
  {
    Fridge: Fridge
  },
  config
);

FridgeStack.navigationOptions = {
  tabBarLabel: "Fridge"
  // tabBarIcon: ({ focused }) => (
  //   <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'} />
  // ),
};

FridgeStack.path = "";

const RecipesStack = createStackNavigator(
  {
    Recipes: Recipes
  },
  config
);

RecipesStack.navigationOptions = {
  tabBarLabel: "Recipes"
  // tabBarIcon: ({focused}) => (
  //   <TabBarIcon
  //     focused={focused}
  //     name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
  //   />
  // )
};

RecipesStack.path = "";

// UserProfile
const UserProfileStack = createStackNavigator(
  {
    UserProfile: UserProfile
  },
  config
);

UserProfileStack.navigationOptions = {
  tabBarLabel: "Profile"
  // tabBarIcon: ({focused}) => (
  //   <TabBarIcon
  //     focused={focused}
  //     name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
  //   />
  // )
};

UserProfileStack.path = "";

const tabNavigator = createBottomTabNavigator({
  FridgeStack,
  CameraStack,
  RecipesStack,
  UserProfileStack
});

tabNavigator.path = "";

export default tabNavigator;
