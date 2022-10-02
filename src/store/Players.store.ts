import { createSlice } from '@reduxjs/toolkit'
import { PayloadAction } from '@reduxjs/toolkit'

export interface CardData {
  id: number
  number: CardNumber
  color: CardColor
  suit: CardSuit

}

export interface PlayerData {
  id: number
  name: string
  avatar: string
  cards: CardData[]
  value: number
}

interface PlayerStoreState {
  user: PlayerData|null
  players: PlayerData[]
}

const initialState: PlayerStoreState = {
  user: null,
  players: []
}

const PlayerStore = createSlice({
  name: 'players',
  initialState,
  reducers: {
    createUser: (state: PlayerStoreState, action: PayloadAction<PlayerData>) => {
      if (action.payload === null) return
      if (state.players.length !== 0 &&
        state.players.findIndex(player => player.id === action.payload.id) !== -1) {
        return
      }
      state.user = action.payload
      state.players.push(action.payload)
    },
    addPlayer: (state: PlayerStoreState, action: PayloadAction<PlayerData>) => {
      if (action.payload === null) return
      if (state.players.length !== 0 &&
        state.players.findIndex(player => player.id === action.payload.id) !== -1) {
        return
      }
      state.players.push(action.payload)
    },
    addHand: (state: PlayerStoreState, action: PayloadAction<CardData & { idPlayer: number }>) => {
      const { idPlayer, ...card } = action.payload;
      const index = state.players.findIndex(player => player.id === idPlayer);
      if (index != -1) {
        state.players[index].cards.push(card);
      }
    },
    sumHand: (state: PlayerStoreState, action: PayloadAction<{ idPlayer: number, sumCards: number }>) => {
      const { idPlayer, sumCards } = action.payload;
      const index = state.players.findIndex(player => player.id === idPlayer);
      if (index != -1) {
        state.players[index].value = sumCards;
      }
    },
    removePlayer: (state: PlayerStoreState, action: PayloadAction<number>) => {
      const index = state.players.findIndex(player => player.id === action.payload)
      if (index === -1) return
      const beginArray = state.players.slice(0, index);
      const endArray = state.players.slice(index + 1);
      state.players = beginArray.concat(endArray)
    },
    clear: (state: PlayerStoreState) => {
      state.user = initialState.user
      state.players = initialState.players
    },
    test: (state: PlayerStoreState) => {
      state.players = [
        {
          id: 2,
          name: "Arroz",
          avatar: "/images/image1.png",
          cards: [],
          value: 0
        },
        {
          id: 3,
          name: "Feijão",
          avatar: "/images/image2.png",
          cards: [],
          value: 0
        },
      ]
    }
  }
})

export const { addPlayer, addHand, removePlayer, test, sumHand } = PlayerStore.actions
export default PlayerStore.reducer