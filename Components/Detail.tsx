// Detail.js
import { Image, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { Colors } from '@/constants/Colors'
import { useDispatch } from 'react-redux'
import { deleteUserAlarm, toggleUserAlarm } from '@/Redux/Slices/slice'

const Detail = ({ key, id, time, isActive }) => {
  const [isEnabled, setIsEnabled] = useState(isActive)
  const dispatch = useDispatch()
  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState)
    dispatch(toggleUserAlarm(id))
    console.log('toggle::', isEnabled)
  }
  const theme = isEnabled ? Colors.dark : Colors.light
  const imageSrc = require('../assets/images/delete.png')
  const deleteAlarmID = id
  return (
    <>
      <View style={styles.detailContainer}>
        <View style={styles.mainSection}>
          <Image style={styles.image} source={require('../assets/images/alarm2.png')} />
          <View style={styles.mainTextContainer}>
            <Text style={styles.alarmText}>{time}</Text>
            <Text style={styles.repeatText}>Repeat Alarm</Text>
          </View>
          <View style={styles.buttonContainer}>
            <Switch
              trackColor={{ false: theme.icon, true: theme.tint }}
              thumbColor={isEnabled ? theme.tint : theme.background}
              ios_backgroundColor={theme.background}
              onValueChange={() => {
                toggleSwitch()
              }}
              value={isEnabled}
            />
            <TouchableOpacity
              style={styles.deleteBtn}
              onPress={() => {
                dispatch(deleteUserAlarm(deleteAlarmID))
              }}
            >
              <Image style={styles.deleteImage} source={imageSrc} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  )
}

export default Detail

const styles = StyleSheet.create({
  detailContainer: {
    height: hp('10%'),
    width: wp('90%'),
    borderRadius: 25,
    backgroundColor: Colors.dark.background,
    borderColor: '#fff',
    borderWidth: 2,
    justifyContent: 'center',
    elevation: 4,
    shadowOffset: { width: 3, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    marginBottom: 10,
  },
  mainSection: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
    alignItems: 'center',
  },
  image: {
    height: hp('3%'),
    width: wp('7%'),
    marginLeft: wp('3%'),
  },
  mainTextContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  alarmText: {
    fontSize: 25,
    fontWeight: '600',
    color: '#ffff',
  },
  repeatText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.dark.text,
  },
  deleteBtn: {
    height: hp('3%'),
    width: wp('15%'),
    // backgroundColor: "white"
  },
  deleteImage: {
    height: hp('3%'),
    width: wp('8%'),
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
