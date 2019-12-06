import React from "react";
import { Provider } from "react-redux";
import {
  StyleSheet,
  KeyboardAvoidingView,
  Image,
  ScrollView,
  View,
  Button,
  ActivityIndicator,
  TextInput,
  Text
} from "react-native";
import { connect } from "react-redux";
import { getUserThunk, createUserThunk } from "../store/users";
import Card from "../other/Card";
import Color from "../other/Color";
import { LinearGradient } from "expo-linear-gradient";

class Auth extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      form: false
    };
    this.loginSubmit = this.loginSubmit.bind(this);
    this.signUpSubmit = this.signUpSubmit.bind(this);
    this.changeForm = this.changeForm.bind(this);
  }

  loginSubmit = async () => {
    const email = this.state.email;
    const password = this.state.password;
    let user = { email, password };
    this.setState({ isLoading: true });
    try {
      await this.props.getUser(user);
      this.props.navigation.navigate("Main");
    } catch (error) {
      alert("Wrong email or password, please try again");
    }
  };

  signUpSubmit = async () => {
    const firstName = this.state.firstName;
    const lastName = this.state.lastName;
    const email = this.state.email;
    const password = this.state.password;
    let newUser = { firstName, lastName, email, password };
    try {
      await this.props.createUser(newUser);
      this.loginSubmit();
    } catch (error) {
      alert("Something went wrong");
    }
  };

  changeForm() {
    this.setState({
      form: !this.state.form
    });
  }

  render() {
    return (
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={50}
        style={styles.screen}
      >
        <LinearGradient colors={["#00ffcc", "#00ffcc"]} style={styles.gradient}>
          <Image
            source={require("../other/flogo.png")}
            style={{ width: 225, height: 225 }}
          />
          {!this.state.form ? (
            <Card style={styles.authContainer}>
              <ScrollView>
                <TextInput
                  style={styles.input}
                  placeholder="email"
                  onChangeText={input => this.setState({ email: input })}
                  errorText="Please enter valid email"
                />
                <TextInput
                  style={styles.input}
                  placeholder="password"
                  onChangeText={input => {
                    this.setState({ password: input });
                  }}
                  secureTextEntry
                />

                <View style={styles.buttonContainer}>
                  <Button
                    title="Log in"
                    color={Color.primary}
                    onPress={() => this.loginSubmit()}
                  />
                  <Button
                    title="Sign Up"
                    color={Color.accent}
                    onPress={() => this.changeForm()}
                  />
                </View>
              </ScrollView>
            </Card>
          ) : (
            <Card style={styles.authContainer}>
              <ScrollView>
                <TextInput
                  style={styles.input}
                  placeholder="First Name"
                  onChangeText={input => this.setState({ firstName: input })}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Last Name"
                  onChangeText={input => this.setState({ lastName: input })}
                />
                <TextInput
                  style={styles.input}
                  placeholder="email"
                  onChangeText={input => this.setState({ email: input })}
                />
                <TextInput
                  style={styles.input}
                  placeholder="password"
                  onChangeText={input => this.setState({ password: input })}
                  secureTextEntry
                />
                <View style={styles.buttonContainer}>
                  <Button
                    title="Log in"
                    color={Color.accent}
                    onPress={() => this.changeForm()}
                  />
                  <Button
                    title="Sign Up"
                    color={Color.primary}
                    onPress={() => this.signUpSubmit()}
                  />
                </View>
              </ScrollView>
            </Card>
          )}
        </LinearGradient>
      </KeyboardAvoidingView>
    );
  }
}

Auth.navigationOptions = {
  headerTitle: "Welcome",
  headerStyle: {
    color: "#00ffcc"
  }
};

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  authContainer: {
    width: "80%",
    maxWidth: 400,
    maxHeight: 400,
    padding: 20
  },
  buttonContainer: {
    marginTop: 10
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 2
  },
  image: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUser: user => dispatch(getUserThunk(user)),
    createUser: newUser => dispatch(createUserThunk(newUser))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
