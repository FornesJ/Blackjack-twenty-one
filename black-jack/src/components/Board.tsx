import PlayerHand from "./PlayerHand";
import { useState } from "react";
import PlayerStatusField from "./PlayerStatus";
import PlayerController from "./PlayerController";
import DisplayCard from "./DisplayCard";
import { Players, Dealer, PlayerStatus } from "../services/Player";
import { Card } from "../services/Card";
import styles from "./styles/components.module.css";

type BoardProps = {
    players: Players[],
    cards: Card[],
    pickCard(): Card | undefined
    updatePlayerCard(playerIndex: number, card: Card): void,
    updatePlayerStatus(playerIndex: number, status: PlayerStatus): void
    startGame(): void
}

export default function Board({players, 
                            cards, 
                            pickCard, 
                            updatePlayerCard, 
                            startGame, 
                            updatePlayerStatus}: BoardProps) {
    const [playerId, setPlayerId] = useState(0);

    const nextPlayer = () => {
        let id = playerId;
        if (id < players.length - 1) {
            id++;
            setPlayerId(id);
        }
    }

    const prevPlayer = () => {
        let id = playerId;
        if (id > 0) {
            id--;
            setPlayerId(id);
        }
    }

    const addFirstCards = (): void => {
        for (let i = 0; i < 2; i++) {
            let card: Card | undefined = pickCard();
            if (card !== undefined) {
                updatePlayerCard(playerId, card);
            }
        }
        // players[playerId].isDealer ? firstPlayer() : nextPlayer();
    }

    const addCard = (): void => {
        let card: Card | undefined = pickCard();
        if (card !== undefined) {
            updatePlayerCard(playerId, card);
        }
    }

    const playerHoldStatus = () => {
        updatePlayerStatus(playerId, PlayerStatus.hold);
    }


    return (
        <div className={styles.flexcolumn}>
            {cards.length === 0 || players.length === 0 ?
            (
                <div className={`${styles.positiontop} ${styles.flexcolumn}`}>
                    <h3>Shuffle Deck to Start Game!</h3>
                </div>
            ) : (
                <PlayerStatusField player={players[playerId]} id={playerId}/>
            )}

            {cards.length === 0 && players.length === 0 ? 
            <DisplayCard card={undefined} /> : 
            <PlayerHand player={players[playerId]} />}

            {cards.length === 0 && players.length === 0 ? (
                <div className={`${styles.positionbottom} ${styles.flexrow}`}>
                    <button onClick={startGame}>Shuffle New Deck</button>
                </div>
            ) : (
                <PlayerController players={players} 
                                id={playerId} 
                                prevPlayer={prevPlayer} 
                                nextPlayer={nextPlayer} 
                                addCard={addCard} 
                                addFirstCards={addFirstCards} 
                                playerHoldStatus={playerHoldStatus}/>
            )}
        </div>
    );
}