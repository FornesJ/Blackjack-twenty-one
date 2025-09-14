import { Players, PlayerStatus } from "../services/Player";
import styles from "./styles/components.module.css";

type gameMunuProps = {
    players: Players[];
    winner: number;
}

export const GameMenu = ({players, winner}: gameMunuProps) => {

    const newGame = () => {
        window.location.reload();
    }

    return (
        <div className={`${styles.menubackground} ${styles.flexcolumn} ${styles.menufont} ${styles.positionfull}`}>
            {winner > -1 ? 
                (<h1>{players[winner].isDealer ? "Dealer Won!" : "Player " + (winner + 1) + " Won!"}</h1>) : 
            <h1>No winners</h1>}
            <button>New Game</button>
            <button onClick={newGame}>To Start Menu</button>
        </div>
    );
}