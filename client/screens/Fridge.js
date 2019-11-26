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
import { getFridgeItemsThunk } from "../store/fridge";
import { connect } from "react-redux";

// import { MonoText } from "../components/StyledText";

class Fridge extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    console.log("this is this.props in the COMPONENT DID MOUNT", this.props);
    this.props.getFridgeItems(1);
  }

  render() {
    console.log("THIS IS this.props.items!!!!!!", this.props.items);

    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.getStartedContainer}>
            <Text style={styles.getStartedText}>This is your Fridge!</Text>
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
    );
  }
}

Fridge.navigationOptions = {
  header: null
};

const mapStateToProps = state => {
  return {
    items: state.items
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getFridgeItems: userId => dispatch(getFridgeItemsThunk(userId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Fridge);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E0FEFE"
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
