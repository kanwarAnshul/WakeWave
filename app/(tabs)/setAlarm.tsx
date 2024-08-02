import { View, Text, StyleSheet, TouchableOpacity, Image, Platform, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors } from '@/constants/Colors';
import { router, Stack } from 'expo-router';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import DateTimePicker from '@react-native-community/datetimepicker';
import _ from 'lodash';
import { Audio } from 'expo-av';
import { useDispatch, useSelector } from 'react-redux';
import { addNewUserAlarm, toggleUserAlarm } from '@/Redux/Slices/slice';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import AlarmNotify from '../AlarmNotify';
import Constants from 'expo-constants';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const imageSrc = require('../../assets/images/left-arrow.png');
const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

export default function SetAlarm() {
  const [alarmTime, setAlarmTime] = useState(new Date());
  const alarmTimeTitle = new Date();
  const [show, setShow] = useState(false);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [currentAlarm, setCurrentAlarm] = useState(null);
  const [isRinging, setIsRinging] = useState(false);
  const [notificationReceived, setNotificationReceived] = useState(false);
  const [ringingSince, setRingingSince] = useState<Date | null>(null);
  const dispatch = useDispatch();
  const alarmsState = useSelector((state) => state.alarm.alarms);
  const [expoPushToken, setExpoPushToken] = useState('');
  const alarmSoundSrc = require('../../assets/Audio/ring.mp3');

  const onTimeChange = (event, selectedTime) => {
    const newTime = selectedTime || alarmTime;
    setShow(Platform.OS === 'ios');
    setAlarmTime(newTime);
  };

  useEffect(() => {
    console.log('Registering for push notifications...');
    registerForPushNotificationsAsync()
      .then((token) => {
        console.log('token: ', token);
        setExpoPushToken(token);
      })
      .catch((err) => console.log(err));

    const subscription = Notifications.addNotificationReceivedListener((notification) => {
      setNotificationReceived(true);
    });

    const responseSubscription = Notifications.addNotificationResponseReceivedListener((response) => {
      router.push('/alarm-notify');
    });

    return () => {
      subscription.remove();
      responseSubscription.remove();
    };
  }, []);

  async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (
        await Notifications.getExpoPushTokenAsync({
          projectId: '73edef86-2174-4b9e-8987-3be0e5d2fe49',
        })
      ).data;
      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }

    return token;
  }

  const sendNotification = async () => {
    console.log('Sending push notification...');

    const message = {
      to: expoPushToken,
      sound: alarmSoundSrc,
      title: 'Alarm',
      body: `It's time for your alarm set at ${formatTime(alarmTime)}.`,
    };

    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        host: 'exp.host',
        accept: 'application/json',
        'accept-encoding': 'gzip, deflate',
        'content-type': 'application/json',
      },
      body: JSON.stringify(message),
    });
  };

  const scheduleAlarmNotification = async (alarmTime) => {
    const trigger = new Date(alarmTime);
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'WakeWave Alarm',
        body: `It's time for your alarm set at ${formatTime(alarmTime)}.`,
        sound: 'default',
      },
      trigger,
    });
  };

  const handleSetAlarm = (value) => {
    const newAlarm = {
      id: new Date().getTime(),
      time: formatTime(value),
      isActive: true,
    };
    dispatch(addNewUserAlarm(newAlarm));
    scheduleAlarmNotification(value);
    Alert.alert('Alarm Set', `Your alarm is set for ${formatTime(value)}.`, [
      { text: 'OK', onPress: () => console.log('OK Pressed') },
    ]);
    setAlarmTime(new Date());
  };

  const loadSound = async () => {
    const { sound } = await Audio.Sound.createAsync(require('../../assets/Audio/ring.mp3'));
    setSound(sound);
  };

  useEffect(() => {
    loadSound();
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  useEffect(() => {
    const checkAlarm = setInterval(async () => {
      const currentTime = formatTime(new Date());
      for (const alarm of alarmsState) {
        if (alarm.isActive && alarm.time === currentTime) {
          await playSound();
          sendNotification();
          setIsRinging(true);
          setCurrentAlarm(alarm);
          setRingingSince(new Date());
          dispatch(toggleUserAlarm(alarm.id));
        }
      }
    }, 1000);
    return () => clearInterval(checkAlarm);
  }, [alarmsState]);

  const playSound = async () => {
    if (sound) {
      await sound.replayAsync();
    } else {
      await loadSound();
      if (sound) {
        await sound.replayAsync();
      }
    }
  };

  const stopSound = async () => {
    if (sound) {
      await sound.stopAsync();
    }
    setIsRinging(false);
    setCurrentAlarm(null);
    setNotificationReceived(false);
  };

  useEffect(() => {
    if (isRinging && ringingSince) {
      const interval = setInterval(() => {
        const elapsed = new Date().getTime() - ringingSince.getTime();
        if (elapsed >= 180000) {
          setIsRinging(false);
          setRingingSince(null);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isRinging, ringingSince]);

  const formatTime = (date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return hours + ':' + minutes + ' ' + ampm;
  };


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
              <Text style={styles.titleTxt}>Set Alarm</Text>
            </View>
          ),
        }}
      />
      {isRinging || notificationReceived ? (
        <AlarmNotify time={formatTime(alarmTime)} stopSound={stopSound} />
      ) : (
        <View style={styles.container}>
          <View style={styles.header}></View>

          <View style={styles.main}>
            <View style={styles.mainTopSection}>
              <Text style={styles.alarmText}>{formatTime(alarmTimeTitle)}</Text>

              <TouchableOpacity style={styles.mainBtn} onPress={() => setShow(!show)}>
                <Text style={styles.mainBtnText}>Select your alarm</Text>
              </TouchableOpacity>
              {show && (
                <DateTimePicker
                  testID="timepicker"
                  value={alarmTime}
                  mode="time"
                  is24Hour={true}
                  display="default"
                  onChange={onTimeChange}
                />
              )}
            </View>
            
            <TouchableOpacity style={styles.BottomBtn} onPress={() => handleSetAlarm(alarmTime)}>
              <Text style={styles.setBtnTxt}>Set alarm</Text>
            </TouchableOpacity>
           
          </View>

          <View style={styles.footer} />
        </View>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    flex: 1,
    width: wp('100%'),
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  mainTopSection: {
    flex: 1,
    width: wp('85%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainBottomSection: {
    flex: 1,
    width: wp('85%'),
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 5,
  },
  mainBtn: {
    height: hp('6%'),
    width: wp('85%'),
    backgroundColor: Colors.light.icon,
    color: Colors.dark.text,
    borderWidth: 2,
    borderColor: '#ffff',
    borderRadius: 20,
    elevation: 5,
    shadowColor: Colors.dark.tint,
    textShadowOffset: { width: 7, height: 2 },
    justifyContent: 'center',
    alignItems: 'center',
  },
  alarmText: {
    fontSize: 45,
    color: '#D6EFD8',
    marginTop: 10,
    marginBottom: hp('15%'),
  },
  mainBtnText: {
    color: Colors.dark.text,
    fontWeight: 'bold',
    fontSize: 20,
  },
  daysTextTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: Colors.dark.text,
  },
  daysRepeatSection: {
    height: hp('8%'),
    width: wp('85%'),
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
  daysSection: {
    height: hp('5%'),
    width: wp('10%'),
    backgroundColor: Colors.light.background,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  daysSectionText: {
    color: '#000',
    fontSize: 12,
    fontWeight: 'bold',
  },
  BottomBtn: {
    height: hp('8%'),
    width: wp('70%'),
    backgroundColor: Colors.light.background,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  setBtnTxt: {
    fontWeight: 'bold',
    fontSize: 25,
  },
  footer: {
    height: hp('10%'),
    width: wp('100%'),
  },
})
