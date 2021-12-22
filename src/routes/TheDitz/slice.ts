import { createSlice } from "@reduxjs/toolkit";
import { DateTime } from "luxon";
import { Mode } from "types";
import { Dice } from "utils/rollDice";
import { modeOptions } from "utils/modes";

type DitzGameState = {
  sentence: number;
  mode: Mode;
  nextTurn: number;
  flavorText?: string;
  gameOver?: boolean;
  count: number;
}

const initialState: DitzGameState = {
  mode: Mode.preview,
  sentence: 14,
  nextTurn: 0,
  gameOver: false,
  count: 0,
}

function getExtension(value: number, remainingSentence: number) {
  switch (value) {
    case 6: return Math.min(Math.ceil(remainingSentence / 2), 14)
    default: return -1;
  }
}

function getFlavorText(value: number) {
  let outcome
  switch(value) {
    case 6: outcome = "Keeping you locked up makes me so Horny! I think we should increase your lockup."; break;
    default: outcome = "One day less in the cage."; break;
  }
  return `I rolled a ${value}.\n${outcome}`
}

const twoKeyholderSlice = createSlice({
  name: 'TwoKeyholders',
  initialState,
  reducers: {
    flip(state) {
      if (!state.gameOver) {
        const {value} = new Dice()
        state.sentence += getExtension(value, state.sentence)
        state.flavorText = getFlavorText(value)
        state.nextTurn = Math.floor(DateTime.now().plus({ seconds: modeOptions(state.mode).duration }).toSeconds())
        if (state.sentence === 0) {
          state.flavorText += '\nLooks like its time to get you unlocked!'
          state.gameOver = true;
        }
        state.count += 1
      }
    },
    setMode(state, action) {
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