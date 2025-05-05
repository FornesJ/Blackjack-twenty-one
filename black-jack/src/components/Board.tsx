import PlayerHand from "./PlayerHand";
import { useEffect, useState } from "react";
import { Players, Dealer, PlayerStatus } from "../services/Player";
import { Card, AceCard, NumberCard, SpecialCard } from "../services/Card";
import styles from "./styles/board.module.css";
import DisplayCard from "./DisplayCard";

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
            if (card != undefined) {
                updatePlayerCard(playerId, card);
            }
        }
    }

    const addCard = (): void => {
        let card: Card | undefined = pickCard();
        if (card != undefined) {
            updatePlayerCard(playerId, card);
        }
    }

    return (
        <div className={styles.board}>
            {cards.length === 0 || players.length === 0 || players[playerId].cards.length === 0 ?
            undefined : (
                <div className={styles.playerStatus}>
                    <label>{players[playerId].isDealer ? "Dealer" : "Player: " + playerId}</label>
                    {players[playerId].isDealer ?
                    (
                        <label>Points: {(players[playerId] as Dealer).revealed ? 
                            players[playerId].totValue : 
                            players[playerId].hand()[0].value}</label>
                    ) : (
                        <label>Points: {players[playerId].totValue}</label>
                    )}
                </div>
            )}
            {cards.length === 0 && players.length === 0 ? (
                <DisplayCard card={undefined} />
            ) : 
            (
                <PlayerHand player={players[playerId]} />
            )}
            {cards.length === 0 && players.length === 0 ? (
                <div className={styles.controlBoard}>
                    <button onClick={startGame}>Shuffle New Deck</button>
                </div>
            ) : (
                <div className={styles.controlBoard}>
                    {playerId > 0 ?
                    <button onClick={prevPlayer}>Previous Player</button> :
                    undefined}
    
                    {players[playerId].cards.length > 0 ?
                        <button onClick={addCard} disabled={players[playerId].getStatus() == PlayerStatus.activ ? false : true}>Hit</button> : 
                        <button onClick={addFirstCards}>Get cards</button>}
                    
                    {players[playerId].cards.length > 0 ?  
                        <button onClick={() => updatePlayerStatus(playerId, PlayerStatus.hold)}>Hold</button>: 
                        undefined}
                        
                    {playerId < players.length -1 ? 
                    (<button onClick={nextPlayer}>Next Player</button>) : 
                    undefined}
                </div>
            )}
        </div>
    );
}