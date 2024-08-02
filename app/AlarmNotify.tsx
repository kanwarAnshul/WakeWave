import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'

const AlarmNotify = ({time,stopSound}) => {
  const alarmTime = new Date()
  const formatTime = (date) => {
    let hours = date.getHours()
    let minutes = date.getMinutes()
    let ampm = hours >= 12 ? 'PM' : 'AM'
    hours = hours % 12
    hours = hours ? hours : 12 // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes
    let strTime = hours + ':' + minutes + ' ' + ampm
    return strTime
  }

  const handleOffAlarm = () => {
    stopSound()
  }
  const imageSrc = require('../assets/images/alarmNotify.png')
  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.timeTitle}>{time}</Text>
          <Text style={styles.subTtile}>Wake Up and Energize!</Text>
        </View>
        <View style={styles.main}>
          <Image source={imageSrc} style={styles.image} />
        </View>
        <View style={styles.footer}>
          <TouchableOpacity onPress={handleOffAlarm} style={styles.offButton}>
            <Text style={styles.btnText}>OFF</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  )
}

export default AlarmNotify

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  header: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeTitle: {
    fontSize: 35,
    color: Colors.dark.text,
  },
  subTtile: {
    fontSize: 20,
    color: '#50BFE6',
  },
  main: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: hp('50%'),
    width: wp('100%'),
  },
  footer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  offButton: {
    height: hp('8%'),
    width: wp('50%'),
    borderRadius: 30,
    backgroundColor: 'red',
    color: '#ffff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    elevation: 10, // Increased for a more pronounced effect on Android
    shadowColor: '#000', // Use a dark shadow color for a 3D effect
    shadowOffset: { width: 0, height: 4 }, // Offset the shadow to create depth
    shadowOpacity: 0.25, // Adjust the opacity to make the shadow visible
    shadowRadius: 4, // Increase the radius for a softer shadow
  },

  btnText: {
    fontSize: 25,
    color: '#ffff',
    fontWeight: '600',
  },
})
