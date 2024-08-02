import {configureStore} from '@reduxjs/toolkit'
import userAlarm from '../Slices/slice'
export const store = configureStore({
    reducer :{
        alarm : userAlarm
    } ,
})


