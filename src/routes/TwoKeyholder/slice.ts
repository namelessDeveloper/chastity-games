import { createSlice } from "@reduxjs/toolkit";
import { DateTime } from "luxon";
import { Mode } from "types";
import { coinToString, flipCoin } from "utils/rollDice";
import { sum } from "utils/math";
import { modeOptions } from "utils/modes";

type TwoKeyholdersGameState = {
  sentence: number;
  mode: Mode;
  nextTurn: number;
  flavorText?: string;
  gameOver?: boolean;
  count: number;
}

const initialState: TwoKeyholdersGameState = {
  mode: Mode.preview,
  sentence: 3,
  nextTurn: 0,
  count: 0,
}

function getExtension(flips: number[]) {
  switch (sum(flips)) {
    case 0: return -1
    case 1: return 1
    case 2: return 3
    // Unreachable
    default: return 0;
  }
}

function getFlavorText(flips: number[]) {
  const girl1 = coinToString(flips[0]);
  const girl2 = coinToString(flips[1]);
  let outcome
  switch(sum(flips)) {
    case 2: outcome = "Ouch! Looks like another 3 in the cage."; break;
    case 1: outcome = "Another day in the cage."; break;
    case 0:
    default:
      outcome = "One day less in the cage."; break;
  }
  return `Emily rolled a ${girl1} and I rolled a ${girl2}.\n${outcome}`
}

const twoKeyholderSlice = createSlice({
  name: 'TwoKeyholders',
  initialState,
  reducers: {
    flip(state) {
      if (!state.gameOver) {
        const flips = [flipCoin(), flipCoin()];
        state.sentence += getExtension(flips)
        state.flavorText = getFlavorText(flips)
        state.nextTurn = Math.floor(DateTime.now().plus({ seconds: modeOptions(state.mode).duration }).toSeconds())
        if(state.sentence === 0) {
          state.flavorText += 'Time to get you unlocked!'
          state.gameOver = true
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