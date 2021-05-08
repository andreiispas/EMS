import React, { Component } from "react";
import { View, Text, TouchableOpacity, TextInput, YellowBox, Keyboard } from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import styles from "./styles";
import * as firebase from 'firebase';

const db = firebase.firestore();
const auth = firebase.auth();

class WLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {

      name: null,
      email: null,
      password: null,
      shift: 'Morning',
      flag: null,
      userType: 'w'

    }

  }

  navigate1(screen) {
    this.props.navigation.navigate(screen);
  }

  async componentDidMount() {

    var day = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year

    if (day < 10) {
      day = '0' + day;
    }
    if (month < 10) {
      month = '0' + month;
    }
    var today = day + '-' + month + '-' + year;

    this.setState({ date: today });


    var name1 = await AsyncStorage.getItem('name');
    var email1 = await AsyncStorage.getItem('email');

    if (email1 != null) {

      this.setState({ email: email1, name: name1 });
    }






  }



  signIn = async () => {
    let name1 = this.state.name;
    let email1 = this.state.email;
    let password1 = this.state.password;
    let shift1 = this.state.shift;

    try {
      await AsyncStorage.setItem('name', name1);
      await AsyncStorage.setItem('email', email1);
    } catch (error) {
      console.log(error);
      // Error saving data
    }

    if (email1 != null && password1 != null) {
      //     alert(name1+ ' '+email1+ ' '+password1+ ' '+shift1);
      await auth.signInWithEmailAndPassword(email1, password1)
        .then(() => {
          //console.log('User account created & signed in!');
          this.navigate1('WDash');

        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            alert("That email address is already in use!")
          }

          if (error.code === 'auth/invalid-email') {
            alert("That email address is invalid!")
          }
          else {
            alert(error.code)
          }

        });


    } else {
      alert('Enter Email and password')
    }


  }

  signUp = async () => {
    let name1 = this.state.name;
    let email1 = this.state.email;
    let password1 = this.state.password;
    let shift1 = this.state.shift;
    let userType1 = this.state.userType;
    try {
      await AsyncStorage.setItem('name', name1);
      await AsyncStorage.setItem('email', email1);
    } catch (error) {
      console.log(error);
      // Error saving data
    }


    if (email1 != 55 && password1 != null) {
      if (name1 != null && shift1 != null) {

        await auth
          .createUserWithEmailAndPassword(email1, password1)
          .then(() => {
            this.addFbUser(name1, email1, shift1, userType1);

            console.log('User account created & signed in!');
          })
          .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
              console.log('That email address is already in use!');
            }

            if (error.code === 'auth/invalid-email') {
              console.log('That email address is invalid!');
            }

            console.error(error);
          });


      } else {
        alert('Enter Name and Shift');
      }

    } else {
      //   alert('Enter email and password');
    }




  }

  addFbUser = async (name2, email2, shift2, userType2) => {
    //    alert(name2+ ' '+email2+ ' '+password2+ ' '+shift2+' '+userType2);
    // var newPostKey = firebase.database().ref().child('stud/').push().key;
    // let users = firebase.database().ref().child('users/'+newPostKey );

    await db.collection('users').add({
      userName: name2,
      email: email2,
      userType: userType2,
      shift: shift2
    })
      .then(() => {
        this.navigate1('WDash');

      });

  }


  render() {

    let wShift = [{
      value: 'Morning',
    }, {
      value: 'Evening',
    }, {
      value: '9-5',
    },
    {
      value: '12-8',
    }];

    return (
      <View style={styles.container}>


        <View style={styles.myHeader}>

          <Text style={{ color: "#ffffff", fontSize: RFPercentage(3), textAlign: 'center' }}>Worker</Text>

        </View>
        <View style={{ flexDirection: 'column', width: wp(100), height: hp(85), alignItems: 'center', justifyContent: 'center' }}>

          <View style={styles.LoginTextInpuView}>
            <View style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
              <Text style={{ fontSize: RFPercentage(2), color: '#333', marginBottom: 1 }}>name</Text>
              <TextInput style={styles.textInput}
                ref={input => { this.textInput1 = input }}
                placeholder='-----'
                onChangeText={name => { this.setState({ name }) }}
                value={this.state.name}
                returnKeyType='next'
                blurOnSubmit={false}

                onSubmitEditing={() => this.textInput2.focus()}
              />
            </View>
            <View style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
              <Text style={{ fontSize: RFPercentage(2), color: '#333', marginBottom: 1 }}>email</Text>
              <TextInput style={styles.textInput}
                ref={input => { this.textInput2 = input }}
                placeholder='------@----'
                onChangeText={email => { this.setState({ email }) }}
                value={this.state.email}
                returnKeyType='next'
                blurOnSubmit={false}

                onSubmitEditing={() => this.textInput3.focus()}
              />
            </View>
            <View style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
              <Text style={{ fontSize: RFPercentage(2), color: '#333', marginBottom: 1 }}>password</Text>
              <TextInput style={styles.textInput}
                ref={input => { this.textInput3 = input }}
                placeholder='*******'
                onChangeText={password => { this.setState({ password }) }}
                value={this.state.password}
                returnKeyType='done'
                secureTextEntry={true}
                blurOnSubmit={false}

                onSubmitEditing={() => Keyboard.dismiss()}
              />
            </View>
          </View>

          {/* <Dropdown
           label='Shift'
           data={wShift}
           onChangeText={shift => { this.setState({ shift }) }}
           value={this.state.shift}
          /> */}

          <View style={styles.LoginSubmitView}>
            <TouchableOpacity style={styles.signInButton} onPress={() => this.signIn()}>
              <Text style={styles.signButtonsText}>Sign In</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.signUpButton} onPress={() => this.signUp()}>
              <Text style={styles.signButtonsText}>Sign Up</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    );
  }
}

export default WLogin;





