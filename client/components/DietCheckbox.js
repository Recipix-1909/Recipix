import React from "react";
import { Dimensions } from "react-native";
import { CheckBox } from "react-native-elements";
import { connect } from "react-redux";
import { addDietThunk, deleteDietThunk } from "../store/profile";

class DietCheckbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: this.props.isChecked
    };
  }
  render() {
    const diet = this.props.diet;
    const userId = this.props.user.id;
    return (
      <CheckBox
        title={diet.name}
        checkedColor="green"
        checked={this.state.checked}
        onPress={() => {
          if (!this.state.checked) {
            this.props.addDiet(userId, { dietId: diet.id });
          } else {
            this.props.deleteDiet(userId, diet.id);
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
  return { user: state.user };
};

const mapDispatchToProps = dispatch => {
  return {
    addDiet: (userId, dietId) => dispatch(addDietThunk(userId, dietId)),

    deleteDiet: (userId, dietId) => dispatch(deleteDietThunk(userId, dietId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DietCheckbox);
