// import * as WebBrowser from "expo-web-browser";
import React from "react";
import {
  // Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  // TouchableOpacity,
  View
} from "react-native";
import { connect } from "react-redux";
import { getRecipesThunk } from "../store/recipes";

class Recipes extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    this.props.getRecipes(1);
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
        </ScrollView>

        <View style={styles.tabBarInfoContainer}>
          <Text style={styles.tabBarInfoText}>
            This is a tab bar. You can edit it in:
          </Text>

          <View
            style={[styles.codeHighlightContainer, styles.navigationFilename]}
          ></View>
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
    recipes: state.recipes
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

  contentContainer: {
    paddingTop: 30
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
