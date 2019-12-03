// import * as WebBrowser from "expo-web-browser";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import Modal from "react-native-modal";

class UserProfile extends Component {
  constructor() {
    super();
    this.state = {
      intolerance: false
    };
  }

  intoleranceTrigger() {
    this.setState({
      intolerance: !this.state.intolerance
    });
  }

  render() {
    console.log("LOOK AT ME!!!", this.props.user);
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.getStartedContainer}>
            <Text style={styles.getStartedText}>
              {this.props.user.firstName} {this.props.user.lastName}
            </Text>
            <Button
              title={"Allergies"}
              onPress={() => this.intoleranceTrigger()}
            />
            {
              <Modal isVisible={this.state.intolerance}>
                <Text>Allergies</Text>
                {/* {allergies} */}
                <Button
                  title={"Save"}
                  onPress={() => this.intoleranceTrigger()}
                />
              </Modal>
            }
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(UserProfile);

UserProfile.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#B5EAD7"
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
