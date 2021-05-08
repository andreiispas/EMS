


import { StyleSheet } from "react-native";

import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    backgroundColor: "white",
  },
  myHeader: {
    backgroundColor: '#617EF2',
    width: wp(100),
    height: hp(15),
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    paddingRight: 10
  },
  heading: {
    color: "#ffffff",
    fontSize: RFPercentage(3),
    textAlign: 'center',
    marginRight: wp(2)
  },

  textInput: {
    fontSize: 19,
    //  textAlign: "center",
    width: 260,
    height: 40,
    //borderRadius: 5,
    // borderWidth: 0.5,
    // borderColor:'#333',
    borderBottomColor: '#617EF2', // Add this to specify bottom border color
    borderBottomWidth: 1,
    letterSpacing: 1,
    margin: 2

  },

  signUpButton: {
    backgroundColor: '#617EF2',
    width: wp(70), height: hp(8),
    borderRadius: hp(4),
    justifyContent: 'center',
    alignItems: 'center',
    margin: hp(1),
    alignSelf: 'center'
  },
  signInButton: {
    backgroundColor: '#E26161',
    width: wp(70), height: hp(8),
    borderRadius: hp(4),
    justifyContent: 'center',
    alignItems: 'center',
    margin: hp(1),
    alignSelf: 'center'
  },
  signButtonsText: {
    color: '#FFFFFF',
    fontSize: RFPercentage(3),
  },
  LoginTextInpuView: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  LoginSubmitView: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp(2)
  }

});

export default styles;
