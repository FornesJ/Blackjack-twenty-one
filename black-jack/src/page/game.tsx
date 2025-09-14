import { Card, NumberCard, SpecialCard, AceCard } from "../services/Card";
import { Players, Dealer, PlayerStatus } from "../services/Player";
import { useEffect, useState } from "react";
import Board from "../components/Board";
import styles from "./styles/page.module.css";
import { Hand } from "../services/Hand";

type GameProps = {
    numPlayers: number;
}

export enum GameStatus {
    wait,
    start,
    active,
    stop
}

const suits: string[] = ['C', 'D', 'H', 'S'];
const special: string[] = ['J', 'Q', 'K'];


export default function Game({numPlayers}: GameProps) {
    const [players, setPlayers] = useState<Players[]>([]);
    const [deck, setDeck] = useState<Card[]>([]);
    const [status, setStatus] = useState<GameStatus>(GameStatus.wait);

    const fillDeck = (): Card[] => {
        const cards: Card[] = []; // initialize deck
        
        // fill deck with special cards
        suits.forEach(suit => {
            special.forEach(type => {
                let card = new SpecialCard(suit, type);
                cards.push(card);
            });
        });

        // fill deck with ace cards
        suits.forEach(suit => {
            let card = new AceCard(suit);
            cards.push(card);
        });

        // fill deck with number cards
        for (let i = 2; i <= 10; i++) {
            suits.forEach(suit => {
                let card = new NumberCard(suit, String(i), i);
                cards.push(card);
            });
        }

        return cards;
    }

    const shuffleDeck = (cards: Card[]): Card[] => {
        // loop through cards and shuffle possitions
        for (let i = cards.length - 1; i >= 0; i--) {
            let j = Math.floor(Math.random() * i + 1);

            let temp = cards[i];
            cards[i] = cards[j];
            cards[j] = temp;
        }

        return cards;
    }

    const newDeck = (): void => {
        let cards: Card[] = fillDeck();
        cards = shuffleDeck(cards);
        setDeck(cards);
    }

    const pickCard = (): Card | undefined => {
        let cards = deck;
        let card = cards.pop();
        setDeck(cards);
        return card;
    }

    const newPlayers = (): void => {
        const playersList: Players[] = []
        while (numPlayers > 1) {
            playersList.push(new Players());
            numPlayers --;
        }
        playersList.push(new Dealer());
        numPlayers--;
        setPlayers(playersList);
    }

    const updatePlayerCard = (playerIndex: number, card: Card): void => {
        setPlayers(prevPlayers => {
            const updated: Players[] = [...prevPlayers];
            const player: Players = updated[playerIndex]; // clone the player

            // check if player can split
            player.hand().map((c: Card) => {
                if (card.type === c.type) {
                    const currHand: Hand = player.getCurrentHand();
                    if (!currHand.getSplit()) currHand.setSplit();
                }
            })

            // if card is an ace
            if (card.type === 'A' && player.getTotalValue() > 10) (card as AceCard).reduceValue();
            player.addCard(card); // immutably update cards
            player.setTotValue(player.getTotalValue() + card.value);

            // check if player has an ace that has not been reduced
            if (player.getTotalValue() > 21) {
                // update player total value
                player.hand().forEach(card => {
                    if (
                        card.type === 'A' && 
                        !(card as AceCard).reduced
                    ) {
                        (card as AceCard).reduceValue();
                        player.setTotValue(player.getTotalValue() - 10);
                    }
                });
            }


            updated[playerIndex] = player;
            return updated;
        });
    };

    const updatePlayerStatus = (playerIndex: number, status: PlayerStatus): void => {
        setPlayers(prevPlayers => {
            const updated: Players[] = [...prevPlayers];
            const player: Players = updated[playerIndex]; // clone the player
            player.setStatus(status);
            updated[playerIndex] = player;
            return updated;
        })
    }

    const splitPlayerHand = (playerIndex: number): void =>{
        setPlayers(prevPlayers => {
            const updated: Players[] = [...prevPlayers];
            const player: Players = updated[playerIndex]; // clone the player

            const splitCard = player.removeLastCard();

            if (splitCard?.type === 'A') {
                if ((splitCard as AceCard).reduced) {
                    (splitCard as AceCard).reduced = false;
                    (splitCard as AceCard).value = 11;
                }
            }

            if (splitCard) {
                player.getCurrentHand().setSplit();
                player.addHand()
                player.changeHand(player.currHand + 1);
                player.addCard(splitCard); // immutably update cards
                player.setTotValue(player.getTotalValue() + splitCard.value);
                updated[playerIndex] = player
            }

            return updated;
        })
    }

    const changePlayerHand = (handIndex: number, playerIndex: number): void => {
        if (handIndex < players[playerIndex].hands.length && handIndex > -1) {
            setPlayers(prevPlayers => {
                const updated: Players[] = [...prevPlayers];
                const player: Players = updated[playerIndex]; // clone the player
                player.changeHand(handIndex);
                updated[playerIndex] = player;
                return updated;
            })
        }
    }

    const revealDealerCard = () : void => {
        setPlayers(prevPlayers => {
            const updated: Players[] = [...prevPlayers];
            const player: Players = updated[players.length - 1]; // clone the player
            (player as Dealer).releaveHands();
            updated[players.length - 1] = player;
            return updated;
        })
    }

    const startGame = (): void => {
        if (deck.length === 0) newDeck();
        if (players.length === 0) newPlayers();
        setStatus(GameStatus.start);
    }

    const handleGameStatus = (status: GameStatus) => {
        setStatus(status);
    }

    // Optional logging after deck updates
    useEffect(() => {
        if (deck.length > 0) {
            console.log("updated deck, number of cards:", deck.length);
        }
        if (players.length > 0) {
            console.log("updated player");

            let dealersTurn = true;

            players.forEach((player, index) => {
                // check if player has busted
                if (player.getStatus() === PlayerStatus.activ && player.getTotalValue() > 21) {
                    updatePlayerStatus(index, PlayerStatus.busted)
                } 
                
                // check if its the dealers turn
                if (player.getStatus() === PlayerStatus.activ && index < players.length - 1) {
                    dealersTurn = false;
                }
            })

            if (dealersTurn && !(players[players.length -1] as Dealer).revealed) {
                revealDealerCard();
            }
        }
    }, [deck, players]);

    return (
        <div className={styles.game}>
            <Board players={players} 
                cards={deck} 
                pickCard={pickCard} 
                updatePlayerCard={updatePlayerCard} 
                startGame={startGame} 
                updatePlayerStatus={updatePlayerStatus}
                gameStatus={status}
                handleStatus={handleGameStatus}
                splitPlayerHand={splitPlayerHand}
                changePlayerHand={changePlayerHand}
            />
        </div>
    );
}