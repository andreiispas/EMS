import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  Image,
  YellowBox,
  Modal,
  Alert,
  Keyboard,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import * as firebase from 'firebase';

const db = firebase.firestore();

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from './styles';

class StockManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stock: [],
      price: null,
      quantity: null,
      title: null,
      key: null,
      addModalVisible: false,
      currentUser: {}
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
      .collection('stock')
      .get()
      .then((snapshot) => {
        //  const data1 = snapshot.docs.map(doc => doc.data());
        // let mes = [] = data1.slice();
        snapshot.forEach((doc) => {
          let key = doc.id;
          let data1 = doc.data();

          let title = data1.title;
          let quantity = data1.quantity;
          let price = data1.price;
          // alert(receiveId);
          temp.push({ key, title, quantity, price });
        });
        // console.log('stock_temp:' + JSON.stringify(temp));

        if (temp) {
          this.setState({ stock: temp });
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

  addStock = async () => {
    let title = this.state.title;
    let quantity = this.state.quantity;
    let price = this.state.price;

    if (title !== null && price != null && price != null) {
      await db
        .collection('stock')
        .add({
          title: title,
          quantity: quantity,
          price: price,
        })
        .then(() => {
          console.log('stock added !!!!');

          this.addVisible(!this.state.addModalVisible);
          this.componentDidMount();
        });
    } else {
      alert('Enter details');
    }
  };

  addVisible = (visible) => {
    this.setState({ addModalVisible: visible });
  };

  updateStockData = (title1, price1, quantity1, key1) => {
    this.setState({
      title: title,
      quantity1: quantity1,
      price: price1,
      key: key1,
    });
  };

  updateStock = async () => {
    let title1 = this.state.title;
    let quantity1 = this.state.quantity;
    let price1 = this.state.price;
    let key1 = this.state.key;

    if (key1 !== null && title1 != null) {
      await db
        .collection('stock')
        .doc(key1)
        .update({
          title: title1,
          quantity: quantity1,
          price: price1,
        })
        .then(() => {
          console.log('stock added !!!!');

          this.addVisible(!this.state.addModalVisible);
          this.componentDidMount();
        });
    } else {
      alert('Enter details');
    }
  };

  askDelete = (key) => {
    Alert.alert(
      'Delete Product',
      'Dou you want to delete this product',
      [
        {
          text: 'Cancel',
          //  onPress: () => console.log("Cancel Pressed"),
          style: 'cancel',
        },
        { text: 'OK', onPress: () => this.deleteStock(key) },
      ],
      { cancelable: true }
    );
  };

  deleteStock = async (key1) => {
    await db
      .collection('stock')
      .doc(key1)
      .delete()
      .then(() => {
        console.log('stock deleted !!!!');
        this.componentDidMount();
      });
  };

  render() {
    let { currentUser } = this.state
    console.log("--------->", currentUser)
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : '200'}
        style={styles.container}>
        <View style={styles.container}>
          <Modal
            animationType="fade"
            transparent={true}
            visible={this.state.addModalVisible}>
            <TouchableOpacity
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0,0,0,0.5)',
                alignSelf: 'center',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}>
              <View
                style={{
                  height: hp(70),
                  width: wp(90),
                  alignItems: 'center',
                  backgroundColor: 'white',
                  borderRadius: hp(7),
                  justifyContent: 'center',
                  flexDirection: 'column',
                }}>
                <Text style={{ fontSize: RFPercentage(4), color: 'black' }}>
                  Product
                </Text>

                <View
                  style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                  <Text
                    style={{ fontSize: 18, color: 'black', marginBottom: 1 }}>
                    title
                  </Text>
                  <TextInput
                    style={styles.textInput}
                    ref={(input) => {
                      this.textInput1 = input;
                    }}
                    placeholder="title"
                    onChangeText={(title) => {
                      this.setState({ title });
                    }}
                    value={this.state.title}
                    returnKeyType="next"
                    blurOnSubmit={false}
                    onSubmitEditing={() => this.textInput2.focus()}
                  />

                  <View
                    style={{
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                    }}>
                    <Text
                      style={{ fontSize: 18, color: 'black', marginBottom: 1 }}>
                      quantity
                    </Text>
                    <TextInput
                      style={styles.textInput}
                      ref={(input) => {
                        this.textInput2 = input;
                      }}
                      placeholder="quantity"
                      onChangeText={(quantity) => {
                        this.setState({ quantity });
                      }}
                      value={this.state.quantity}
                      returnKeyType="next"
                      blurOnSubmit={false}
                      onSubmitEditing={() => this.textInput3.focus()}
                    />
                  </View>

                  <View
                    style={{
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                    }}>
                    <Text
                      style={{ fontSize: 18, color: 'black', marginBottom: 1 }}>
                      price
                    </Text>
                    <TextInput
                      style={styles.textInput}
                      ref={(input) => {
                        this.textInput3 = input;
                      }}
                      placeholder="price"
                      onChangeText={(price) => {
                        this.setState({ price });
                      }}
                      value={this.state.price}
                      returnKeyType="done"
                      blurOnSubmit={false}
                      onSubmitEditing={() => Keyboard.dismiss()}
                    />
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: hp(2),
                  }}>
                  <TouchableOpacity
                    style={styles.submitButton2}
                    onPress={() =>
                      this.addVisible(!this.state.addModalVisible)
                    }>
                    <Text style={styles.text1}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.submitButton2}
                    onPress={() => this.addStock()}>
                    <Text style={styles.text1}>Add to Stock</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          </Modal>

          <View
            style={{
              backgroundColor: '#617EF2',
              // width: wp(100),
              height: hp(15),
              flexDirection: 'row',
              // alignItems: "baseline",
              justifyContent: "space-between",
              paddingTop: 30,
              paddingHorizontal: 10
            }}>
            <Text
              style={{
                color: '#ffffff',
                // marginLeft: wp(2),
                // fontSize: RFPercentage(4),
                // width: wp(50),
                fontSize: 18,
                marginTop: 40
              }}>
              Stock Management
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
                  // fontSize: RFPercentage(2),
                  // width: wp(30),
                  textAlign: 'center',
                }}>
                {currentUser.userName}
              </Text>
            </View>
          </View>
          <View
            style={{ width: wp(100), height: hp(85), flexDirection: 'column' }}>
            <View
              style={{
                flexDirection: 'row',
                height: hp(8),
                marginLeft: wp(2),
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}>
              <TouchableOpacity
                style={{
                  width: wp(25),
                  height: hp(6),
                  borderRadius: hp(3),
                  backgroundColor: '#E26161',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{ color: '#FFFFFF', fontSize: RFPercentage(2) }}>
                  Add to stock
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.addVisible(!this.state.addModalVisible)}
                style={{
                  width: hp(8),
                  height: hp(6),
                  borderRadius: hp(3),
                  backgroundColor: '#E26161',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: wp(2),
                }}>
                <Text
                  style={{
                    color: '#000000',
                    fontSize: RFPercentage(3),
                    width: hp(5),
                    height: hp(4),
                    borderRadius: hp(4),
                    backgroundColor: '#FFFFFF',
                    textAlign: 'center',
                  }}>
                  +
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                height: hp(8),
                marginLeft: wp(2),
              }}>
              <TouchableOpacity
                style={{
                  width: wp(25),
                  height: hp(6),
                  borderRadius: hp(3),
                  backgroundColor: '#E26161',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{ color: '#FFFFFF', fontSize: RFPercentage(2) }}>
                  title
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: wp(25),
                  height: hp(6),
                  borderRadius: hp(3),
                  marginLeft: wp(3),
                  backgroundColor: '#E26161',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{ color: '#FFFFFF', fontSize: RFPercentage(2) }}>
                  quantity
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: wp(25),
                  height: hp(6),
                  borderRadius: hp(3),
                  marginLeft: wp(3),
                  backgroundColor: '#E26161',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{ color: '#FFFFFF', fontSize: RFPercentage(2) }}>
                  price
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{ height: hp(55), width: wp(100), marginBottom: hp(1) }}>
              <FlatList
                style={{ height: hp(54), width: wp(100) }}
                data={this.state.stock}
                renderItem={({ item, index }) => (
                  <ScrollView>
                    <TouchableOpacity
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        margin: wp(1),
                        backgroundColor: '#d3d3d3',
                        margin: hp(0.5),
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginLeft: wp(5),
                        }}>
                        <Text
                          style={{
                            fontSize: RFPercentage(2),
                            color: '#333',
                            width: wp(34),
                          }}>
                          {item.title}
                        </Text>
                        <Text
                          style={{
                            fontSize: RFPercentage(2),
                            color: '#333',
                            width: wp(27),
                          }}>
                          {item.quantity}
                        </Text>
                        <Text
                          style={{
                            fontSize: RFPercentage(2),
                            color: '#333',
                            width: wp(17),
                          }}>
                          {item.price}
                        </Text>
                        <TouchableOpacity
                          on
                          onPress={() => {
                            this.askDelete(item.key);
                          }}>
                          <Icon
                            name="delete-forever"
                            size={hp(5)}
                            color="#333"
                          />
                        </TouchableOpacity>
                      </View>
                    </TouchableOpacity>
                  </ScrollView>
                )}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => this.navigate1('MDash')}>
              <Text style={{ color: '#FFFFFF', fontSize: RFPercentage(3) }}>
                Back
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default StockManagement;
