import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ListItem } from "react-native-elements";
import { Icon, Button } from "react-native-elements";
import { deleteItemThunk } from "../store/fridge";
import { connect } from "react-redux";

class FridgeItem extends React.Component {
  state = {
    name: this.props.name,
    expirationDate: this.props.expirationDate
  };

  render() {
    let expirationDate = this.state.expirationDate;
    if (expirationDate) {
      expirationDate = `(expires: ${expirationDate.slice(0, 10)})`;
    }
    return (
      <ListItem
        bottomDivider
        title={<Text style={styles.text}>{this.state.name}</Text>}
        subtitle={
          <View>
            <Text style={styles.text}>{expirationDate}</Text>
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
            onPress={() =>
              this.props.deleteItem(this.props.user.id, this.props.id)
            }
          />
        }
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    items: state.items,
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteItem: (userId, itemId) => dispatch(deleteItemThunk(userId, itemId))
  };
};

const styles = StyleSheet.create({
  text: {
    fontFamily: "Gill Sans",
    fontSize: 22
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(FridgeItem);
