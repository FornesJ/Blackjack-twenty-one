import { Card, NumberCard, SpecialCard, AceCard } from "../services/Card";
import { Players, Dealer } from "../services/Player";
import { useEffect, useState } from "react";
import Board from "../components/Board";
import styles from "./styles/game.module.css";
import DisplayCard from "../components/DisplayCard";

type GameProps = {
    numPlayers: number;
}

const suits: string[] = ['C', 'D', 'H', 'S'];
const special: string[] = ['J', 'Q', 'K'];


export default function Game({numPlayers}: GameProps) {
    const [players, setPlayers] = useState<Players[]>([]);
    const [deck, setDeck] = useState<Card[]>([]);

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
            player.cards = [...player.cards, card]; // immutably update cards
            updated[playerIndex] = player;
            return updated;
        });
    };

    const startGame = (): void => {
        if (deck.length === 0) newDeck();
        if (players.length === 0) newPlayers();
    }

    // Optional logging after deck updates
    useEffect(() => {
        if (deck.length > 0) {
            console.log("updated deck, number of cards:", deck.length);
        }
        if (players.length > 0) {
            console.log("updated player");
        }
    }, [deck, players]);

    return (
        <div className={styles.game}>
            <Board players={players} 
                cards={deck} 
                pickCard={pickCard} 
                updatePlayerCard={updatePlayerCard} 
                startGame={startGame} 
            />
        </div>
    );
}