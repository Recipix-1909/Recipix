import React from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  Button,
  View,
  Modal,
  Dimensions,
  ImageBackground,
  TouchableHighlight,
  Alert
} from "react-native";
import { CheckBox } from "react-native-elements";
import { connect } from "react-redux";
import { getRecipesThunk } from "../store/recipes";

class ItemCheckBox extends React.Component {
  render() {
    return (
      <CheckBox
        title={titleName}
        checkedColor="green"
        checked={!this.state.checked}
        onPress={() => {
          this.setState({ checked: !this.state.checked });
          console.log(
            `you just checked off id: ${item.id}, name: ${item.name}`
          );
        }}
        containerStyle={{
          width: Dimensions.get("window").width * 0.85 - 65,
          backgroundColor: "transparent"
        }}
      ></CheckBox>
    );
  }
}

const mapStateToProps = state => {
  return {
    recipes: state.recipes,
    filteredItems: state.filteredItems,
    items: state.items
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getRecipes: id => dispatch(getRecipesThunk(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemCheckBox);
