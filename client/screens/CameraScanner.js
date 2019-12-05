import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  TextInput,
  Dimensions,
  TouchableHighlight
} from "react-native";
import * as Permissions from "expo-permissions";
import { BarCodeScanner } from "expo-barcode-scanner";
import { addItemThunk } from "../store/items";
import {
  getFridgeItemsThunk,
  getFridgeItemsManualThunk
} from "../store/fridge";
import { connect } from "react-redux";
import DatePicker from "react-native-datepicker";
import Modal from "react-native-modal";
import getDate from "./utils";

class CameraScanner extends React.Component {
  state = {
    hasCameraPermission: null,
    scanned: false,
    date: getDate(),
    type: null,
    data: null,
    manualName: null,
    scannedName: null,
    successScanModal: false,
    manualAddModal: false,
    failureScanModal: false
  };

  async componentDidMount() {
    this.getPermissionsAsync();
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
          justifyContent: "flex-end",
          alignItems: "center"
        }}
      >
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
        {
          // MANUAL ADD START
          <Modal
            isVisible={this.state.manualAddModal}
            transparent={true}
            animationType="fade"
          >
            <View style={styles.modalExterior}>
              <View style={styles.modalInterior}>
                <TextInput
                  style={styles.textInput}
                  onChangeText={text => this.setState({ manualName: text })}
                  autoCapitalize="words"
                  placeholder="Enter food name here!"
                  maxLength={20}
                />
                <Text style={styles.modalText}>
                  Set expiration date (optional)
                </Text>
                <DatePicker
                  style={styles.datePicker}
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
                ></DatePicker>
              </View>
              <TouchableHighlight
                onPress={() => this.handleManualInput()}
                style={styles.modalButton}
              >
                <Text>Add</Text>
              </TouchableHighlight>
              <TouchableHighlight
                onPress={() => this.setState({ manualAddModal: false })}
                style={styles.modalButton}
              >
                <Text>Cancel</Text>
              </TouchableHighlight>
            </View>
          </Modal>
          // END OF MANUAL START
        }
        {scanned && (
          // START OF SUCCESSFUL SCAN

          <Modal isVisible={this.state.successScanModal} transparent={true}>
            <View style={styles.modalExterior}>
              <View style={styles.modalInterior}>
                <Text style={styles.modalText}>
                  Set expiration date below (optional)
                </Text>
                <DatePicker
                  style={styles.datePicker}
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
                ></DatePicker>
              </View>
              <TouchableHighlight
                onPress={() => this.handleScanAdd()}
                style={styles.modalButton}
              >
                <Text style={styles.modalText}>Add to Fridge</Text>
              </TouchableHighlight>
              <TouchableHighlight
                onPress={() => this.setState({ scanned: false })}
                style={styles.modalButton}
              >
                <Text style={styles.modalText}>Cancel</Text>
              </TouchableHighlight>

              {/* <TouchableHighlight
                  onPress={() => this.handleBackToFridge()}
                  style={styles.modalButton}
                >
                  <Text style={styles.modalText}>Back to Fridge</Text>
                </TouchableHighlight> */}
            </View>
          </Modal>
        )}

        <Modal isVisible={this.state.failureScanModal}>
          <View style={styles.modalExterior}>
            <View style={styles.modalInterior}>
              <Text style={styles.modalText}>
                Sorry! We couldn't find details for that item. Trying adding it
                manually.
              </Text>

              <TouchableHighlight
                onPress={() => this.setState({ failureScanModal: false })}
                style={styles.modalButton}
              >
                <Text style={styles.modalText}>Dismiss</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
        <Text
          style={{
            fontSize: 16,
            textAlign: "center",
            backgroundColor: "#ffffff",
            color: "#000000"
          }}
        >
          Hold camera over barcode to scan an item or manually add an item
          below.
        </Text>
        <View>
          <TouchableHighlight
            style={styles.modalButton}
            onPress={() => this.setState({ manualAddModal: true })}
          >
            <Text>Add Manually</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  handleBackToFridge = async () => {
    this.setState({
      successScanModal: false,
      manualAddModal: false,
      failureScanModal: false,
      scanned: false,
      date: getDate()
    });
    await this.props.getFridgeItems(this.props.user.id);
    this.props.navigation.navigate("Fridge");
  };

  handleScanAdd = async () => {
    if (this.state.date === getDate()) {
      await this.props.addItem(this.props.user.id, this.state.data);
    } else
      await this.props.addItem(
        this.props.user.id,
        this.state.data,
        this.state.date
      );

    this.setState({ scannedName: this.props.lastItem });

    if (this.state.scannedName === "error") {
      this.setState({
        successScanModal: false,
        scanned: false,
        date: getDate(),
        failureScanModal: true
      });
    } else {
      this.setState({ scanned: false, scannedName: null, date: getDate() });
      await this.props.getFridgeItems(this.props.user.id);
    }
  };

  handleManualInput = async () => {
    if (this.state.date === getDate()) {
      await this.props.getFridgeItemsManual(
        this.props.user.id,
        this.state.manualName
      );
    } else
      await this.props.getFridgeItemsManual(
        this.props.user.id,
        this.state.manualName,
        this.state.date
      );

    this.setState({ manualAddModal: false, manualName: null, date: getDate() });
  };

  handleBarCodeScanned = async ({ type, data }) => {
    this.setState({
      scanned: true,
      successScanModal: true,
      type: type,
      data: data
    });
  };
}

const mapStateToProps = state => {
  return {
    lastItem: state.lastItem,
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addItem: (userId, serialNum, expirationDate) =>
      dispatch(addItemThunk(userId, serialNum, expirationDate)),
    getFridgeItems: userId => dispatch(getFridgeItemsThunk(userId)),
    getFridgeItemsManual: (userId, itemName, expirationDate) =>
      dispatch(getFridgeItemsManualThunk(userId, itemName, expirationDate))
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
  },
  modalExterior: {
    backgroundColor: "#78ffe4",
    padding: 20,
    borderRadius: 15
  },
  modalInterior: {
    backgroundColor: "white",
    borderRadius: 15
  },
  modalButton: {
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 15,
    padding: 10,
    margin: 10,
    underlayColor: "white"
  },
  modalText: {
    color: "black",
    textAlign: "center",
    margin: 10
  },
  datePicker: {
    margin: 10,
    alignSelf: "center"
    //  width: 200
  },
  textInput: {
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    margin: 10
  }
});
