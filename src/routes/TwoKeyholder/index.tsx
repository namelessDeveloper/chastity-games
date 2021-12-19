import Status from "components/Status";
import { useTimer } from "hooks/useTimer";
import { DateTime } from "luxon";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "routes";
import { Main, Hero, Speech } from "styles/layout";

import STRINGS from 'strings.json'
import image from 'assets/two-kh.jpeg'
import { flip, Mode, restart, setMode } from "./slice";
import Countdown from "components/Countdown";


const TwoKeyholders = () => {
  const state = useSelector((state: RootState) => state.twoKeyholders)
  const dispatch = useAppDispatch()
  const [canFlip, setCanFlip] = useState(!state.nextTurn)
  const [countDown, setCountdown] = useState<number>(0)

  useTimer(() => {
    if (state.nextTurn) {
      const timeLeft = state.nextTurn - DateTime.now().toSeconds()
      setCountdown(timeLeft)
      if (timeLeft < 0) {
        setCanFlip(true)
      }
    }
  })

  const handleStart = () => {
    const isSure = window.confirm(STRINGS.DISABLE_PREVIEW)
    if (isSure) {
      dispatch(setMode(Mode.real))
    }
  }


  const handleFlip = () => {
    setCanFlip(false)
    dispatch(flip())
  }

  const handleReset = () => {
    dispatch(restart())
  }

  return (
    <Main>
      <Hero src={image}/>
      <Status>Sentence: {state.sentence} <Countdown timeLeft={countDown}/></Status>
      {state.mode === "preview" && (
        <button onClick={handleStart}>Disable Preview Mode</button>
      )}
      <div style={{ display: 'flex' }}>
        <button onClick={handleFlip} disabled={!canFlip}>Flip Coins</button>
        {(state.mode === Mode.preview || state.sentence === 0) && (
          <button onClick={handleReset}>Reset</button>
        )}
      </div>
      {state.flavorText && (
        <Speech>
          {state.flavorText}
        </Speech>
      )}


    </Main>
  )
}

export default TwoKeyholders;


