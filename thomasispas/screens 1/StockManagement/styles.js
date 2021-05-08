


import {  StyleSheet } from "react-native";

import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    backgroundColor: "white",
  },
  heading: {
    fontWeight: '800',
    fontSize: 25,
    color: '#333',
    marginTop: 20
  },
  sendButton: {
    backgroundColor: '#d3d3d3',
    width: 65, height: 35,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2
  },
  backButton: {
    backgroundColor: '#E26161',
    width: wp(70), height: hp(8),
    borderRadius: hp(4),
    justifyContent: 'center',
    alignItems: 'center',
   // margin: 2,
    alignSelf:'center'
  },
  textInput: {
    fontSize: 19,
    //  textAlign: "center",
    width: wp(85),
    height: hp(8),
    borderRadius: 5,
    borderWidth: 0.5,
    // borderColor:'#333',
    letterSpacing: 1,
    // fontFamily: 'open-sans',
    margin: 2

  },
  submitButton2: {
    //alignSelf: 'center',
    backgroundColor: "#d3d3d3", //#0090ff
    alignItems: 'center',
    justifyContent:'center',
    width: wp(40),
    height:hp(7),
    margin: 5,
    borderRadius: 9,
    flexDirection: 'row',
  },
  text1: {
    color: '#333',
    fontSize: RFPercentage(2),

  }

});

  export default styles;
  