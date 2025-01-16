import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    candidate: false,
    voiceProcessing: false
}

export const loading = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        updateLoading: (state, action) => {
            const { key, loadingState } = action.payload || {};
            if (key !== undefined) {
                state[key] = loadingState;
            }
        }
    },
})

// Action creators are generated for each case reducer function
export const { updateLoading } = loading.actions

export default loading.reducer