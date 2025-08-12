import PlayerHand from "./PlayerHand";
import { useState } from "react";
import PlayerStatusField from "./PlayerStatus";
import PlayerController from "./PlayerController";
import DisplayCard from "./DisplayCard";
import { Players, Dealer, PlayerStatus } from "../services/Player";
import { Card } from "../services/Card";
import styles from "./styles/components.module.css";
import { GameStatus } from "../page/game";
import { PlayerScoreBoard } from "./PlayerScoreBoard";

type BoardProps = {
    players: Players[],
    cards: Card[],
    pickCard(): Card | undefined,
    updatePlayerCard(playerIndex: number, card: Card): void,
    updatePlayerStatus(playerIndex: number, status: PlayerStatus): void,
    startGame(): void,
    gameStatus: GameStatus,
    handleStatus(status: GameStatus): void
}

export default function Board({players, 
                            cards, 
                            pickCard, 
                            updatePlayerCard, 
                            startGame, 
                            updatePlayerStatus,
                            gameStatus,
                            handleStatus
                        }: BoardProps) {
    const [playerId, setPlayerId] = useState(0);

    const firstPlayer = () => {
        setPlayerId(0);
        handleStatus(GameStatus.active);
    }

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
        <>
            {gameStatus === GameStatus.wait ?
                (
                    <div className={styles.flexcolumn}>
                        <div className={`${styles.positiontop} ${styles.flexcolumn}`}>
                            <h3>Shuffle Deck to Start Game!</h3>
                        </div>
                        <DisplayCard card={undefined} />
                        <div className={`${styles.positionbottom} ${styles.flexrow}`}>
                            <button onClick={startGame}>Shuffle New Deck</button>
                        </div>
                    </div>
                ) : (
                    <div className={styles.flexcolumn}>
                        <PlayerStatusField player={players[playerId]} id={playerId}/>
                        <PlayerScoreBoard players={players}/>
                        <PlayerHand player={players[playerId]} />
                        <PlayerController players={players} 
                                id={playerId} 
                                prevPlayer={prevPlayer} 
                                nextPlayer={nextPlayer} 
                                firstPlayer={firstPlayer}
                                addCard={addCard} 
                                addFirstCards={addFirstCards} 
                                playerHoldStatus={playerHoldStatus}
                                gameStatus={gameStatus}/>
                    </div>
                )}
        </>
    );
}