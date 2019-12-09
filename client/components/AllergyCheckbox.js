import React from "react";
import { Dimensions } from "react-native";
import { CheckBox } from "react-native-elements";
import { connect } from "react-redux";
import { addAllergyThunk, deleteAllergyThunk } from "../store/allergy";

class AllergyCheckbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: this.props.isChecked
    };
  }
  render() {
    const allergy = this.props.allergy;
    const userId = this.props.user.id;
    return (
      <CheckBox
        title={allergy.name}
        textStyle={{ fontFamily: "Gill Sans", fontWeight: "normal" }}
        checkedColor="green"
        checked={this.state.checked}
        onPress={() => {
          if (!this.state.checked) {
            this.props.addAllergy(userId, { allergyId: allergy.id });
          } else {
            this.props.deleteAllergy(userId, allergy.id);
          }
          this.setState({ checked: !this.state.checked });
        }}
        containerStyle={{
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
    addAllergy: (userId, allergyId) =>
      dispatch(addAllergyThunk(userId, allergyId)),

    deleteAllergy: (userId, allergyId) =>
      dispatch(deleteAllergyThunk(userId, allergyId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllergyCheckbox);
