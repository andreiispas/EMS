


import {  StyleSheet } from "react-native";

import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Profiler } from "react";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      // justifyContent: "center",
      backgroundColor: "#FFFFFF",
    },
    myHeader:{
      backgroundColor:'#617EF2',
      width:wp(100),
      height:hp(15),
      alignItems:'center',
      justifyContent:'center'
    },
    heading:{
    fontSize:RFPercentage(3.5),
    color:"#ffffff"
    },
    chooseButton1:{
      backgroundColor: '#E26161',
      width: wp(70), height: hp(8),
      borderRadius: hp(4),
      justifyContent: 'center',
      alignItems: 'center',
      margin: hp(2),
      alignSelf:'center'
    },
    chooseButton2:{
      backgroundColor: '#617EF2',
      width: wp(70), height: hp(8),
      borderRadius: hp(4),
      justifyContent: 'center',
      alignItems: 'center',
      margin: hp(2),
      alignSelf:'center'
    },
    
 
    textInput: {
      fontSize: 20,
      //  textAlign: "center",
      width: wp(70),
      height: hp(8),
     // borderRadius: 5,
     // borderWidth: 0.5,
      // borderColor:'#333',
      letterSpacing: 1,
      margin: hp(1),
      borderBottomColor: '#617EF2', // Add this to specify bottom border color
      borderBottomWidth: 1 
    },
  
    signButtonsText: {
      color: '#FFFFFF',
      fontSize: RFPercentage(3),
    },
    LoginTextInpuView:{
      flexDirection:'column',
      alignItems:'center',
      justifyContent:'center'
     },
    LoginSubmitView:{
     flexDirection:'column',
     alignItems:'center',
     justifyContent:'center'
    }
  
  });

  export default styles;
  