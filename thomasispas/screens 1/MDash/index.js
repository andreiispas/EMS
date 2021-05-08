
//import React from 'react';
/// import React, { Component } from "react";
import React, { Component } from "react";
import { View, Text, TouchableOpacity, Image, YellowBox, ImageBackground } from "react-native";
import AsyncStorage from '@react-native-community/async-storage';


//import inAppMessaging from '@react-native-firebase/in-app-messaging';

import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import * as firebase from 'firebase';
const db = firebase.firestore();



import styles from './styles';

class MDash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chat: null,
      messages: [],
      date: null,
      name: null,
      email: null,
      senderId: null,
      receiveId: null,
      chatModalVisible: false,
      currentuser: {}

    }

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
            this.setState({ currentuser: doc.data() })
          })

        })
    })
  }

  render() {
    let { currentuser } = this.state
    return (
      <View style={styles.container}>
        <View
          style={{
            backgroundColor: '#617EF2',
            height: hp(15),
            flexDirection: 'row',
            justifyContent: "space-between",
            paddingTop: 30,
            paddingHorizontal: 10
          }}>
          <Text
            style={{
              color: '#ffffff',
              fontSize: 18,
              marginTop: 40
            }}>
            Dashboard
            </Text>
          <View style={{ width: 100, justifyContent: "center", alignItems: "center" }}>

            <Image
              style={{ marginLeft: wp(5) }}
              style={{ height: 40, width: 40, borderRadius: 30 }}
              source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlq8pEl5Qb1YrUBBtfV2dfXFmePUUBt47eRw&usqp=CAU" }}
            />
            <Text
              style={{
                color: '#ffffff',
                textAlign: 'center',
              }}>
              {currentuser.userName}
            </Text>
          </View>
        </View>


        <View style={{ width: wp(100), height: hp(85), alignItems: 'center', justifyContent: 'center' }}>

          <TouchableOpacity style={styles.myButton1} onPress={() => this.navigate1('StockManagement')}>
            <Text style={styles.text1}>Stock Management</Text>
          </TouchableOpacity>
          <View style={{ height: hp(0.5), width: wp(30), backgroundColor: '#617EF2', margin: hp(2) }} />
          <TouchableOpacity style={styles.myButton2} onPress={() => this.navigate1('ShiftManagement')}>
            <Text style={styles.text1}>Shift Management</Text>
          </TouchableOpacity>
          <View style={{ height: hp(0.5), width: wp(30), backgroundColor: '#617EF2', margin: hp(2) }} />
          <TouchableOpacity style={styles.myButton1} onPress={() => this.navigate1('MChat')}>
            <Text style={styles.text1}>Worker Chat</Text>
          </TouchableOpacity>
          <View style={{ height: hp(0.5), width: wp(30), backgroundColor: '#617EF2', margin: hp(2) }} />
        </View>

      </View>
    );
  }
}

export default MDash;
