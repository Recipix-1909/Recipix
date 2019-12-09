// import * as WebBrowser from "expo-web-browser";
import React from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  Modal,
  Dimensions,
  View,
  Image
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
import { TouchableHighlight } from "react-native-gesture-handler";

class UserProfile extends React.Component {
  static navigationOptions = {
    headerTitle: "Profile",
    headerStyle: {
      backgroundColor: "#00ffcc"
    },
    headerTitleStyle: {
      fontFamily: "Gill Sans",
      color: "white",
      fontSize: 25
    }
  };
  state = {
    isDietVisible: false,
    isAllergyVisible: false,
    allDiets: [],
    allAllergies: []
  };

  async componentDidMount() {
    await this.props.getDiet(this.props.user.id);
    await this.props.getAllergy(this.props.user.id);

    // getting all diets and allergies from database
    const { data: allDiets } = await axios.get(`${ip}/api/diet`);
    const { data: allAllergies } = await axios.get(`${ip}/api/allergy`);
    this.setState({ allDiets, allAllergies });
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

  logOutSubmit = () => {
    this.props.removeUser();
    this.props.navigation.navigate("Log");
  };

  render() {
    const dietOptions = this.state.allDiets;
    const allergyOptions = this.state.allAllergies;
    return (
      <View
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.userInfo}>
          <Image
            source={require("../other/icon.png")}
            style={{ width: 100, height: 100 }}
          ></Image>

          <Text style={styles.userText}>
            Name: {this.props.user.firstName} {this.props.user.lastName}
          </Text>
          <Text style={styles.userText}>Email: {this.props.user.email}</Text>
        </View>
        <View style={styles.dietInfo}>
          <Text style={styles.userTextHeader}>
            Dietary restrictions or allergies? Set preferences below!{" "}
          </Text>
          <View
            style={{
              flexDirection: "row"
            }}
          >
            <TouchableHighlight
              style={styles.button}
              onPress={() => {
                this.setDietVisible();
              }}
            >
              <Text style={styles.buttonText}>DIETARY</Text>
            </TouchableHighlight>

            <TouchableHighlight
              style={styles.button}
              onPress={() => {
                this.setAllergyVisible();
              }}
            >
              <Text style={styles.buttonText}>ALLERGY</Text>
            </TouchableHighlight>
          </View>
          {/* -------- DIET MODAL-------- */}
          <Modal
            animationType="fade"
            transparent={true}
            visible={this.state.isDietVisible}
            style={styles.modalContent}
          >
            <View style={styles.modalExterior}>
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
                  this.setDietVisible();
                }}
              />
              <ScrollView
                style={styles.modalInterior}
                contentContainerStyle={{ flexGrow: 1 }}
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
            </View>
          </Modal>
          {/* -------- ALLERGY MODAL-------- */}
          <Modal
            animationType="fade"
            transparent={true}
            visible={this.state.isAllergyVisible}
            style={styles.modalContent}
          >
            <View style={styles.modalExterior}>
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
                  // width: 40,
                  // height: 40,
                  alignSelf: "flex-end"
                }}
                onPress={() => {
                  this.setAllergyVisible();
                }}
              />
              <ScrollView
                style={styles.modalInterior}
                contentContainerStyle={{ flexGrow: 1 }}
              >
                {allergyOptions.map(curr => {
                  return (
                    <View key={curr.id} style={{}}>
                      <AllergyCheckbox
                        isChecked={this.isChecked(curr, this.props.allergies)}
                        allergy={curr}
                      />
                    </View>
                  );
                })}
              </ScrollView>
            </View>
          </Modal>
        </View>

        <View style={styles.logOutView}>
          <Text style={styles.userText}>
            Not {this.props.user.firstName}?{" "}
            <Text style={styles.logOut} onPress={() => this.logOutSubmit()}>
              Log out
            </Text>
          </Text>
        </View>
      </View>
    );
  }
}

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
    fontFamily: "Gill Sans",
    backgroundColor: "#E0FEFE",
    justifyContent: "space-between",
    flexDirection: "column",
    alignItems: "center"
  },
  logOut: {
    color: "#F44336",
    fontFamily: "Gill Sans"
  },
  logOutView: {
    padding: 10,
    justifyContent: "flex-end"
  },
  userText: {
    alignSelf: "stretch",
    fontFamily: "Gill Sans",
    fontSize: 18
  },
  userTextHeader: {
    alignSelf: "stretch",
    fontFamily: "Gill Sans",
    fontSize: 22,
    textAlign: "center"
  },
  userInfo: {
    padding: 10,
    flexDirection: "column",
    alignItems: "center",
    flex: 1
  },
  dietInfo: {
    padding: 10,
    flex: 1,
    flexDirection: "column",
    alignItems: "center"
  },
  button: {
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 15,
    padding: 10,
    margin: 10,
    fontFamily: "Gill Sans"
  },
  buttonText: {
    fontFamily: "Gill Sans",
    fontSize: 20
  },
  modalExterior: {
    backgroundColor: "#00ffcc",
    borderRadius: 15,
    paddingTop: 0,
    padding: 20,
    fontFamily: "Gill Sans",
    margin: 30,
    marginTop: 100,
    marginBottom: 125
  },
  modalInterior: {
    backgroundColor: "white",
    borderRadius: 15,
    fontFamily: "Gill Sans",
    margin: 0,
    flexDirection: "column"
  },
  modalContent: {
    justifyContent: "center",
    alignItems: "center",
    margin: 30
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
