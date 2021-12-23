import Status from "components/Status";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "routes";
import { Main, Hero, Speech, Credit } from "styles/layout";

import STRINGS from 'strings.json'
import image from 'assets/two-kh.jpeg'
import Countdown from "components/Countdown";
import useCountdown from "hooks/useCountdown";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DateTime } from "luxon";
import { ChastityGame, Mode } from "types";
import { coinToString, flipCoin } from "utils/rollDice";
import { sum } from "utils/math";
import { modeOptions } from "utils/modes";

//

const initialState: ChastityGame = {
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
    setMode(state, action: PayloadAction<Mode>) {
      state.mode = action.payload
    },
    restart(state) {
      if (state.mode === Mode.preview || state.sentence === 0)
      return initialState
    }
  }
})

const {flip, setMode, restart} = twoKeyholderSlice.actions

const TwoKeyholders = () => {
  const state = useSelector((state: RootState) => state.twoKeyholders)
  const { countDown, isCountDownOver, resetCountdown } = useCountdown(state.nextTurn);

  const dispatch = useAppDispatch()

  const handleStart = () => {
    const isSure = window.confirm(STRINGS.DISABLE_PREVIEW)
    if (isSure) {
      dispatch(setMode(Mode.real))
    }
  }

  const handleFlip = () => {
    resetCountdown()
    dispatch(flip())
  }

  const handleReset = () => {
    dispatch(restart())
  }

  return (
    <Main>
      <Hero src={image}/>
      <Status>Sentence: {state.sentence} <Countdown timeLeft={countDown}/></Status>
      <Status>Days Locked: {state.count} </Status>
      {state.mode === "preview" && (
        <button onClick={handleStart}>Disable Preview Mode</button>
      )}
      <div style={{ display: 'flex' }}>
        <button onClick={handleFlip} disabled={!isCountDownOver && state.gameOver}>Flip Coins</button>
        {(state.mode === Mode.preview || state.sentence === 0) && (
          <button onClick={handleReset}>Reset</button>
        )}
      </div>
      {state.flavorText && (
        <Speech>
          {state.flavorText}
        </Speech>
      )}

        <Credit>
        Credit to <a href="https://www.reddit.com/user/Friedes_Evil_Twinsis/">u/Friedes_Evil_Twinsis</a> for the caption idea.
        </Credit>
    </Main>
  )
}

export default TwoKeyholders;

export const {reducer} = twoKeyholderSlice
