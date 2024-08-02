import React, { useEffect, useState } from 'react'
import { Platform, StyleSheet } from 'react-native'
import { Stack } from 'expo-router'
import { Provider } from 'react-redux'
import { store } from '@/Redux/Store/store'

const _layout = () => {
  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="[missing]" options={{ headerShown: false }} />
        <Stack.Screen name="AlarmNotify" options={{ headerShown: false }} />
      </Stack>
    </Provider>
  )
}

const styles = StyleSheet.create({})

export default _layout
