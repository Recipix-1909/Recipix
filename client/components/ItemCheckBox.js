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
import {
  getFilter,
  deleteFromFilter,
  addToFilter
} from "../store/filteredItems";
import { getFridgeItemsThunk, deleteItemThunk } from "../store/fridge";

class ItemCheckBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: this.props.isChecked
    };
  }
  render() {
    // console.log("props inside ItemCheckBox component", this.props);

    const item = this.props.item;
    const expirationDate = item.fridge_stock.expirationDate;
    let titleName = item.name;
    if (expirationDate) {
      titleName += ` (expires: ${expirationDate.slice(0, 10)})`;
    }
    return (
      <CheckBox
        title={titleName}
        checkedColor="green"
        checked={this.state.checked}
        onPress={() => {
          if (!this.state.checked) {
            console.log(
              `you just added to filter id: ${item.id}, name: ${item.name}`
            );
            this.props.addToFilter(item);
          } else {
            console.log(
              `you just removed from filter id: ${item.id}, name: ${item.name}`
            );
            this.props.deleteFromFilter(item);
          }
          this.setState({ checked: !this.state.checked });
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
    // recipes: state.recipes,
    // filteredItems: state.filteredItems
    // items: state.items
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // getRecipes: id => dispatch(getRecipesThunk(id))
    addToFilter: item => dispatch(addToFilter(item)),
    deleteFromFilter: item => dispatch(deleteFromFilter(item))
  };
};

export default connect(null, mapDispatchToProps)(ItemCheckBox);
