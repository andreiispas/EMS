import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  Image,
  YellowBox,
  StyleSheet,
  Modal,
  Keyboard,
  ScrollView
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

//import inAppMessaging from '@react-native-firebase/in-app-messaging';

import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import * as firebase from 'firebase';

const db = firebase.firestore();

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from './styles';

class ShiftManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workers: [],
      userName: null,
      shift: null,
      email: null,
      shiftModalVisible: false,
      currentUser: {}
    };
  }
  navigate1 = (screen) => {
    this.props.navigation.navigate(screen);
  };

  async componentDidMount() {
    // alert(this.state.deviceId+' id2:-->'+deviceId2);
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

    // var name1 = await AsyncStorage.getItem('name');
    var email1 = await AsyncStorage.getItem('email');

    if (email1 != null) {
      this.setState({ senderId: email1 });
    }

    let temp = [];

    await db
      .collection('users')
      .where('userType', '==', 'w')
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          let key = doc.id;
          let data1 = doc.data();

          let userName = data1.userName;
          let email = data1.email;
          let shift = data1.shift;

          // alert(receiveId);
          temp.push({ key, userName, email, shift });
        });
        // console.log('shift_temp:' + JSON.stringify(temp));

        if (temp) {
          this.setState({ workers: temp });
        } else {
          alert('Can not connect to room');
        }

        //  console.log('shop_temp:' + JSON.stringify(shop_temp));
      })
      .catch((error) => {
        console.log('fb users:' + error);
      });

    await AsyncStorage.getItem("currentuser").then(res => {
      let data = JSON.parse(res)
      this.setState({ currentUser: data })
    })
  }

  updateShift = async () => {
    let email1 = this.state.email;
    let userName1 = this.state.userName;
    let key1 = this.state.key;
    let shift1 = this.state.shift;

    if (key1 !== null && email1 != null) {
      await db
        .collection('users')
        .doc(key1)
        .update({
          userName: userName1,
          email: email1,
          shift: shift1,
          userType: 'w',
        })
        .then(() => {
          console.log('shift updated!');

          this.shiftVisible(!this.state.shiftModalVisible);
          this.componentDidMount();
        });
    } else {
      alert('Error Data not found');
    }
  };

  shiftVisible = (visible) => {
    this.setState({ shiftModalVisible: visible });
  };

  changeShift = (userName, shift, email, key) => {
    this.setState({ userName: userName, shift: shift, email: email, key: key });
  };

  render() {
    let { currentUser } = this.state
    return (
      <View style={styles.container}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.shiftModalVisible}>
          <TouchableOpacity
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0,0,0,0.5)',
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                height: hp(50),
                width: wp(90),
                alignItems: 'center',
                backgroundColor: 'white',
                borderRadius: 10,
                justifyContent: 'center',
              }}>
              <Text style={{ fontSize: 20, color: 'black' }}>
                {this.state.userName}
              </Text>
              <View
                style={{
                  flexDirection: 'column',
                  width: '100%',
                  marginTop: '10%',
                }}>
                <View
                  style={{
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    marginLeft: '10%',
                  }}>
                  <Text
                    style={{ fontSize: 18, color: 'black', marginBottom: 1 }}>
                    shift
                  </Text>
                  <TextInput
                    style={styles.textInput}
                    ref={(input) => {
                      this.textInput3 = input;
                    }}
                    placeholder="shift"
                    onChangeText={(shift) => {
                      this.setState({ shift });
                    }}
                    value={this.state.shift}
                    returnKeyType="done"
                    blurOnSubmit={false}
                    onSubmitEditing={() => Keyboard.dismiss()}
                  />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: '8%',
                  }}>
                  <TouchableOpacity
                    style={styles.submitButton2}
                    onPress={() =>
                      this.shiftVisible(!this.state.shiftModalVisible)
                    }>
                    <Text style={styles.text1}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.submitButton2}
                    onPress={() => this.updateShift()}>
                    <Text style={styles.text1}>Change</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </Modal>

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
            Shift Management
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
              {currentUser.userName}
            </Text>
          </View>
        </View>









        <View>
          <FlatList
            style={{ height: hp(65), width: wp(100) }}
            data={this.state.workers}
            renderItem={({ item, index }) => (
              <ScrollView>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    margin: wp(1),
                  }}>
                  <Image
                    style={{
                      width: hp(8),
                      height: hp(8),
                      borderRadius: hp(4),
                      backgroundColor: '#d3d3d3',
                    }}
                  />
                  <View
                    style={{
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      justifyContent: 'flex-start',
                      marginLeft: wp(2),
                      width: wp(70),
                    }}>
                    <Text style={{ fontSize: 20, color: '#333' }}>
                      {item.userName}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                      }}>
                      <Text
                        style={{
                          fontSize: 15,
                          color: '#333',
                          textAlign: 'center',
                        }}>
                        {item.shift}
                      </Text>
                      <Text
                        style={{ fontSize: 15, color: '#333', marginLeft: 4 }}>
                        {item.email}
                      </Text>
                      {/* <Text style={{ fontSize: 15, color: '#333', marginLeft: 4 }}>{item.senderId}</Text>
                    <Text style={{ fontSize: 15, color: '#333', marginLeft: 4 }}>{item.receiveId}</Text> */}
                    </View>
                  </View>
                  <TouchableOpacity
                    on
                    onPress={() => {
                      this.shiftVisible(!this.state.chatModalVisible),
                        this.changeShift(
                          item.userName,
                          item.shift,
                          item.email,
                          item.key
                        );
                    }}>
                    <Icon name="update" size={hp(5)} color="#333" />
                  </TouchableOpacity>
                </TouchableOpacity>
              </ScrollView>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => this.navigate1('MDash')}>
            <Text style={{ color: '#FFFFFF', fontSize: 15, fontWeight: '400' }}>
              Back
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default ShiftManagement;
