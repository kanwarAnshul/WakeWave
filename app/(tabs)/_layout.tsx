import { View, Text, Image } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import Icons from 'react-native-ionicons'
export default function _layout() {
  return (
    <>
      <Tabs 
      screenOptions={{
        tabBarLabelStyle:{
          fontSize:16,
          fontWeight:"bold"
        }
      }}
      >
         <Tabs.Screen
          name="setAlarm"
          options={{
            headerShadowVisible: false,
            tabBarLabel: 'Set alarm',
           
            tabBarIcon: ({ color, size }) => (
              <>
              <View>
                <Image source={require('../../assets/images/alarm.png')} resizeMode='contain' style={{width:25}}/>
              </View>
              </>      
            ),
          }}
          
        />
        <Tabs.Screen
          name="alarmDetail"
          options={{
            headerShadowVisible: false,
            tabBarLabel: 'Alarm detail',
            tabBarIcon:({focused})=>(
              <>
              <View>
                <Image source={require('../../assets/images/detail.png')} resizeMode='contain' style={{width:25}}/>
              </View>
              </>
            )

          }}

        />
       
      </Tabs>
    </>
  )
}
