import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { ListItem } from "react-native-elements";
import { Icon, Button } from "react-native-elements";
import { deleteItemThunk } from "../store/fridge";
import { connect } from "react-redux";

function RecipeThumbnail(props) {
  console.log("this is PROPS.RECIPE", props.recipe);
  return (
    <View>
      <Text>{props.recipe.title}</Text>
      {/* <Image source={props.recipe.image}></Image> */}
    </View>
  );
}

export default RecipeThumbnail;
