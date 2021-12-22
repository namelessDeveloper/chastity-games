import { Mode } from "types"

type ModeOptions = {
  duration: number
}

export function modeOptions(mode: Mode, realOptions: ModeOptions = {duration: 60*60*24}): ModeOptions {
  switch (mode) {
    case Mode.preview:
      return {
        duration: 0
      }
    default:
    case Mode.real:
      return realOptions
  }
}