import React from "react";
import { Provider } from "react-redux";
import { StyleSheet, Text, View, Button, ScrollView } from "react-native";
import { createAppContainer, NavigationEvents } from "react-navigation";

import store from "../store";
import AppNavigator from "../navigation/AppNavigator";
import Auth from "./Auth";

console.disableYellowBox = true;

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
          <Auth />
          <AppNavigator />
        </ScrollView>
      </View>
    );
  }
}

const AppContainer = createAppContainer(AppNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
