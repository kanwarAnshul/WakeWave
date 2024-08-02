// alarmDetail.js
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { router, Stack } from 'expo-router'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { Colors } from '@/constants/Colors'
import Detail from '@/Components/Detail'
import { useSelector } from 'react-redux'
import _ from 'lodash'

const imageSrc = require('../../assets/images/left-arrow.png')

export default function alarmDetail() {
  const alarms = useSelector((state) => state.alarm.alarms)

  useEffect(() => {
    console.log('the new alarm in detail::::', alarms)
  }, [alarms])

  return (
    <>
      <Stack.Screen
        options={{
          headerTransparent: true,
          headerTitle: '',
          headerLeft: () => (
            <TouchableOpacity
              style={styles.backBtn}
              onPress={() => {
                router.back()
              }}
            >
              <Image source={imageSrc} style={styles.backBtnImage} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <View style={styles.titleContainer}>
              <Text style={styles.titleTxt}>Alarm detail</Text>
            </View>
          ),
        }}
      />
      <View style={styles.container}>
        <View style={styles.header}></View>
        <View style={styles.main}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {alarms.length > 0 ? (
              alarms.map((alarm) => <Detail key={alarm.id} id={alarm.id} time={alarm.time} isActive={alarm.isActive} />)
            ) : (
              <Text style={{ fontSize: 24, color: '#fff' }}>No any alarm set yet</Text>
            )}
          </ScrollView>
        </View>
        <TouchableOpacity
          style={styles.addAlarmBtn}
          onPress={() => {
            router.navigate('/setAlarm')
          }}
        >
          <Image style={styles.addAlarmBtnImage} resizeMode="cover" source={require('../../assets/images/add.png')} />
        </TouchableOpacity>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: wp('100%'),
    backgroundColor: Colors.dark.background,
  },
  backBtn: {
    height: hp('4.5%'),
    width: hp('4.5%'),
    borderRadius: 9,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  backBtnImage: {
    height: '60%',
    width: '60%',
    resizeMode: 'contain',
    shadowOffset: { width: 0, height: 3 },
    shadowColor: '#ffff',
    elevation: 4,
    shadowOpacity: 0.25,
    shadowRadius: 3,
  },
  titleContainer: {},
  titleTxt: {
    fontSize: 45,
    fontWeight: 'bold',
    color: Colors.light.text,
  },
  header: {
    height: hp('12%'),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.light.background,
    borderBottomLeftRadius: 85,
  },
  main: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
  footer: {
    height: hp('15%'),
    width: wp('10%'),
    backgroundColor: 'tranparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addAlarmBtn: {
    position: 'absolute',
    bottom: hp('5%'),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addAlarmBtnImage: {
    height: hp('9.5%'),
    width: wp('20%'),
  },
})
