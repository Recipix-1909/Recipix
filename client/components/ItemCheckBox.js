import React from "react";
import { Dimensions } from "react-native";
import { CheckBox } from "react-native-elements";
import { connect } from "react-redux";
import { deleteFromFilter, addToFilter } from "../store/filteredItems";

class ItemCheckBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: this.props.isChecked
    };
  }
  render() {
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
            this.props.addToFilter(item);
          } else {
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
const mapDispatchToProps = dispatch => {
  return {
    addToFilter: item => dispatch(addToFilter(item)),
    deleteFromFilter: item => dispatch(deleteFromFilter(item))
  };
};

export default connect(null, mapDispatchToProps)(ItemCheckBox);
