import React from "react";
import { StyleSheet, Text, View, Button, ScrollView } from "react-native";
import * as Permissions from "expo-permissions";
import { BarCodeScanner } from "expo-barcode-scanner";
import { addItemThunk } from "../store/items";
import { getFridgeItemsThunk } from "../store/fridge";
import { connect } from "react-redux";
import DatePicker from "react-native-datepicker";
import Modal from "react-native-modal";

class CameraScanner extends React.Component {
  // constructor() {
  //   super()
  //   this.state = {
  //     hasCameraPermission: null,
  //     scanned: false
  //   };
  //   this.saveItem = this.saveItem.bind(this)
  // }
  state = {
    hasCameraPermission: null,
    scanned: false,
    date: "11-27-2019",
    isModal: false,
    type: "",
    data: ""
  };

  async componentDidMount() {
    this.getPermissionsAsync();
    // this.saveItem();
  }

  getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  };

  render() {
    const { hasCameraPermission, scanned } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "flex-end"
        }}
      >
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />

        {scanned && (
          <Modal isVisible={this.state.isModal}>
            <Text>Set expiration date (optional)</Text>
            <DatePicker
              style={{ width: 200 }}
              date={this.state.date} //initial date from state
              mode="date" //The enum of date, datetime and time
              placeholder="select date"
              format="MM-DD-YYYY"
              minDate="01-01-2019"
              maxDate="01-01-2025"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: "absolute",
                  left: 0,
                  top: 4,
                  marginLeft: 0
                },
                dateInput: {
                  marginLeft: 36
                }
              }}
              onDateChange={date => {
                this.setState({ date: date });
              }}
              onCloseModal={() => this.handleExpirationDate(this.state.date)}
            ></DatePicker>
            <Button
              title={"Tap to Scan Again"}
              onPress={() => this.setState({ scanned: false })}
            />
            <Button
              title={"Back to Fridge"}
              // need to navigate to the fridge here
              onPress={() => this.handleBackToFridge()}
            />
          </Modal>
        )}
        <Button
          title={"Tap to Scan Again"}
          onPress={() => this.setState({ scanned: false })}
        />
      </View>
    );
  }

  handleBackToFridge = async () => {
    this.setState({ isModal: false });
    this.props.navigation.navigate("Fridge");
    await this.props.addItem(1, this.state.data, this.state.date); // how do we grab userID?
    await this.props.getFridgeItems(1);
  };

  handleExpirationDate = async () => {
    console.log("this is this.props", this.props);
    await this.setState({ isModal: false });
    await this.props.addItem(1, this.state.data, this.state.date); // how do we grab userID?
    await this.props.getFridgeItems(1);
  };

  handleBarCodeScanned = async ({ type, data }) => {
    this.setState({ scanned: true, isModal: true, type: type, data: data });
  };
}

const mapStateToProps = state => {
  return {
    item: state.item,
    fridge_stock: state.fridge_stock
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addItem: (userId, serialNum, expirationDate) =>
      dispatch(addItemThunk(userId, serialNum, expirationDate)),
    getFridgeItems: userId => dispatch(getFridgeItemsThunk(userId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CameraScanner);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
    padding: 16
  }
});
