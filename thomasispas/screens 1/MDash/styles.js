


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

  myButton1: {
    backgroundColor: '#E26161',  //#617EF2'
    width: wp(70), height: hp(8),
    borderRadius: hp(4),
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
    alignSelf:'center'
  }, 
  myButton2: {
    backgroundColor: '#617EF2',  
    width: wp(70), height: hp(8),
    borderRadius: hp(4),
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
    alignSelf:'center'
  },
  text1: {
    color: "#FFFFFF",
    fontSize: RFPercentage(3)
  },
   logoutButton: {
    alignSelf: 'center',
    backgroundColor: "#d3d3d3", //#0090ff
    alignItems: 'center',
    width: 140,
    height:35,
    margin: 5,
    borderRadius: 9,
    flexDirection: 'row',
  },

});




  export default styles;
  