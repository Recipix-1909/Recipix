import React from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  // Button,
  View,
  Modal,
  Dimensions,
  ImageBackground,
  TouchableHighlight,
  Alert,
  Button
} from "react-native";

import { connect } from "react-redux";
import { getSingleRecipeThunk } from "../store/recipes";


const SingleRecipe = props =>    {
        console.log('SINGLE RECIPE COMPONENT PROPS', props.navigation.state.params.recipe)
        const recipe = props.navigation.state.params.recipe
        return(
            <View>
            <Button title='go back' onPress={()=>props.navigation.actions.goBack()}/>
            <Text>HELLO THIS IS A TEST</Text>
            </View>
        )
            
        
    }

const style = StyleSheet.create({})

export default SingleRecipe