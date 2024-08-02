import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import App from '@/Components/App'
import { Provider } from 'react-redux'
import { store } from '@/Redux/Store/store'
import AlarmNotify from '@/Components/AlarmNotify'
export default function Main() {
  return (
    <>
      <Provider store={store}>
        {/* <AlarmNotify/> */}
        <App />
      </Provider>
    </>
  )
}

const styles = StyleSheet.create({})
