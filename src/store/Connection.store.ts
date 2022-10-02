import {createSlice} from '@reduxjs/toolkit'
import {PayloadAction} from '@reduxjs/toolkit'

interface ConnectionData {
  ip: string
  port: string
}

export enum EConnectionType {
  NONE,
  SERVER,
  CLIENT
}

interface ConnectionStoreState extends ConnectionData {
  type: EConnectionType
}

const initialState: ConnectionStoreState = {
  type: EConnectionType.NONE,
  ip: "",
  port: ""
}

const ConnectionStore = createSlice({
  name: 'connection',
  initialState,
  reducers: {
    connectAsServer: (state: ConnectionStoreState, action:PayloadAction<ConnectionData>) => {
      state.type = EConnectionType.SERVER
      state.ip = action.payload.ip
      state.port = action.payload.port
    },
    connectAsClient: (state: ConnectionStoreState, action:PayloadAction<ConnectionData>) => {
      state.type = EConnectionType.CLIENT
      state.ip = action.payload.ip
      state.port = action.payload.port
    },
    disconnect: (state: ConnectionStoreState) => {
      state.type = initialState.type
      state.ip = initialState.ip
      state.port = initialState.port
    }
  }
})

export const {connectAsServer, connectAsClient, disconnect} = ConnectionStore.actions
export default ConnectionStore.reducer