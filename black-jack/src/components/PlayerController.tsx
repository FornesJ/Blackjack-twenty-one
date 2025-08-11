import styles from "./styles/components.module.css";
import { Players, PlayerStatus } from "../services/Player";
import Game, { GameStatus } from "../page/game";

type PlayerControllerProps = {
    players: Players[], 
    id: number, 
    prevPlayer(): void, 
    nextPlayer(): void,
    firstPlayer(): void, 
    addCard(): void, 
    addFirstCards(): void, 
    playerHoldStatus(): void
    gameStatus: GameStatus;
}

export default function PlayerController({players, 
                                        id, 
                                        prevPlayer, 
                                        nextPlayer,
                                        firstPlayer, 
                                        addCard, 
                                        addFirstCards, 
                                        playerHoldStatus,
                                        gameStatus}: PlayerControllerProps) {
                                            
    if (gameStatus === GameStatus.start) {
        return (
            <div className={`${styles.positionbottom} ${styles.flexrow}`}>
                {players[id].hand().length === 0 ? 
                <button onClick={addFirstCards}>Get cards</button> : 
                <button disabled>Get cards</button>}
                {id < players.length - 1 ? 
                    players[id].hand().length === 0 ? 
                        <button disabled>Next Player</button> : 
                        <button onClick={nextPlayer}>Next Player</button> 
                    : 
                    players[id].hand().length === 0 ? 
                        <button disabled>Start</button> :
                        <button onClick={firstPlayer}>Start</button>}
            </div>
        );
    } else if (gameStatus === GameStatus.active) {
        return (
            <div className={`${styles.positionbottom} ${styles.flexrow}`}>
                {id > 0 ?
                <button onClick={prevPlayer}>Previous Player</button> :
                undefined}
                <button onClick={addCard} disabled={players[id].getStatus() === PlayerStatus.activ ? false : true}>Hit</button>
                <button onClick={playerHoldStatus}>Hold</button>
                {id < players.length - 1 ? 
                (<button onClick={nextPlayer}>Next Player</button>) : 
                undefined}
            </div>
        );
    } else {
        return <div></div>;
    }
}