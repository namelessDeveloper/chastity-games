import { DateTime } from "luxon"
import { useState } from "react"
import { useTimer } from "./useTimer"

export default function useCountdown(secondsToNextTurn: number) {
  const [canFlip, setCanFlip] = useState(!secondsToNextTurn)
  const [countDown, setCountdown] = useState<number>(0)

  useTimer(() => {
    const timeLeft = secondsToNextTurn - DateTime.now().toSeconds()
    setCountdown(timeLeft)
    if (timeLeft < 0) {
      setCanFlip(true)
    }
  })

  return {
    countDown,
    isCountDownOver: canFlip,
    resetCountdown: () => setCanFlip(false),
  }
}