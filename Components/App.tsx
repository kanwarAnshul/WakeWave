import { View, Text, Button, TouchableOpacity, StyleSheet, ImageBackground, Image, StatusBar } from 'react-native'
import React from 'react'
import { Link, router } from 'expo-router'
import { Colors } from '@/constants/Colors'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  heightPercentageToDP,
} from 'react-native-responsive-screen'

const imageSrc = require('../assets/images/background.jpg')
const imageSrc2 = require('../assets/images/timeImg3.png')
export default function App() {
  return (
    <>
      <ImageBackground source={imageSrc} style={stlyes.container}>
        <StatusBar barStyle="light" />
        <View style={stlyes.header}>
          <Text style={stlyes.title}>WakeWave</Text>
          <Text style={stlyes.subtitle}>Welcome to WakeWave! Your journey</Text>
          <Text style={stlyes.subtitle}> to serene wakefulness starts here</Text>
        </View>
        <View style={stlyes.main}>
          <Image source={imageSrc2} style={stlyes.mainImage} />
        </View>
        <View style={stlyes.footer}>
          <TouchableOpacity
            style={stlyes.footerBtn}
            onPress={() => {
              router.navigate('/(tabs)/setAlarm')
            }}
          >
            <Text style={{ color: Colors.light.background, fontWeight: 'bold', fontSize: 15 }}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </>
  )
}

const stlyes = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
  },
  // header styles
  header: {
    height: hp('25%'),
    width: wp('100%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: hp('4.5%'),
    color: Colors.light.tabIconSelected,
    fontWeight: '700',
    elevation: 4,
    textShadowColor: Colors.light.background,
    textShadowOffset: { width: -2, height: 1 },
    textShadowRadius: 4,
  },
  subtitle: {
    color: '#fff',
    fontSize: 14,
  },
  //  main section styles
  main: {
    height: hp('55%'),
    width: wp('100%'),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  mainImage: {
    height: hp('40%'),
    width: wp('75%'),
  },

  //  footer section styles
  footer: {
    height: hp('25%'),
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    alignContent: 'center',
  },
  footerBtn: {
    height: hp('6%'),
    width: wp('75%'),
    marginBottom: hp('3%'),
    borderRadius: 22,
    backgroundColor: Colors.light.tabIconSelected,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
