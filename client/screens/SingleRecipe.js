import React, { Component } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  // Button,
  View,
  Modal,
  Dimensions,
  ImageBackground,
  TouchableHighlight,
  Alert,
  Button
} from "react-native";

import { connect } from "react-redux";
import { getSingleRecipeThunk } from "../store/recipes";

class SingleRecipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      instructions: []
    };
  }

  async componentDidMount() {
    const recipe = this.props.navigation.state.params.recipe;
    await this.props.getSingleRecipe(recipe.id);
    this.setState({ instructions: this.props.recipe[0].steps });
  }

  render() {
    const recipe = this.props.navigation.state.params.recipe;
    return (
      <ScrollView>
        <Image
          style={{
            width: Dimensions.get("window").width,
            height: 350,
            justifyContent: "center"
          }}
          source={{
            uri: `https://spoonacular.com/recipeImages/${recipe.id}-312x231.${recipe.imageType}`
          }}
        />
        <Text>{recipe.title}</Text>

        <View
          style={{
            flex: 1,
            flexDirection: "column",
            marginTop: 40
          }}
          contentContainerStyle={{
            justifyContent: "space-evenly",
            alignItems: "center"
          }}
        >
          <Text>Used ingredients</Text>
          {recipe.usedIngredients.map(ingred => {
            return (
              <View key={ingred.id} style={{}}>
                <Text>{ingred.original}</Text>
              </View>
            );
          })}
        </View>
        <View>
          <Text>Missing ingredients</Text>
          {recipe.missedIngredients.map(ingred => {
            return (
              <View key={ingred.id} style={{}}>
                <Text>{ingred.original}</Text>
              </View>
            );
          })}
        </View>
        <View>
          <Text>Step by step instructions:</Text>
          {this.state.instructions.map(step => {
            return (
              <View key={step.id} style={{}}>
                <Text>{step.step}</Text>
              </View>
            );
          })}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    padding: 12
  }
});

const mapDispatchToProps = dispatch => {
  return {
    getSingleRecipe: id => dispatch(getSingleRecipeThunk(id))
  };
};

const mapStateToProps = state => {
  return {
    recipe: state.recipe
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleRecipe);
