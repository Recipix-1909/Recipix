import React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { Icon } from "react-native-elements";
import Fridge from "../screens/Fridge";
import Recipes from "../screens/Recipes";
import UserProfile from "../screens/UserProfile";
import CameraScanner from "../screens/CameraScanner";
import { Svg, Path } from "react-native-svg";
import Auth from "../screens/Auth";

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
  tabBarLabel: "Camera",
  tabBarIcon: (
    <Icon name="barcode-scan" type="material-community" color="#517fa4" />
  )
};

CameraStack.path = "";

const FridgeStack = createStackNavigator(
  {
    Fridge: Fridge
  },
  config
);

FridgeStack.navigationOptions = {
  tabBarLabel: "Fridge",
  tabBarIcon: <Icon name="fridge" type="material-community" color="#517fa4" />
};

FridgeStack.path = "";

const RecipesStack = createStackNavigator(
  {
    Recipes: Recipes
  },
  config
);

RecipesStack.navigationOptions = {
  tabBarLabel: "Recipes",
  // tabBarIcon: <Icon name="food" type="material-community" color="#517fa4" />,
  tabBarIcon: (
    <Svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="white"
      stroke="#517fa4"
    >
      <Path d="M22 3L10 4.41V6H22V7H10V12H22C22 13.81 21.43 15.46 20.32 16.95S17.77 19.53 16 20.25V22H8V20.25C6.24 19.53 4.79 18.43 3.68 16.95S2 13.81 2 12H5V4L22 2V3M6 4.88V6H7V4.78L6 4.88M6 7V12H7V7H6M9 12V7H8V12H9M9 6V4.55L8 4.64V6H9Z" />
    </Svg>
  )
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
  tabBarLabel: "Profile",
  tabBarIcon: (
    <Icon name="account-circle" type="material-community" color="#517fa4" />
  )
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
