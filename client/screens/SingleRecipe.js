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
    this.setState({ instructions: this.props.recipe });

    console.log("this this.state!!!!!!!!!!!!!!!!!", this.state);
  }

  render() {
    // console.log("this is this.props", this.props);
    return (
      <View>
        <Text>HELLO THIS IS A ERTL:NSA:FKSNDG</Text>
      </View>
    );
  }
}

const style = StyleSheet.create({});

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
