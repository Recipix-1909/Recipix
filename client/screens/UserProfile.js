// import * as WebBrowser from "expo-web-browser";
import React from 'react'
import {
  // Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  Modal,
  Dimensions,
  // TouchableOpacity,
  View
} from 'react-native'
import { Icon, Button } from 'react-native-elements'
import { getDietThunk } from '../store/profile'
import { connect } from 'react-redux'
import { removeUserThunk } from '../store/users'
import { addDietThunk } from '../store/profile'
import DietCheckbox from '../components/DietCheckbox'

// import { MonoText } from "../components/StyledText";

class UserProfile extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isDietVisible: false,
      isAllergyVisible: false
    }

    this.logOutSubmit = this.logOutSubmit.bind(this)
    this.setAllergyVisible = this.setAllergyVisible.bind(this)
    this.setDietVisible = this.setDietVisible.bind(this)
  }

  isChecked(current, all) {
    return all.some(diet => current === diet.name)
  }

  setDietVisible() {
    this.setState({ isDietVisible: !this.state.isDietVisible })
  }

  setAllergyVisible() {
    this.setState({ isAllergyVisible: !this.state.isAllergyVisible })
  }

  submitHandleDiet(diet) {
    this.addDiet(this.props.user.id, diet)
  }

  componentDidMount() {
    this.props.getDiet(this.props.user.id)
  }

  logOutSubmit = () => {
    this.props.removeUser()
    this.props.navigation.navigate('Log')
  }

  render() {
    console.log(this.props.diet)
    const dietOptions = [
      'Ketogenic',
      'Gluten Free',
      'Vegetarian',
      'Lacto-Vegetarian',
      'Ovo-Vegetarian',
      'Vegan',
      'Paleo',
      'Pescatarian',
      'Primal',
      'Whole30'
    ]

    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.getStartedContainer}>
            <Text style={styles.getStartedText}>User Profile</Text>

            <Modal
              animationType="fade"
              transparent={true}
              // visible={this.state.isDietVisible}

              visible={true}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#00000080'
                }}
              >
                {/* View for Inner Box */}
                <View
                  style={{
                    width: Dimensions.get('window').width * 0.85,
                    height: Dimensions.get('window').height * 0.85,
                    backgroundColor: '#DABFDE',
                    padding: 20,
                    paddingBottom: 75,
                    borderRadius: 15
                  }}
                >
                  <ScrollView
                    style={{
                      flex: 1,
                      flexDirection: 'column',
                      marginTop: 40
                    }}
                    contentContainerStyle={{
                      justifyContent: 'space-evenly',
                      alignItems: 'center'
                    }}
                  >
                    {dietOptions.map(curr => {
                      return (
                        <View key={curr.id} style={{}}>
                          <DietCheckbox
                            key={curr}
                            isChecked={this.isChecked(curr, this.props.diet)}
                            name={curr.name}
                          />
                        </View>
                      )
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
                        flexDirection: 'column-reverse',
                        marginTop: 2
                      }}
                      onPress={() => {
                        this.setDietvisible()
                      }}
                    />
                  </View>

                  <View style={styles.tabBarInfoContainer}>
                    <Button
                      raised
                      type="outline"
                      title="Submit Diet"
                      onPress={() => {
                        console.log('yo')
                        this.setModalVisible(false)
                        this.props.getFilteredRecipes(this.props.filteredItems)
                        // this.setState({
                        //   filteredItems: this.props.filteredItems
                        // });
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
    )
  }
}

UserProfile.navigationOptions = {
  header: null
}

const mapStateToProps = state => {
  return {
    user: state.user,
    diet: state.diet
  }
}

const mapDispatchToProps = dispatch => {
  return {
    removeUser: () => dispatch(removeUserThunk()),
    getDiet: userId => dispatch(getDietThunk(userId)),
    addDiet: (userId, diet) => dispatch(addDietThunk(userId, diet))
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B5EAD7'
  },
  contentContainer: {
    paddingTop: 30
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50
  },
  homeScreenFilename: {
    marginVertical: 7
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)'
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center'
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3
      },
      android: {
        elevation: 20
      }
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center'
  },
  navigationFilename: {
    marginTop: 5
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center'
  },
  helpLink: {
    paddingVertical: 15
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7'
  },
  logOut: {
    color: '#F44336'
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile)
