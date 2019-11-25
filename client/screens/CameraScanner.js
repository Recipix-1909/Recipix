import React from "react";
import { StyleSheet, Text, View, Button, ScrollView } from "react-native";
import * as Permissions from "expo-permissions";
import { BarCodeScanner } from "expo-barcode-scanner";
import { saveItemThunk } from "../store/items";
import { connect } from "react-redux";

class CameraScanner extends React.Component {
  state = {
    hasCameraPermission: null,
    scanned: false
  };

  async componentDidMount() {
    this.getPermissionsAsync();
    this.saveItem();
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

  handleBarCodeScanned = ({ type, data }) => {
    this.setState({ scanned: true });
    this.saveItem(data); // how do we grab userID?
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
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
    saveItem: (userId, item) => dispatch(saveItemThunk(userId, item))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CameraScanner);
