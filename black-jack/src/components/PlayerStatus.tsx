import styles from "./styles/components.module.css";
import { Players, Dealer } from "../services/Player";

type PlayerStatusFieldProp = {
    player: Players,
    id: number
}



export default function PlayerStatusField({player, id}: PlayerStatusFieldProp) {
    return (
        <div className={`${styles.positiontop} ${styles.flexcolumn}`}>
            <label>{player.isDealer ? "Dealer" : "Player: " + Number(id + 1)}</label>
            {player.isDealer ?
            (
                <label>Points: {(player as Dealer).revealed ? 
                    player.totValue : 
                    player.hand().length > 0 ? player.hand()[0].value : 0}
                </label>
            ) : (
                <label>Points: {player.totValue}</label>
            )}
        </div>
    );
}