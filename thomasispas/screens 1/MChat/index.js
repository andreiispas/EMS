import React, { Component } from "react";
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
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

//import inAppMessaging from '@react-native-firebase/in-app-messaging';

import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

//import { firebaseApp } from './FirebaseConfig';

import * as firebase from "firebase";
const db = firebase.firestore();

import Icon from "react-native-vector-icons/FontAwesome";

class MChat extends Component {
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
      currentUser: {},
    };
  }

  navigate1(screen) {
    this.props.navigation.navigate(screen);
  }

  async componentDidMount() {
    // alert(this.state.deviceId+' id2:-->'+deviceId2);
    var day = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year

    if (day < 10) {
      day = "0" + day;
    }
    if (month < 10) {
      month = "0" + month;
    }
    var today = day + "-" + month + "-" + year;

    this.setState({ date: today });

    // var name1 = await AsyncStorage.getItem('name');
    var email1 = await AsyncStorage.getItem("email");

    if (email1 != null) {
      this.setState({ senderId: email1 });
    }

    let temp = [];

    await db
      .collection("messages")
      .get()
      .then((snapshot) => {
        const data1 = snapshot.docs.map((doc) => doc.data());
        let mes = ([] = data1.slice());
        mes.forEach((element) => {
          let userName = element.userName;
          let senderId = element.senderId;
          let time = element.time;
          let message = element.message;
          //let userType=element.userType;
          let receiveId = element.receiveId;
          // alert(receiveId);
          temp.push({ senderId, userName, message, time, receiveId });
        });
        console.log("chat_temp:" + JSON.stringify(temp));

        if (temp) {
          this.setState({ messages: temp });
          if (temp.length === 0) {
            this.setState({ chatModalVisible: true });
          }
        } else {
          alert("Can not connect to room");
        }

        //  console.log('shop_temp:' + JSON.stringify(shop_temp));
      })
      .catch((error) => {
        console.log("fb users:" + error);
      });

    await AsyncStorage.getItem("currentuser").then((res) => {
      let data = JSON.parse(res);
      this.setState({ currentUser: data });
    });
  }

  sendMessage = async () => {
    let sender = this.state.senderId;
    let receiveId1 = this.state.receiveId;
    let mes = this.state.chat;
    var name1 = await AsyncStorage.getItem("name");

    var day = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hr = new Date().getHours();
    var min = new Date().getMinutes();

    if (day < 10) {
      day = "0" + day;
    }
    if (month < 10) {
      month = "0" + month;
    }

    let date1 = day + "-" + month + "-" + year + " " + hr + ":" + min;
    console.log("--------------->", receiveId1);
    // if (receiveId1 !== null) {
    await db
      .collection("messages")
      .add({
        userName: name1,
        senderId: sender,
        message: mes,
        time: date1,
        receiveId: receiveId1,
        userType: "m",
      })
      .then(() => {
        console.log("message sent!");

        console.log("==========================>");
        this.chatVisible(!this.state.chatModalVisible);
        this.componentDidMount();
      });

    // } else {
    //   // this.setState({ chatModalVisible: true });
    // }
  };

  chatVisible = (visible) => {
    this.setState({ chatModalVisible: visible });
  };

  chatData = (userName, receiveId, senderId) => {
    this.setState({ name: userName, receiveId: receiveId });
  };

  render() {
    let { currentUser } = this.state;
    return (
      <View style={styles.container}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.chatModalVisible}
        >
          <TouchableOpacity
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0,0,0,0.5)",
              alignSelf: "center",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                height: hp(50),
                width: wp(90),
                alignItems: "center",
                backgroundColor: "white",
                borderRadius: 10,
                justifyContent: "center",
              }}
            >
              {/* <Text style={{ fontSize: 18, color: 'black' }}>Pre set ip adress: {this.state.server_ip}</Text> */}
              <View
                style={{
                  flexDirection: "column",
                  width: "100%",
                  marginTop: "10%",
                }}
              >
                <View
                  style={{
                    flexDirection: "column",
                    alignItems: "flex-start",
                    marginLeft: "10%",
                  }}
                >
                  <Text
                    style={{ fontSize: 18, color: "black", marginBottom: 1 }}
                  >
                    {this.state.name}
                  </Text>
                  <TextInput
                    style={styles.textInput}
                    ref={(input) => {
                      this.textInput3 = input;
                    }}
                    placeholder="Message"
                    onChangeText={(chat) => {
                      this.setState({ chat });
                    }}
                    value={this.state.chat}
                    returnKeyType="done"
                    blurOnSubmit={false}
                    // onSubmitEditing={ ()=> this.textInput3.focus()}
                  />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: "8%",
                  }}
                >
                  <TouchableOpacity
                    style={styles.submitButton2}
                    onPress={() =>
                      this.chatVisible(!this.state.chatModalVisible)
                    }
                  >
                    <Text style={styles.text1}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.submitButton2}
                    onPress={() => this.sendMessage()}
                  >
                    <Text style={styles.text1}>send</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </Modal>

        <View
          style={{
            backgroundColor: "#617EF2",
            height: hp(15),
            flexDirection: "row",
            justifyContent: "space-between",
            paddingTop: 30,
            paddingHorizontal: 10,
          }}
        >
          <Text
            style={{
              color: "#ffffff",
              fontSize: 18,
              marginTop: 40,
            }}
          >
            Worker Chat
          </Text>
          <View
            style={{
              width: 100,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              style={{ marginLeft: wp(5) }}
              style={{ height: 40, width: 40, borderRadius: 30 }}
              source={{
                uri:
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlq8pEl5Qb1YrUBBtfV2dfXFmePUUBt47eRw&usqp=CAU",
              }}
            />
            <Text
              style={{
                color: "#ffffff",
                textAlign: "center",
              }}
            >
              {currentUser.userName}
            </Text>
          </View>
        </View>
        <View>
          <FlatList
            style={{ height: hp(70), width: wp(100) }}
            data={this.state.messages}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  margin: wp(1),
                }}
              >
                <Image
                  style={{
                    width: hp(8),
                    height: hp(8),
                    borderRadius: hp(4),
                    backgroundColor: "#d3d3d3",
                  }}
                />
                <View
                  style={{
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                    marginLeft: wp(2),
                    width: wp(70),
                  }}
                >
                  <Text style={{ fontSize: 20, color: "#333" }}>
                    {item.userName}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "flex-start",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 15,
                        color: "#333",
                        textAlign: "center",
                      }}
                    >
                      {item.message}
                    </Text>
                    <Text
                      style={{ fontSize: 15, color: "#333", marginLeft: 4 }}
                    >
                      {item.time}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  on
                  onPress={() => {
                    this.chatVisible(!this.state.chatModalVisible),
                      this.chatData(
                        item.userName,
                        item.receiveId,
                        item.senderId
                      );
                  }}
                >
                  <Text
                    style={{
                      color: "#FFFFFF",
                      fontSize: 15,
                      fontWeight: "400",
                    }}
                  >
                    Chat
                  </Text>
                  <Icon name="wechat" size={hp(5)} color="#333" />
                </TouchableOpacity>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => this.navigate1("MDash")}
          >
            <Text style={{ color: "#FFFFFF", fontSize: 15, fontWeight: "400" }}>
              Back
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default MChat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  backButton: {
    backgroundColor: "#E26161",
    width: wp(70),
    height: hp(8),
    borderRadius: hp(4),
    justifyContent: "center",
    alignItems: "center",
    margin: 2,
    alignSelf: "center",
  },
  textInput: {
    fontSize: 19,
    //  textAlign: "center",
    width: 260,
    height: 40,
    borderRadius: 5,
    borderWidth: 0.5,
    // borderColor:'#333',
    letterSpacing: 1,
    // fontFamily: 'open-sans',
    margin: 2,
  },
  submitButton2: {
    alignSelf: "center",
    backgroundColor: "#d3d3d3", //#0090ff
    alignItems: "center",
    width: 140,
    height: 35,
    margin: 5,
    borderRadius: 9,
    flexDirection: "row",
  },
  text1: {
    color: "#333",
    padding: 12,
    paddingHorizontal: 20,
    marginLeft: "17%",
    //fontWeight: 'bold',
    fontSize: 18,
  },
});
