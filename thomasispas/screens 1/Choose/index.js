
import React, { Component } from "react";
import { View, Text, TouchableOpacity, Image, YellowBox } from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-community/async-storage';
import { firebaseApp } from '../FirebaseConfig';
import styles from "./styles";
import * as firebase from 'firebase';
const db = firebase.firestore();
const auth2 = firebase.auth();
class Choose extends Component {
  constructor(props) {
    super(props);
    this.state = {
      choose: null,
    }
    firebaseApp;

  }
  navigate1(screen) {
    this.props.navigation.navigate(screen);
  }

  async componentDidMount() {

    await firebase.auth().onAuthStateChanged(async (user) => {
      await db
        .collection('users')
        .where('email', '==', user.email)
        .get()
        .then((snapshot) => {
          snapshot.docs.map(async (doc) => {
            AsyncStorage.setItem("currentuser", JSON.stringify(doc.data()))
            console.log(doc.data().userType)
            if (doc.data().userType === "w") {
              this.props.navigation.navigate("WDash")
            }
            if (doc.data().userType === "m") {
              this.props.navigation.navigate("MDash")

            }

          })

        })
    })
  }


  render() {

    return (
      <View style={styles.container}>


        <View style={styles.myHeader}>
          <Text style={styles.heading}>Select Option</Text>
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center', height: hp(85), width: wp(100) }}>

          <TouchableOpacity style={styles.chooseButton1}
            onPress={() => this.navigate1('WLogin')}>
            <Text style={{ color: "#FFFFFF", fontSize: RFPercentage(3) }}>Worker</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.chooseButton2}
            onPress={() => this.navigate1('MLogin')}>
            <Text style={{ color: "#FFFFFF", fontSize: RFPercentage(3) }}>Admin</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default Choose;



