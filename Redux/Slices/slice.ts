import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Alarm {
  id: number
  time: string
  isActive: boolean
}

interface AlarmState {
  alarms: Alarm[]
}

const initialState: AlarmState = {
  alarms: [],
}

const userAlarmSlice = createSlice({
  name: 'Alarm',
  initialState,
  reducers: {
    addNewUserAlarm: (state, action: PayloadAction<Alarm>) => {
      state.alarms.push({ ...action.payload })
    },
    deleteUserAlarm: (state, action: PayloadAction<number>) => {
      state.alarms = state.alarms.filter((alarm) => alarm.id !== action.payload)
    },
    toggleUserAlarm: (state, action: PayloadAction<number>) => {
      const alarm = state.alarms.find((alarm) => alarm.id === action.payload)
      if (alarm) {
        alarm.isActive = !alarm.isActive
      }
    },
    setAlarms: (state, action: PayloadAction<Alarm[]>) => {
      state.alarms = action.payload
    },
  },
})


export const { addNewUserAlarm, deleteUserAlarm, toggleUserAlarm, setAlarms } = userAlarmSlice.actions

export default userAlarmSlice.reducer
