import React from 'react'
import { Main } from 'styles/layout';

const Settings = ({}) => {

  const handleReset = () => {
    localStorage.clear()
    console.log('Game saves cleared');
  }

  return (
    <Main>
      Clear all game data:
      <button onClick={handleReset}>Reset</button>
    </Main>
  )
}

export default Settings;