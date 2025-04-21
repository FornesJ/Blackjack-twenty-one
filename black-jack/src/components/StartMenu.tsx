import { ChangeEvent } from "react";
import styles from "./styles/menu.module.css";

type menuProps = {
    handleStart: () => void,
    handlePlayers: (event: ChangeEvent<HTMLInputElement>) => void, 
    players: number,
}

export default function StartMenu({handleStart, handlePlayers, players}: menuProps) {
    return (
        <div className={styles.menu}>
            <h1>BlackJack (Twenty-One)</h1>
            <form className={styles.menuform}>
                <label id={styles.labelfield}>Select number of players</label>
                <input id={styles.inputfield} type="number" value={players} onChange={handlePlayers} />
                <button id={styles.startbutton} onClick={handleStart}>Start</button>
            </form>
        </div>
    );
}