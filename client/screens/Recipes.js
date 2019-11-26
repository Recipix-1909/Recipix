// import * as WebBrowser from "expo-web-browser";
import React from "react";
import {
  // Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  // TouchableOpacity,
  View
} from "react-native";
import { connect } from 'react-redux'
import {getRecipesThunk} from '../store/recipes'


class Recipes extends React.Component {

  componentDidMount(){

    this.props.getRecipes(1)
  }

  render(){
    console.log(this.props.state)
        return (
          <View style={styles.container}>
            <ScrollView
              style={styles.container}
              contentContainerStyle={styles.contentContainer}
            >
              <View style={styles.getStartedContainer}>
                <Text style={styles.getStartedText}>
                  Let's see what you can cook with the items from your fridge!
                </Text>
              </View>
            </ScrollView>

            <View style={styles.tabBarInfoContainer}>
              <Text style={styles.tabBarInfoText}>
                This is a tab bar. You can edit it in:
              </Text>

              <View
                style={[styles.codeHighlightContainer, styles.navigationFilename]}
              >
                {/* <MonoText style={styles.codeHighlightText}>
                  navigation/MainTabNavigator.js
                </MonoText> */}
              </View>
            </View>
          </View>
        );
   }
}

Recipes.navigationOptions = {
  header: null
};

const mapStateToProps = state => {
  return{
    state:state
  }
}

const mapDispatchToProps = dispatch =>{
  return{
    getRecipes: (id) => dispatch(getRecipesThunk(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Recipes)













// function DevelopmentModeNotice() {
//   if (__DEV__) {
//     const learnMoreButton = (
//       <Text onPress={handleLearnMorePress} style={styles.helpLinkText}>
//         Learn more
//       </Text>
//     );

//     return (
//       <Text style={styles.developmentModeText}>
//         Development mode is enabled: your app will be slower but you can use
//         useful development tools. {learnMoreButton}
//       </Text>
//     );
//   } else {
//     return (
//       <Text style={styles.developmentModeText}>
//         You are not in development mode: your app will run at full speed.
//       </Text>
//     );
//   }
// }

// function handleLearnMorePress() {
//   WebBrowser.openBrowserAsync(
//     "https://docs.expo.io/versions/latest/workflow/development-mode/"
//   );
// }

// function handleHelpPress() {
//   WebBrowser.openBrowserAsync(
//     "https://docs.expo.io/versions/latest/workflow/up-and-running/#cant-see-your-changes"
//   );
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFDAC1"
  },
  // developmentModeText: {
  //   marginBottom: 20,
  //   color: "rgba(0,0,0,0.4)",
  //   fontSize: 14,
  //   lineHeight: 19,
  //   textAlign: "center"
  // },
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
