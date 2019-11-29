// import * as WebBrowser from "expo-web-browser";
import React from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  Button,
  View,
  Modal,
  Dimensions,
  ImageBackground,
  TouchableHighlight,
  Alert
} from "react-native";
import { CheckBox } from "react-native-elements";
import { connect } from "react-redux";
import { getRecipesThunk } from "../store/recipes";
import ItemCheckBox from "../components/ItemCheckBox";

class Recipes extends React.Component {
  constructor() {
    super();
    this.state = {
      isFiltered: false,
      modalVisible: false,
      checked: false
    };
  }

  componentDidMount() {
    this.props.getRecipes(2);
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
                  {/* <Text>{curr.title}</Text>
                  <Image
                    style={{
                      width: Dimensions.get("window").width,
                      height: 400,
                      resizeMode: "contain"
                    }}
                    source={{ uri: `${curr.image}` }}
                    // resizeMode="contain"
                  ></Image> */}
                  <ImageBackground
                    style={{
                      width: Dimensions.get("window").width,
                      height: 350,

                      justifyContent: "center",
                      alignItems: "center"
                    }}
                    resizeMode="cover"
                    source={{ uri: `${curr.image}` }}
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
                  paddingBottom: 100
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 20,
                    textAlign: "center",

                    width: "100%",
                    paddingLeft: 50,
                    paddingRight: 50,
                    paddingBottom: 10
                  }}
                >
                  Filter By Ingredients
                </Text>
                <Button
                  title={"Close"}
                  onPress={() => {
                    this.setModalVisible(false);
                  }}
                />
                <ScrollView
                  style={{ flex: 1, flexDirection: "column" }}
                  contentContainerStyle={{
                    justifyContent: "space-evenly",
                    alignItems: "center"
                  }}
                >
                  {this.props.items.map(item => {
                    const expirationDate = item.fridge_stock.expirationDate;

                    let titleName = item.name;
                    if (expirationDate) {
                      titleName += ` (expires: ${expirationDate.slice(0, 10)})`;
                    }
                    return (
                      <View key={item.id} style={{}}>
                        <CheckBox
                          title={titleName}
                          checkedColor="green"
                          checked={!this.state.checked}
                          onPress={() => {
                            this.setState({ checked: !this.state.checked });
                            console.log(
                              `you just checked off id: ${item.id}, name: ${item.name}`
                            );
                          }}
                          containerStyle={{
                            width: Dimensions.get("window").width * 0.85 - 65,
                            backgroundColor: "transparent"
                          }}
                        ></CheckBox>
                      </View>
                    );
                  })}
                  <View>
                    <Text>testing</Text>
                  </View>
                  <View>
                    <Text>testing</Text>
                  </View>
                  <View>
                    <Text>testing</Text>
                  </View>
                  <View>
                    <Text>testing</Text>
                  </View>
                  <View>
                    <Text>testing</Text>
                  </View>
                  <View>
                    <Text>testing</Text>
                  </View>
                  <View>
                    <Text>testing</Text>
                  </View>
                  <View>
                    <Text>testing</Text>
                  </View>
                  <View>
                    <Text>testing</Text>
                  </View>
                  <View>
                    <Text>testing</Text>
                  </View>
                  <View>
                    <Text>testing</Text>
                  </View>
                  <View>
                    <Text>testing</Text>
                  </View>
                  <View>
                    <Text>testing</Text>
                  </View>
                  <View>
                    <Text>testing</Text>
                  </View>
                  <View>
                    <Text>testing</Text>
                  </View>
                  <View>
                    <Text>testing</Text>
                  </View>
                  <View>
                    <Text>testing</Text>
                  </View>
                  <View>
                    <Text>testing</Text>
                  </View>
                  <View>
                    <Text>testing</Text>
                  </View>
                  <View>
                    <Text>testing</Text>
                  </View>
                  <View>
                    <Text>testing</Text>
                  </View>
                  <View>
                    <Text>testing</Text>
                  </View>
                  <View>
                    <Text>testing last item</Text>
                  </View>
                </ScrollView>
                <View style={styles.tabBarInfoContainer}>
                  <Button
                    title={"Submit Filter"}
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
    filteredItems: state.filteredItems,
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
  // homeScreenFilename: {
  //   marginVertical: 7
  // },
  // codeHighlightText: {
  //   color: "rgba(96,100,109, 0.8)"
  // },
  // codeHighlightContainer: {
  //   backgroundColor: "rgba(0,0,0,0.05)",
  //   borderRadius: 3,
  //   paddingHorizontal: 4
  // },
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
