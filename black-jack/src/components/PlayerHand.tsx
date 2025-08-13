import { GameStatus } from "../page/game";
import { Dealer, Players, PlayerStatus } from "../services/Player";
import DisplayCard from "./DisplayCard";
import styles from "./styles/components.module.css";

type PlayerHandProps = {
    player: Players | Dealer | undefined;
    addCard(): void;
    playerHoldStatus(): void;
    gameStatus: GameStatus;
}

export default function PlayerHand({player, addCard, playerHoldStatus, gameStatus}: PlayerHandProps) {
    // Check if player is a Dealer using a type guard, not instanceof
    const isDealer = (p: Players | Dealer ): p is Dealer => {
        return (p as Dealer).revealed !== undefined;
    };

    if (player !== undefined && player.hand().length > 0) {
        return (
            <div className={styles.flexcolumn}>
                {isDealer(player) ? (
                    <div className={styles.flexrow}>
                        {player.revealed ? (
                            player.hand().map((card, index) => (
                                <DisplayCard key={index} card={card} />
                            ))
                        ) : (
                            player.hand().map((card, index) => (
                                <DisplayCard key={index} card={index === 0 ? card : undefined} />
                            ))
                        )}
                    </div>
                ) : (
                    <div className={styles.flexrow}>
                        {player.hand().map((card, index) => (
                            <DisplayCard key={index} card={card} />
                        ))}
                    </div>
                )}
                {gameStatus === GameStatus.active ? (
                    <div className={`${styles.flexrow} ${styles.controllers}`}>
                        <button 
                            onClick={addCard} 
                            disabled={player.getStatus() === PlayerStatus.activ ? false : true}
                        >Hit</button>
                        
                        <button 
                            onClick={playerHoldStatus} 
                            disabled={player.status === PlayerStatus.activ ? false : true}
                        >Hold</button>
                    </div>
                ) : undefined}
            </div>
        );
    } else {
        return (
            <div className={styles.flexrow}>
                <DisplayCard card={undefined} />
            </div>
        );
    }
}