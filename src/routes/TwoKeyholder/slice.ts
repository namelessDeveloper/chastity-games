import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DateTime } from "luxon";
import { coinToString, flipCoin } from "utils/coins";

export enum Mode {
  preview = 'preview',
  real = 'real',
}

type TwoKeyholdersGameState = {
  sentence: number;
  mode: Mode;
  nextTurn?: number;
  flavorText?: string;
}

const initialState: TwoKeyholdersGameState = {
  mode: Mode.preview,
  sentence: 3,
}

function getOutcomeText(sum: number) {
  switch(sum) {
    case 0: return "One day less in the cage."
    case 1: return "Another day in the cage."
    case 2: return "Ouch! Looks like another 3 in the cage."
  }
}

function getExtension(sum: number) {
  switch (sum) {
    case 0: return -1
    case 1: return 1
    case 2: return 3
    // Unreachable
    default: return 0;
  }
}

function getModeDelay(mode: Mode) {
  switch (mode) {
    case Mode.preview:
      return 0
    default:
    case Mode.real:
      return 60*60*24
  }
}

const twoKeyholderSlice = createSlice({
  name: 'TwoKeyholders',
  initialState,
  reducers: {
    flip(state) {
      const flips = [flipCoin(), flipCoin()];
      const sum = flips.reduce((a, b) => a + b)
      state.sentence += getExtension(sum)
      state.flavorText = `Emily rolled a ${coinToString(flips[0])} and I rolled a ${coinToString(flips[1])}.\n${getOutcomeText(sum)}`
      state.nextTurn = Math.floor(DateTime.now().plus({ seconds: getModeDelay(state.mode) }).toSeconds())
    },
    setMode(state, action: PayloadAction<Mode>) {
      state.mode = action.payload
    },
    restart(state) {
      if (state.mode === Mode.preview || state.sentence === 0)
      return initialState
    }
  }
})

export default twoKeyholderSlice.reducer
export const {flip, setMode, restart} = twoKeyholderSlice.actions