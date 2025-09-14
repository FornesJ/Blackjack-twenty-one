import { useState } from "react";
import styles from "./styles/components.module.css";

type menuProps = {
    handleStart: () => void,
    handlePlayers: (value: number) => void, 
}

export default function StartMenu({handleStart, handlePlayers}: menuProps) {
    const [players, setPlayers] = useState(2);

    const handleSubmit = () => {
        if (players >= 2 && players <= 8) {
            handlePlayers(players);
            handleStart();
        }
    }

    return (
        <div className={`${styles.menubackground} ${styles.flexcolumn} ${styles.menufont} ${styles.positionfull}`}>
            <h1>BlackJack (Twenty-One)</h1>
            <form className={styles.flexcolumn} onSubmit={handleSubmit}>
                <label className={styles.formelements} >Select number of players</label>
                <input className={styles.formelements} 
                    type="number"
                    placeholder="2-8 players"
                    onChange={event => setPlayers(Number(event.target.value))} />
                <button className={styles.formelements} type="submit">Start</button>
            </form>
        </div>
    );
}