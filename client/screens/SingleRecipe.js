import React, { Component } from 'react'
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
} from 'react-native'

import { connect } from 'react-redux'
import { getSingleRecipeThunk } from '../store/recipes'

class SingleRecipe extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      instructions: []
    }
  }

  async componentDidMount() {
    const recipe = this.props.navigation.state.params.recipe
    await this.props.getSingleRecipe(recipe.id)
    this.setState({ instructions: this.props.recipe })

    console.log('this this.state!!!!!!!!!!!!!!!!!', this.state)
    console.log('PROOPS', recipe.image)
  }

  render() {
    // console.log("this is this.props", this.props);
    const recipe = this.props.navigation.state.params.recipe
    console.log('PROOPS', recipe)
    return (
      <ScrollView>
        <Image
          style={{
            width: Dimensions.get('window').width,
            height: 350,
            justifyContent: 'center'
          }}
          source={{
            uri: `https://spoonacular.com/recipeImages/${recipe.id}-312x231.${recipe.imageType}`
          }}
        />
        <Text>{recipe.title}</Text>
        <Text>Used ingredients</Text>
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
          {recipe.usedIngredients.map(ingred => {
            return (
              <View key={ingred.id} style={{}}>
                <Text>{ingred}</Text>
              </View>
            )
          })}
        </ScrollView>
        <Text>Missing ingredients</Text>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: 12
  }
})

const mapDispatchToProps = dispatch => {
  return {
    getSingleRecipe: id => dispatch(getSingleRecipeThunk(id))
  }
}

const mapStateToProps = state => {
  return {
    recipe: state.recipe
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleRecipe)
