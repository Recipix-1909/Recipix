import React from "react";
import { Dimensions } from "react-native";
import { CheckBox } from "react-native-elements";
import { connect } from "react-redux";
import { addDietThunk } from "../store/profile";

class DietCheckbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: this.props.isChecked
    };
  }
  render() {
    return (
      <CheckBox
        title={this.props.name}
        checkedColor="green"
        checked={this.state.checked}
        // onPress={() => {
        //   if (!this.state.checked) {
        //     console.log(
        //       `you just added to filter id: ${item.id}, name: ${item.name}`
        //     )
        //     this.props.addToFilter(item)
        //   } else {
        //     console.log(
        //       `you just removed from filter id: ${item.id}, name: ${item.name}`
        //     )
        //     this.props.deleteFromFilter(item)
        //   }
        //   this.setState({ checked: !this.state.checked })
        // }}
        containerStyle={{
          width: Dimensions.get("window").width * 0.85 - 65,
          backgroundColor: "transparent"
        }}
      ></CheckBox>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    addDiet: (userId, diet) => dispatch(addDietThunk(userId, diet))
  };
};

export default connect(null, mapDispatchToProps)(DietCheckbox);
