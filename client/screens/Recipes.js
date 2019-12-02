// import * as WebBrowser from "expo-web-browser";
import React from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  // Button,
  View,
  Modal,
  Dimensions,
  ImageBackground,
  TouchableHighlight,
  Alert
} from "react-native";
import { CheckBox, Icon, Button } from "react-native-elements";
import { connect } from "react-redux";
import { getRecipesThunk, getFilteredRecipesThunk } from "../store/recipes";
import { resetFilter } from "../store/filteredItems";
import ItemCheckBox from "../components/ItemCheckBox";
import { Svg, Path } from "react-native-svg";

class Recipes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      loaded: false
    };
    this.isItemInFilter = this.isItemInFilter.bind(this);
  }

  async componentDidMount() {
    await this.props.getRecipes(1);
    // console.log("Recipes props===>", this.props);
    this.setState({ loaded: true });
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  // function to determine if item is in filter
  isItemInFilter(item) {
    let filteredItems = this.props.filteredItems;
    // console.log("isItemInFilter function; filteredItems ===>", filteredItems);
    // console.log("item to check in filter ==>", item.name);
    let isFound = false;
    for (let i = 0; i < filteredItems.length; i++) {
      let currFilterItem = filteredItems[i];
      // console.log("currFilterItem ===>", currFilterItem.name);
      if (currFilterItem.id === item.id) {
        isFound = true;
        break;
      }
    }
    // console.log("isFound ===>", isFound);
    return isFound;
  }
  render() {
    // console.log("this.props.filteredItems ====>", this.props.filteredItems);
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          {!this.state.loaded ? (
            <View>
              <Text style={{ fontSize: 40 }}>Loading Recipes...</Text>
            </View>
          ) : this.state.loaded && this.props.recipes.length === 0 ? (
            <View>
              <Text>No recipes to show...</Text>
            </View>
          ) : (
            <View style={styles.getStartedContainer}>
              {this.props.recipes[0] !== undefined &&
                this.props.recipes.map(curr => {
                  return (
                    <View key={curr.id}>
                      <ImageBackground
                        style={{
                          width: Dimensions.get("window").width,
                          height: 350,

                          justifyContent: "center",
                          alignItems: "center"
                        }}
                        resizeMode="cover"
                        source={{
                          uri: `https://spoonacular.com/recipeImages/${curr.id}-480x360.${curr.imageType}`
                        }}
                      >
                        <Text
                          style={{
                            fontWeight: "bold",
                            fontSize: 40,
                            textAlign: "center",

                            textShadowColor: "#FFFFFF",
                            textShadowOffset: { width: -2, height: 2 },
                            textShadowRadius: 3,
                            backgroundColor: "rgba(52, 52, 52, 0.3)",
                            width: "100%",
                            paddingLeft: 50,
                            paddingRight: 50
                          }}
                        >
                          <Text
                            style={{
                              backgroundColor: "transparent"
                            }}
                          >
                            {curr.title}
                          </Text>
                        </Text>
                      </ImageBackground>
                    </View>
                  );
                })}
            </View>
          )}

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
              {/* View for Inner Box */}
              <View
                style={{
                  width: Dimensions.get("window").width * 0.85,
                  height: Dimensions.get("window").height * 0.85,
                  backgroundColor: "#DABFDE",
                  padding: 20,
                  paddingBottom: 75,
                  borderRadius: 15
                }}
              >
                <ScrollView
                  style={{
                    flex: 1,
                    flexDirection: "column",
                    marginTop: 40
                  }}
                  contentContainerStyle={{
                    justifyContent: "space-evenly",
                    alignItems: "center"
                  }}
                >
                  {this.props.items.map(item => {
                    return (
                      <View key={item.id} style={{}}>
                        <ItemCheckBox
                          item={item}
                          isChecked={this.isItemInFilter(item)}
                        />
                      </View>
                    );
                  })}
                </ScrollView>

                <View style={styles.filterHeaderContainer}>
                  <View
                    style={{
                      width: 40,
                      height: 40
                    }}
                  ></View>
                  <Text
                    style={{
                      fontSize: 20,
                      paddingVertical: 10
                    }}
                  >
                    Filter By Ingredients
                  </Text>
                  <Button
                    icon={
                      <Icon
                        name="close-box"
                        type="material-community"
                        color="red"
                      />
                    }
                    type="clear"
                    buttonStyle={{
                      width: 40,
                      height: 40,
                      flexDirection: "column-reverse",
                      marginTop: 2
                    }}
                    onPress={() => {
                      this.setModalVisible(false);
                    }}
                  />
                </View>

                <View style={styles.tabBarInfoContainer}>
                  <Button
                    raised
                    type="outline"
                    title={"Submit Filter"}
                    onPress={() => {
                      console.log(
                        "filtered items list ====>",
                        this.props.filteredItems
                      );
                      this.setModalVisible(false);
                      this.props.getFilteredRecipes(this.props.filteredItems);
                      // this.setState({
                      //   filteredItems: this.props.filteredItems
                      // });
                    }}
                  />
                </View>
              </View>
            </View>
          </Modal>
        </ScrollView>

        <View style={styles.topBarContainer}>
          <View
            style={{
              width: 50,
              height: 40
            }}
          ></View>
          <Text
            style={{
              fontSize: 20,
              paddingTop: 5
            }}
          >
            Recipes
          </Text>
          <Button
            title="Filter"
            icon={
              <Svg
                width="24"
                height="24"
                viewBox="0 0 512 512"
                fill="#517fa4"
                stroke="#517fa4"
              >
                <Path d="M139.61 35.5a12 12 0 0 0-17 0L58.93 98.81l-22.7-22.12a12 12 0 0 0-17 0L3.53 92.41a12 12 0 0 0 0 17l47.59 47.4a12.78 12.78 0 0 0 17.61 0l15.59-15.62L156.52 69a12.09 12.09 0 0 0 .09-17zm0 159.19a12 12 0 0 0-17 0l-63.68 63.72-22.7-22.1a12 12 0 0 0-17 0L3.53 252a12 12 0 0 0 0 17L51 316.5a12.77 12.77 0 0 0 17.6 0l15.7-15.69 72.2-72.22a12 12 0 0 0 .09-16.9zM64 368c-26.49 0-48.59 21.5-48.59 48S37.53 464 64 464a48 48 0 0 0 0-96zm432 16H208a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h288a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm0-320H208a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h288a16 16 0 0 0 16-16V80a16 16 0 0 0-16-16zm0 160H208a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h288a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16z" />
              </Svg>
            }
            type="clear"
            buttonStyle={{
              width: 50,
              height: 40,
              flexDirection: "column-reverse"
            }}
            titleStyle={{
              fontSize: 13
            }}
            onPress={() => {
              this.setModalVisible(true);
            }}
          />
        </View>
      </View>
    );
  }
}

Recipes.navigationOptions = {
  header: null
};

const mapStateToProps = state => {
  return {
    recipes: state.recipes,
    filteredItems: state.filteredItems,
    items: state.items
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getRecipes: id => dispatch(getRecipesThunk(id)),
    getFilteredRecipes: filteredItems =>
      dispatch(getFilteredRecipesThunk(filteredItems)),
    resetFilter: () => dispatch(resetFilter())
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
    paddingTop: 65,
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
    // backgroundColor: "#fbfbfb",
    backgroundColor: "transparent",
    // paddingVertical: 20,
    height: 65,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15
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
    justifyContent: "space-between",
    height: 65
  },

  filterHeaderContainer: {
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
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15
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
