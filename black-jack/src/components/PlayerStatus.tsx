import styles from "./styles/components.module.css";
import { Players, Dealer, PlayerStatus } from "../services/Player";

type PlayerStatusFieldProp = {
    player: Players,
    id: number
}



export default function PlayerStatusField({player, id}: PlayerStatusFieldProp) {
    const printStatus = (status: PlayerStatus) => {
            let str: string;
        
            status === PlayerStatus.hold ? str = "Hold" : (
                status === PlayerStatus.busted ? str = "Busted" :
                str = "Active"
            );
        
            return str;
        };
        
    return (
        <div className={`${styles.positiontop} ${styles.flexcolumn}`}>
            <label>{player.isDealer ? "Dealer" : "Player: " + Number(id + 1)}</label>
            <label>Points: {player.getTotalValue()}</label>
            <label>Status: {printStatus(player.getStatus())}</label>
        </div>
    );
}