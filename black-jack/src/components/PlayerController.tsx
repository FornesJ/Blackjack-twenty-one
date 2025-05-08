import styles from "./styles/components.module.css";
import { Players, PlayerStatus } from "../services/Player";

type PlayerControllerProps = {
    players: Players[], 
    id: number, 
    prevPlayer(): void, 
    nextPlayer(): void, 
    addCard(): void, 
    addFirstCards(): void, 
    playerHoldStatus(): void
}

export default function PlayerController({players, 
                                        id, 
                                        prevPlayer, 
                                        nextPlayer, 
                                        addCard, 
                                        addFirstCards, 
                                        playerHoldStatus}: PlayerControllerProps) {
    return (
        <div className={`${styles.positionbottom} ${styles.flexrow}`}>
            {id > 0 ?
            <button onClick={prevPlayer}>Previous Player</button> :
            undefined}

            {players[id].cards.length > 0 ?
                <button onClick={addCard} disabled={players[id].getStatus() === PlayerStatus.activ ? false : true}>Hit</button> : 
                <button onClick={addFirstCards}>Get cards</button>}
            
            {players[id].cards.length > 0 ?  
                <button onClick={playerHoldStatus}>Hold</button>: 
                undefined}
                
            {id < players.length -1 ? 
            (<button onClick={nextPlayer}>Next Player</button>) : 
            undefined}
        </div>
    );
}