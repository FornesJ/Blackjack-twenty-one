import React, { useState, ChangeEvent } from "react";
import StartMenu from "./components/StartMenu";
import './App.css';
import Game from "./page/game";

function App() {
  const [menu, setMenu] = useState(true);
  const [players, setPlayers] = useState<number>(2);
  
  const handlePlayers = (event: ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(event.target.value, 10);
      if (!isNaN(value)) {
          if (value >= 2 && value <= 8) {
              setPlayers(value);
          }
      }
  }

  const handleStart = () => {
    setMenu(false);
  }

  return (
    <div className="App">
      {menu ? <StartMenu handleStart={handleStart} players={players} handlePlayers={handlePlayers} /> : 
      <Game numPlayers={players} startGame={true} />}
    </div>
  );
}

export default App;
