import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    jobRole: "",
    experienced: "yes",
    yearsOfExperience: "",
    Technology: "",
    skills: "",
    companyName: "",
    salaryLevel: "",
    degree: "",
    education: "",

    name: "",
    lastProjectName: "",
    interviewType: "Tech",
    jobDescription: ""
}

export const job_info_slice = createSlice({
    name: 'job_info',
    initialState,
    reducers: {
        updateField: (state, action) => {
            const { key, string } = action.payload || {};
            if (key !== undefined && string !== undefined) {
                state[key] = string;
            }
        }
    },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount, updateField } = job_info_slice.actions

export default job_info_slice.reducer