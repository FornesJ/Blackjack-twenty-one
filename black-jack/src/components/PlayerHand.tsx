import { Dealer, Players } from "../services/Player";
import DisplayCard from "./DisplayCard";
import styles from "./styles/components.module.css";

type PlayerHandProps = {
    player: Players | Dealer | undefined;
}

export default function PlayerHand({player}: PlayerHandProps) {
    // Check if player is a Dealer using a type guard, not instanceof
    const isDealer = (p: Players | Dealer ): p is Dealer => {
        return (p as Dealer).revealed !== undefined;
    };

    if (player !== undefined && player.hand().length > 0) {
        return (
            <>
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
            </>
        );
    } else {
        return (
            <div className={styles.flexrow}>
                <DisplayCard card={undefined} />
            </div>
        );
    }
}