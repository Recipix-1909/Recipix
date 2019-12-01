import React from 'react'
import {Provider} from 'react-redux'
import {StyleSheet, ScrollView, View, Button, Alert, TextInput} from 'react-native'
import {connect} from 'react-redux'
import {getUserThunk, createUserThunk} from '../store/users'
import store from '../store'

class Auth extends React.Component {
    constructor(props){
        super(props)
      
      this.state= {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        form: false,
        error: false
      }
      this.loginSubmit=this.loginSubmit.bind(this)
      this.signUpSubmit=this.signUpSubmit.bind(this)
      this.changeForm=this.changeForm.bind(this)
    }

    loginSubmit = async () => {
        console.log('hit!!!!!')
        const email = this.state.email
        const password = this.state.password
        let user = {email, password}
        try {
            await this.props.getUser(user)
            this.props.navigation.navigate('Main')
        } catch (error) {
            alert('Wrong email or password, please try again')
        }
        this.props.getUser(user)
    }

    signUpSubmit = async () => {
        const firstName = this.state.firstName
        const lastName = this.state.lastName
        const email = this.state.email
        const password = this.state.password
        let newUser = { firstName, lastName, email, password}
        try {
            await this.props.createUser(newUser)
        } catch (error) {
            alert('Something went wrong')
        }
        
   
    }

    changeForm(){
        this.setState({
            form: !this.state.form
        })
    }


   render(){
    return(
        <Provider store={store}>
            <View style={styles.screen}>
                    {!this.state.form ? (
                <View style={styles.screen}>
                    <ScrollView contentContainerStyle={styles.container}>
                        <TextInput 
                         placeholder='email'
                         onChangeText={(input) => this.setState({email:input})}
                         errorText='Please enter valid email'
                         
                      />
                        <TextInput 
                         placeholder='password'
                         onChangeText={(input) => this.setState({password:input})}
                         secureTextEntry
                        />
            
                        
                        <Button title='Log in' onPress={()=>this.loginSubmit()} />
                        <Button title='Sign Up' onPress={()=>this.changeForm()} />
                    </ScrollView>
                </View>
                     ) : (
                <View style={styles.screen}>
                    <ScrollView contentContainerStyle={styles.container}>
                        <TextInput
                        placeholder='First Name'
                        onChangeText={(input) => this.setState({firstName:input})}
                        />
                        <TextInput
                        placeholder='Last Name'
                        onChangeText={(input) => this.setState({lastName:input})}
                        />
                        <TextInput
                        placeholder='email'
                        onChangeText={(input) => this.setState({email:input})}
                        />
                         <TextInput
                        placeholder='password'
                        onChangeText={(input) => this.setState({passsword:input})}
                        secureTextEntry
                        />
                        <Button title='Log in' onPress={()=>this.changeForm()} />
                        <Button title='Sign Up' onPress={()=>this.signUpSubmit()} />
                    </ScrollView>
                </View>       
                    )}
                </View>
        </Provider>
    )
    }
}

const styles = StyleSheet.create({
    screen:{
        flex: 1,
    },
    container:{
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
   
})


const mapStateToProps = state =>{
    return{
        user:state.user
    }
}

const mapDispatchToProps = dispatch => {
    return{
        getUser: (user)=>dispatch(getUserThunk(user)),
        createUser: (newUser)=>dispatch(createUserThunk(newUser))
    }
}

export default connect (mapStateToProps, mapDispatchToProps)(Auth)





