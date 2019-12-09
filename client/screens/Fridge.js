import React from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  View
} from "react-native";
import { getFridgeItemsThunk, deleteItemThunk } from "../store/fridge";
import { connect } from "react-redux";
import FridgeItem from "../components/FridgeItem";

class Fridge extends React.Component {
  static navigationOptions = {
    headerTitle: "Fridge",
    headerStyle: {
      backgroundColor: "#20CE99"
    },
    headerTitleStyle: {
      fontFamily: "Gill Sans",
      color: "white",
      fontSize: 25
    }
  };

  async componentDidMount() {
    await this.props.getFridgeItems(this.props.user.id);
  }

  render() {
    return (
      <View
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <ScrollView
          style={{
            flex: 1,
            flexDirection: "column"
          }}
          contentContainerStyle={styles.contentContainer}
        >
          {this.props.items.length < 1 ? (
            <View>
              <Text style={styles.fridgeText}>
                Your fridge is empty! Begin adding items to your fridge by
                clicking on the scanner icon below.
              </Text>
              <Image
                source={require("../other/emptyFridge.png")}
                style={{ width: 300, height: 300 }}
              ></Image>
            </View>
          ) : (
            <View>
              {this.props.items.map(item => {
                return (
                  <View key={item.id}>
                    <FridgeItem
                      id={item.id}
                      name={item.name}
                      imageUrl={item.imageUrl}
                      expirationDate={item.fridge_stock.expirationDate}
                    />
                  </View>
                );
              })}
            </View>
          )}
        </ScrollView>
      </View>
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
    getFridgeItems: userId => dispatch(getFridgeItemsThunk(userId)),
    deleteItem: (userId, itemId) => dispatch(deleteItemThunk(userId, itemId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Fridge);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#E0FEFE",
    fontFamily: "Gill Sans"
  },
  fridgeText: {
    fontFamily: "Gill Sans",
    fontSize: 18,
    textAlign: "center",
    margin: 5
  }
});
