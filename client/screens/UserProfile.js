// import * as WebBrowser from "expo-web-browser";
import React from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  Modal,
  Dimensions,
  View
} from "react-native";
import { Icon, Button } from "react-native-elements";
import { connect } from "react-redux";
import { removeUserThunk } from "../store/users";
import { getDietThunk } from "../store/profile";
import { getAllergyThunk } from "../store/allergy";
import DietCheckbox from "../components/DietCheckbox";
import AllergyCheckbox from "../components/AllergyCheckbox";
import { ip } from "../../secrets";
import axios from "axios";

class UserProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isDietVisible: false,
      isAllergyVisible: false,
      allDiets: [],
      allAllergies: []
    };

    this.logOutSubmit = this.logOutSubmit.bind(this);
    this.setAllergyVisible = this.setAllergyVisible.bind(this);
    this.setDietVisible = this.setDietVisible.bind(this);
  }

  isChecked(current, userPreferences) {
    return userPreferences.some(
      dietOrAllergy => current.name === dietOrAllergy.name
    );
  }

  setDietVisible() {
    this.setState({ isDietVisible: !this.state.isDietVisible });
  }

  setAllergyVisible() {
    this.setState({ isAllergyVisible: !this.state.isAllergyVisible });
  }

  async componentDidMount() {
    await this.props.getDiet(this.props.user.id);

    // getting all diets and allergies from database
    const { data: allDiets } = await axios.get(`${ip}/api/diet`);
    const { data: allAllergies } = await axios.get(`${ip}/api/allergy`);
    this.setState({ allDiets, allAllergies });
  }

  logOutSubmit = () => {
    this.props.removeUser();
    this.props.navigation.navigate("Log");
  };

  render() {
    const dietOptions = this.state.allDiets;
    const allergyOptions = this.state.allAllergies;
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.getStartedContainer}>
            <Text style={styles.getStartedText}>User Profile</Text>
            <Button
              title="Diet"
              type="clear"
              buttonStyle={{
                width: 100,
                height: 40,
                flexDirection: "column-reverse"
              }}
              titleStyle={{
                fontSize: 13
              }}
              onPress={() => {
                this.setDietVisible();
              }}
            />

            <Button
              title="Allergy"
              type="clear"
              buttonStyle={{
                width: 100,
                height: 40,
                flexDirection: "column-reverse"
              }}
              titleStyle={{
                fontSize: 13
              }}
              onPress={() => {
                this.setAllergyVisible();
              }}
            />

            {/* -------- DIET MODAL-------- */}
            <Modal
              animationType="fade"
              transparent={true}
              visible={this.state.isDietVisible}
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
                    {dietOptions.map(curr => {
                      return (
                        <View key={curr.id} style={{}}>
                          <DietCheckbox
                            isChecked={this.isChecked(curr, this.props.diets)}
                            diet={curr}
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
                      Diet
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
                        this.setDietVisible();
                      }}
                    />
                  </View>

                </View>
              </View>
            </Modal>

            {/* -------- ALLERGY MODAL-------- */}
            <Modal
              animationType="fade"
              transparent={true}
              visible={this.state.isAllergyVisible}
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
                    {allergyOptions.map(curr => {
                      return (
                        <View key={curr.id} style={{}}>
                          <AllergyCheckbox
                            isChecked={this.isChecked(
                              curr,
                              this.props.allergies
                            )}

                            allergy={curr}
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
                      Allergy
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
                        this.setAllergyVisible();
                      }}
                    />
                  </View>
                </View>
              </View>
            </Modal>

            <Text style={styles.logOut} onPress={() => this.logOutSubmit()}>
              Log out
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}

UserProfile.navigationOptions = {
  header: null
};

const mapStateToProps = state => {
  return {
    user: state.user,
    diets: state.diets,
    allergies: state.allergies
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeUser: () => dispatch(removeUserThunk()),
    getDiet: userId => dispatch(getDietThunk(userId)),
    getAllergy: userId => dispatch(getAllergyThunk(userId))
  };
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
    backgroundColor: "transparent",
    height: 65,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15
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
  },
  logOut: {
    color: "#F44336"
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
