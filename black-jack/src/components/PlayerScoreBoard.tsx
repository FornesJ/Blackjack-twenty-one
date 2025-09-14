import { Dealer, Players, PlayerStatus } from "../services/Player";
import styles from "./styles/components.module.css";

type PlayerScoreBoardProps = {
    players: Players[];
}

export const PlayerScoreBoard = ({players}: PlayerScoreBoardProps) => {
    const printStatus = (status: PlayerStatus) => {
        let str: string;
    
        status === PlayerStatus.hold ? str = "Hold" : (
            status === PlayerStatus.busted ? str = "Busted" :
            str = "Active"
        );
    
        return str;
    };

    return (
        <table className={`${styles.positiontopleft} ${styles.leaderboard}`}>
            <tr className={styles.tablehead}>
                <th>Player</th>
                <th>Points</th>
                <th>Status</th>
            </tr>
            {players.map(( player: Players) => (
                <tr>
                    <td>{player.isDealer ? "Dealer" : `Player ${players.indexOf(player) + 1}`}</td>
                    <td>{player.getTotalValue()}</td>
                    <td>{printStatus(player.getStatus())}</td>
                </tr>
            ))}
        </table>
    );
}