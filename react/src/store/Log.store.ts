import { createSlice } from '@reduxjs/toolkit'
import { PayloadAction } from '@reduxjs/toolkit'


interface LogStoreState {
    log: string[]
}

const initialState: LogStoreState = {
    log: []
}

const LogStore = createSlice({
    name: 'Log',
    initialState,
    reducers: {
        push: (state: LogStoreState, action: PayloadAction<string>) => {
            state.log = [action.payload,...state.log];
        }
    }
})

export const { push } = LogStore.actions
export default LogStore.reducer