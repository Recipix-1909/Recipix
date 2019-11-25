import React from "react";
import { Provider } from "react-redux";
import { StyleSheet, Text, View, Button, ScrollView } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { createAppContainer, NavigationEvents } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import CameraScanner from "./CameraScanner";
import Fridge from "./Fridge";
import Recipes from "./Recipes";
import UserProfile from "./UserProfile";

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}

export class HomeScreen extends React.Component {
  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <ScrollView>
          <Text>Testing!</Text>
          <Button title="camera" onPress={() => navigate("Camera")} />
        </ScrollView>
      </View>
    );
  }
}

const AppNavigator = createStackNavigator({
  Home: HomeScreen,
  Camera: CameraScanner
  // Fridge: Fridge,
  // Recipes: Recipes,
  // Profile: UserProfile
});
const AppContainer = createAppContainer(AppNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
