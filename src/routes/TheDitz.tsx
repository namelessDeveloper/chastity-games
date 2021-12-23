import Status from "components/Status";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "routes";
import { Main, Hero, Speech, Credit } from "styles/layout";

import STRINGS from 'strings.json'
import image from 'assets/ditz.png'
import Countdown from "components/Countdown";
import useCountdown from "hooks/useCountdown";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DateTime } from "luxon";
import { ChastityGame, Mode } from "types";
import { Dice } from "utils/rollDice";
import { modeOptions } from "utils/modes";

const initialState: ChastityGame = {
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

const ditzSlice = createSlice({
  name: 'ditz',
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
    setMode(state, action: PayloadAction<Mode>) {
      state.mode = action.payload
    },
    restart(state) {
      if (state.mode === Mode.preview || state.sentence === 0)
      return initialState
    }
  }
})

const {flip, setMode, restart} = ditzSlice.actions

const description = [
  'Begin with 2 weeks.',
  'The Ditz is a Sex addict who gets Horny from your denial.',
  'She will cuck you with both boys and girls.',
  'Roll a 6 sided dice every day, if she gets a 6 she\'ll add ½ of your sentence or your initial sentence, which ever is smaller to your remaining sentence.',
]

const TheDitz = () => {
  const state = useSelector((state: RootState) => state.ditz)
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
      <Status>Days Locked: {state.count}</Status>
      {state.mode === "preview" && (
        <button onClick={handleStart}>Disable Preview Mode</button>
      )}
      <div style={{ display: 'flex' }}>
        <button onClick={handleFlip} disabled={!isCountDownOver || state.gameOver}>Roll Dice</button>
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
        Credit to <a href="https://www.reddit.com/user/Allychaste">u/Allychaste</a> for the caption idea.
      </Credit>
    </Main>
  )
}

export default TheDitz;

export const {reducer} = ditzSlice
