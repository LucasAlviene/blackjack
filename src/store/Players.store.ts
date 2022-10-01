import {createSlice} from '@reduxjs/toolkit'
import {PayloadAction} from '@reduxjs/toolkit'

export interface PlayerData {
  id: number
  name: string
  avatar: string
  cards: {
    id: number
    number: CardNumber
    color: CardColor
    suit: CardSuit
  } []
}

interface PlayerStoreState {
  players: PlayerData[]
}

const initialState: PlayerStoreState = {
  players: []
}

const PlayerStore = createSlice({
  name: 'players',
  initialState,
  reducers: {
    addPlayer: (state: PlayerStoreState, action:PayloadAction<PlayerData>) => {
      if(action.payload === null) return
      if(state.players.length !== 0 && 
        state.players.findIndex(player => player.id === action.payload.id) !== -1) {
        return
      }
      state.players.push(action.payload)
    },
    removePlayer: (state: PlayerStoreState, action:PayloadAction<number>) => {
      const index = state.players.findIndex(player => player.id === action.payload)
      if(index === -1) return
      const beginArray = state.players.slice(0, index);
      const endArray = state.players.slice(index+1);
      state.players = beginArray.concat(endArray)
    }
  }
})

export const {addPlayer, removePlayer} = PlayerStore.actions
export default PlayerStore.reducer