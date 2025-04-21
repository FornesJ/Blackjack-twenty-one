import { Dealer, Players } from "../services/Player";
import { Card } from "../services/Card";
import DisplayCard from "./DisplayCard";
import styles from "./styles/hand.module.css";

type PlayerHandProps = {
    player: Players | Dealer | undefined;
}

export default function PlayerHand({player}: PlayerHandProps) {
    // Check if player is a Dealer using a type guard, not instanceof
    const isDealer = (p: Players | Dealer ): p is Dealer => {
        return (p as Dealer).revealed !== undefined;
    };

    if (player !== undefined && isDealer(player)) {
        return (
            <div>
                {player.revealed ? (
                    player.hand().map((card, index) => (
                        <DisplayCard key={index} card={card} />
                    ))
                ) : (
                    <DisplayCard card={player.hand()[0]} />
                )}
            </div>
        );
    } else if (player !== undefined) {
        // If it's a Player, render their hand normally
        return (
            <div>
                {player.hand().map((card, index) => (
                    <DisplayCard key={index} card={card} />
                ))}
            </div>
    );
    } else {
        return <></>;
    }
}