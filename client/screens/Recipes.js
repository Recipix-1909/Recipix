// import * as WebBrowser from "expo-web-browser";
import React from "react";
import {
  // Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  Button,
  View,
  Modal,
  Dimensions,
  TouchableHighlight,
  Alert
} from "react-native";
import { connect } from "react-redux";
import { getRecipesThunk } from "../store/recipes";

class Recipes extends React.Component {
  constructor() {
    super();
    this.state = {
      isFiltered: false,
      modalVisible: false
    };
  }

  componentDidMount() {
    this.props.getRecipes(1);
    console.log("Recipes props===>", this.props);
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {
    return this.props.recipes[0] !== undefined ? (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.getStartedContainer}>
            {this.props.recipes.map(curr => {
              return (
                <View key={curr.id}>
                  <Text>{curr.title}</Text>
                  <Image
                    source={{ uri: `${curr.image}` }}
                    style={{ width: 400, height: 400 }}
                  ></Image>
                </View>
              );
            })}
          </View>

          <Modal
            animationType="fade"
            transparent={true}
            visible={this.state.modalVisible}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#00000080"
              }}
            >
              <View
                style={{
                  width: Dimensions.get("window").width * 0.85,
                  height: Dimensions.get("window").height * 0.85,
                  backgroundColor: "#DABFDE",
                  padding: 20,
                  paddingBottom: 100
                }}
              >
                <Text>Filter By Ingredients:</Text>
                <ScrollView>
                  {this.props.items.map(item => {
                    return (
                      <View key={item.id}>
                        <Text>{item.name}</Text>
                      </View>
                    );
                  })}
                  <Text>testing</Text>
                  <Text>testing</Text>
                  <Text>testing</Text>
                  <Text>testing</Text>
                  <Text>testing</Text>
                  <Text>testing</Text>
                  <Text>testing</Text>
                  <Text>testing</Text>
                  <Text>testing</Text>
                  <Text>testing</Text>
                  <Text>testing</Text>
                  <Text>testing</Text>
                  <Text>testing</Text>
                  <Text>testing</Text>
                  <Text>testing</Text>
                  <Text>testing</Text>
                  <Text>testing</Text>
                  <Text>testing</Text>
                  <Text>testing</Text>
                  <Text>testing</Text>
                  <Text>testing</Text>
                  <Text>testing</Text>
                  <Text>testing</Text>
                  <Text>testing</Text>
                  <Text>testing</Text>
                  <Text>testing</Text>
                  <Text>testing</Text>
                  <Text>testing</Text>
                  <Text>testing</Text>
                  <Text>testing</Text>
                  <Text>testing</Text>
                  <Text>testing</Text>
                  <Text>testing last item</Text>
                </ScrollView>
                <View style={styles.tabBarInfoContainer}>
                  <Button
                    title={"Show Filtered Recipes"}
                    onPress={() => {
                      this.setModalVisible(false);
                    }}
                  />
                </View>
              </View>
            </View>
          </Modal>
        </ScrollView>

        <View style={styles.tabBarInfoContainer}>
          <Button
            title={"Filter Recipes"}
            onPress={() => {
              this.setModalVisible(true);
            }}
          />
        </View>
      </View>
    ) : null;
  }
}

Recipes.navigationOptions = {
  header: null
};

const mapStateToProps = state => {
  return {
    recipes: state.recipes,
    filteredItems: state.items,
    items: state.items
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getRecipes: id => dispatch(getRecipesThunk(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Recipes);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFDAC1"
  },

  modalContainer: {
    flex: 1,
    backgroundColor: "#DABFDE"
    // borderRadius: 4,
    // borderWidth: 1,
    // borderColor: "#425df5",
    // width: 300
  },

  contentContainer: {
    paddingTop: 30,
    alignItems: "center"
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
