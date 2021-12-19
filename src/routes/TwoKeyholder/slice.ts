import { createSlice } from "@reduxjs/toolkit";
import { DateTime } from "luxon";
import { coinToString, flipCoin } from "utils/coins";

type TwoKeyholdersGameState = {
  isPreview: boolean;
  sentence: number;
  nextTurn?: number;
  flavorText?: string;
}

const initialState: TwoKeyholdersGameState = {
  isPreview: false,
  sentence: 3,
  flavorText: undefined,
}

function getOutcomeText(sum: number) {
  switch(sum) {
    case 0: return "One day less in the cage."
    case 1: return "Another day in the cage."
    case 2: return "Ouch! Looks like another 3 in the cage."
  }
}

const TURN_DELAY = process.env.NODE_ENV === 'development' ? 60 : 60*60*24;

const twoKeyholderSlice = createSlice({
  name: 'TwoKeyholders',
  initialState,
  reducers: {
    flip(state) {
      const flips = [flipCoin(), flipCoin()];
      const sum = flips.reduce((a, b) => a + b)
      // if 0 -> 0, if 1 -> 1, if 2 -> 3
      const extension = sum === 2 ? 3 : sum

      state.sentence += extension
      state.flavorText = `Emily rolled a ${coinToString(flips[0])} and I rolled a ${coinToString(flips[1])}.\n${getOutcomeText(sum)}`
      state.nextTurn = Math.floor(DateTime.now().plus({ seconds: TURN_DELAY }).toSeconds())
    }
  }
})

export default twoKeyholderSlice.reducer
export const {flip} = twoKeyholderSlice.actions