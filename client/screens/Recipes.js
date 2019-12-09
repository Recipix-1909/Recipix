import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Modal,
  Dimensions,
  ImageBackground,
  Image,
  TouchableHighlight
} from "react-native";
import { Icon, Button } from "react-native-elements";
import { connect } from "react-redux";
import { Svg, Path } from "react-native-svg";

import { getRecipesThunk, getFilteredRecipesThunk } from "../store/recipes";
import { resetFilter } from "../store/filteredItems";
import ItemCheckBox from "../components/ItemCheckBox";
import filterIcon from "../other/filter";

class Recipes extends React.Component {
  constructor() {
    super();
    this.state = {
      modalVisible: false,
      loaded: false
    };
    this.setModalVisible = this.setModalVisible.bind(this);
  }
  // state = {
  //   modalVisible: false,
  //   loaded: false
  // };

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Recipes",
      headerStyle: {
        backgroundColor: "#20CE99"
      },
      headerTitleStyle: {
        fontFamily: "Gill Sans",
        color: "white",
        fontSize: 25
      },
      headerRight: () => (
        <Button
          title=""
          icon={
            <Svg
              width="24"
              height="24"
              viewBox="0 0 512 512"
              fill="#517fa4"
              stroke="#517fa4"
            >
              <Path d={filterIcon} />
            </Svg>
          }
          type="clear"
          buttonStyle={{
            width: 70,
            height: 40,
            flexDirection: "row-reverse"
          }}
          titleStyle={{
            fontSize: 12
          }}
          onPress={
            // () => {
            //   this.setModalVisible(true);
            // }
            () => {
              navigation.state.params.setModalVisible(true);
            }
          }
        />
      )
    };
  };

  async componentDidMount() {
    this.props.navigation.setParams({
      setModalVisible: visible => this.setModalVisible(visible)
    });
    await this.props.getRecipes(this.props.user.id);
    this.setState({ loaded: true });
  }

  setModalVisible = visible => {
    this.setState({ modalVisible: visible });
  };
  // function to determine if item is in filter
  isItemInFilter(item) {
    let filteredItems = this.props.filteredItems;
    let isFound = false;
    for (let i = 0; i < filteredItems.length; i++) {
      let currFilterItem = filteredItems[i];
      if (currFilterItem.id === item.id) {
        isFound = true;
        break;
      }
    }
    return isFound;
  }

  handleFilter() {
    this.setModalVisible(false);

    // if user did not filter for any ingredients, show default recipes containing any ingredients from fridge
    if (this.props.filteredItems.length === 0) {
      this.props.getRecipes(this.props.user.id);
    }
    // else get recipes based on filtered ingredients
    else {
      this.props.getFilteredRecipes(this.props.filteredItems);
    }
  }

  render() {
    // console.log("this.state.modalVisible===>", this.state.modalVisible);
    return (
      <View style={styles.container}>
        {this.props.recipes.length === 0 ? (
          <View style={styles.noRecipes}>
            <Text style={styles.recipesText}>No recipes to show...</Text>
            <Image
              source={require("../other/sadChef.png")}
              style={{ width: 121, height: 261 }}
            ></Image>
          </View>
        ) : (
          <ScrollView style={styles.recipesList}>
            {this.props.recipes.map(curr => {
              return (
                <View
                  key={curr.id}
                  style={{ display: "flex" }}
                  onPress={() =>
                    this.props.navigation.navigate("SingleRecipe", {
                      recipe: curr
                    })
                  }
                >
                  <ImageBackground
                    style={styles.imageBackground}
                    resizeMode="cover"
                    source={{
                      uri: `https://spoonacular.com/recipeImages/${curr.id}-480x360.${curr.imageType}`
                    }}
                  >
                    <Text
                      onPress={() =>
                        this.props.navigation.navigate("SingleRecipe", {
                          recipe: curr
                        })
                      }
                      style={styles.recipeInList}
                    >
                      {curr.title}
                    </Text>
                  </ImageBackground>
                </View>
              );
            })}
            <Modal
              animationType="fade"
              transparent={true}
              visible={this.state.modalVisible}
              style={styles.modalContent}
            >
              <View style={styles.modalExterior}>
                {/* View for Inner Box */}
                <Button
                  icon={
                    <Icon
                      name="close-box"
                      type="material-community"
                      color="white"
                    />
                  }
                  type="clear"
                  buttonStyle={{
                    alignSelf: "flex-end"
                  }}
                  onPress={() => {
                    this.setModalVisible(false);
                  }}
                />
                <ScrollView style={styles.modalInterior}>
                  {this.props.items.map(item => {
                    return (
                      <View key={item.id}>
                        <ItemCheckBox
                          item={item}
                          isChecked={this.isItemInFilter(item)}
                        />
                      </View>
                    );
                  })}
                </ScrollView>
                <TouchableHighlight
                  style={styles.button}
                  onPress={() => this.handleFilter()}
                >
                  <Text style={styles.buttonText}>FILTER</Text>
                </TouchableHighlight>
              </View>
            </Modal>
          </ScrollView>
        )}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    recipes: state.recipes,
    filteredItems: state.filteredItems,
    items: state.items,
    user: state.user
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
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Gill Sans"
  },
  noRecipes: {
    alignItems: "center",
    justifyContent: "center",
    display: "flex"
  },
  recipesText: {
    fontFamily: "Gill Sans",
    fontSize: 18,
    alignSelf: "center",
    margin: 10
  },

  modalContainer: {
    flex: 1,
    backgroundColor: "#DABFDE"
  },
  modalExterior: {
    backgroundColor: "#20CE99",
    borderRadius: 15,
    paddingTop: 0,
    padding: 20,
    fontFamily: "Gill Sans",
    margin: 30,
    marginTop: 100,
    marginBottom: 200
  },
  modalInterior: {
    backgroundColor: "white",
    borderRadius: 15,
    fontFamily: "Gill Sans",
    flexDirection: "column"
  },
  modalContent: {
    justifyContent: "center",
    alignItems: "center",
    margin: 30
  },
  button: {
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 15,
    padding: 10,
    margin: 10
    // fontFamily: "Gill Sans"
  },
  buttonText: {
    fontFamily: "Gill Sans",
    fontSize: 20
  },
  imageBackground: {
    width: Dimensions.get("window").width * 0.95,
    height: 350,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    marginBottom: 15
  },
  recipeInList: {
    fontSize: 22,
    textAlign: "center",
    fontFamily: "Gill Sans",
    backgroundColor: "#8fafc8",
    color: "white",
    width: "100%",
    paddingLeft: 10,
    paddingRight: 10,
    alignSelf: "flex-end"
  }
});
