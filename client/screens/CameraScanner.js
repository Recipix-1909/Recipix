import React from "react";
import { StyleSheet, Text, View, Button, ScrollView } from "react-native";
import * as Permissions from "expo-permissions";
import { BarCodeScanner } from "expo-barcode-scanner";
import { addItemThunk } from "../store/items";
import { getFridgeItemsThunk } from "../store/fridge";
import { connect } from "react-redux";
import DatePickerIOS from "react-native-datepicker";
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
    date: "11-27-2019"
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
          <Button
            title={"Tap to Scan Again"}
            onPress={() => this.setState({ scanned: false })}
          />
        )}
      </View>
    );
  }

  expirationDatePopup = () => {
    alert("In the expiration date popup");

    return (
      <Modal>
        <View style={styles.container}>
          <DatePickerIOS
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
          />
        </View>
      </Modal>
    );
  };

  handleBarCodeScanned = async ({ type, data }) => {
    await this.expirationDatePopup();
    this.setState({ scanned: true });
    await this.props.addItem(1, data, "01.01.2020"); // how do we grab userID?
    await this.props.getFridgeItems(1);
    alert("Added item to fridge!");
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
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
