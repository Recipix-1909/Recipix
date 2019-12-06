import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  Image,
  View,
  Dimensions
} from "react-native";

import { CheckBox } from "react-native-elements";

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
        <Text style={styles.title}>{recipe.title}</Text>
        <Text></Text>

        <View style={styles.allIngredients}>
          <Text style={styles.header}>INGREDIENTS</Text>
          {recipe.usedIngredients.map(ingred => {
            return (
              <View key={ingred.id} style={styles.usedIngredients}>
                <CheckBox
                  title={ingred.original}
                  checked={true}
                  checkedColor="green"
                />
              </View>
            );
          })}
          <View style={styles.missedIngredients}>
            {recipe.missedIngredients.map(ingred => {
              return (
                <View key={ingred.id} style={styles.missedIngredients}>
                  <CheckBox
                    title={ingred.original}
                    checked={false}
                    checkedColor="green"
                  />
                </View>
              );
            })}
          </View>
          <Text></Text>
          <View style={styles.header}>
            <Text style={styles.header}>PREPARATION</Text>
            {this.state.instructions.map((step, idx) => {
              return (
                <View key={step.step} style={{}}>
                  <Text style={{ fontWeight: "bold" }}>Step {idx + 1}</Text>
                  <Text>{step.step}</Text>
                  <Text> </Text>
                </View>
              );
            })}
          </View>
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
  },
  usedIngredients: {
    color: "#33FF61"
  },
  missedIngredients: {
    color: "#FF5733"
  },
  instructions: {},
  header: {
    fontSize: 20,
    textAlign: "center"
  },
  title: {
    fontSize: 25,
    textAlign: "center"
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
