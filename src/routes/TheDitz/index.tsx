import Status from "components/Status";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "routes";
import { Main, Hero, Speech } from "styles/layout";

import STRINGS from 'strings.json'
import image from 'assets/ditz.png'
import { flip, restart, setMode } from "./slice";
import Countdown from "components/Countdown";
import useCountdown from "hooks/useCountdown";
import { Mode } from "types";

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


    </Main>
  )
}

export default TheDitz;


