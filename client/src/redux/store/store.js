import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../slice/counter-slice'
import job_info_slice_reducer from '../slice/job-info-slice'

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        job_info: job_info_slice_reducer,
    },
})