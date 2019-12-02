import React from "react";
import { View, Text } from "react-native";
import { ListItem } from "react-native-elements";
import { Icon, Button } from "react-native-elements";
import { deleteItemThunk } from "../store/fridge";
import { connect } from "react-redux";

class FridgeItem extends React.Component {
  constructor() {
    super();
  }

  render() {
    let expirationDate = this.props.expirationDate;
    // console.log("type of expdate", typeof expirationDate);
    if (expirationDate) {
      expirationDate = `(expires: ${expirationDate.slice(0, 10)})`;
    }
    return (
      <ListItem
        bottomDivider
        title={this.props.name}
        subtitle={
          <View>
            <Text>{expirationDate}</Text>
          </View>
        }
        leftAvatar={{ source: { uri: this.props.imageUrl } }}
        rightIcon={
          <Button
            icon={
              <Icon
                name="trash-can-outline"
                type="material-community"
                color="red"
              />
            }
            type="clear"
            buttonStyle={{
              width: 40,
              height: 40
            }}
            onPress={() => this.props.deleteItem(1, this.props.id)}
          />
        }
        containerStyle={
          {
            // backgroundColor: "#E0FEFE"
          }
        }
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    items: state.items
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteItem: (userId, itemId) => dispatch(deleteItemThunk(userId, itemId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FridgeItem);
