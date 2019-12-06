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
import { Icon, Button } from "react-native-elements";
import { Svg, Path } from "react-native-svg";
import FridgeItem from "../components/FridgeItem";

class Fridge extends React.Component {
  constructor() {
    super();
  }

  async componentDidMount() {
    await this.props.getFridgeItems(this.props.user.id);
  }

  render() {
    if (!this.props.items) {
      return (
        <Text>
          Your fridge is empty! Click on the camera icon to add items to your
          fridge.
        </Text>
      );
    } else
      return (
        <View style={styles.container}>
          <ScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
          >
            {this.props.items.length < 1 ? (
              <View>
                <Text>
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

          <View style={styles.topBarContainer}>
            <Text
              style={{
                fontSize: 20,
                paddingTop: 5
              }}
            >
              Fridge
            </Text>
          </View>
        </View>
      );
  }
}

Fridge.navigationOptions = {
  header: null
};

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
    backgroundColor: "#E0FEFE"
  },
  contentContainer: {
    paddingTop: 65
  },
  welcomeContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: "contain",
    marginTop: 3,
    marginLeft: -10
  },
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50
  },
  homeScreenFilename: {
    marginVertical: 7
  },
  codeHighlightText: {
    color: "rgba(96,100,109, 0.8)"
  },
  codeHighlightContainer: {
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 3,
    paddingHorizontal: 4
  },
  getStartedText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    lineHeight: 24,
    textAlign: "center"
  },
  tabBarInfoContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3
      },
      android: {
        elevation: 20
      }
    }),
    alignItems: "center",
    backgroundColor: "#fbfbfb",
    paddingVertical: 20
  },
  topBarContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3
      },
      android: {
        elevation: 20
      }
    }),

    backgroundColor: "#fbfbfb",
    paddingTop: 20,
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    height: 65
  },
  tabBarInfoText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    textAlign: "center"
  },
  navigationFilename: {
    marginTop: 5
  },
  helpContainer: {
    marginTop: 15,
    alignItems: "center"
  },
  helpLink: {
    paddingVertical: 15
  },
  helpLinkText: {
    fontSize: 14,
    color: "#2e78b7"
  }
});
