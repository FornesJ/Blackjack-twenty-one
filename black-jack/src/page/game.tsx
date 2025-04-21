import { Card, NumberCard, SpecialCard, AceCard } from "../services/Card";
import { Players, Dealer } from "../services/Player";
import { useState, useEffect } from "react";
import PlayerHand from "../components/PlayerHand";
import styles from "./styles/game.module.css";

type GameProps = {
    numPlayers: number;
    startGame: boolean;
}

const suits: string[] = ['C', 'D', 'H', 'S'];
const special: string[] = ['J', 'Q', 'K'];


export default function Game({numPlayers, startGame}: GameProps) {
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

        return deck;
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
        const cards = deck;
        const card = cards.pop();
        setDeck(cards);
        return card;
    }

    const remainingCards = (): number => {
        return deck.length;
    }

    const newPlayers = (): void => {
        const playersList: Players[] = []
        for (let i = 0; i < numPlayers - 1; i++) {
            playersList.push(new Players());
        }
        playersList.push(new Dealer());
        setPlayers(playersList);
    }

    const addCardToPlayer = (player: Players, card: Card | undefined): void => {
        player.addCard(card);
    }

    useEffect(() => {
        newDeck()
        newPlayers()

        for (let i = 0; i < 2; i++) {
            let card: Card | undefined = pickCard();
            if (card) {
                addCardToPlayer(players[0], card);
            }
        }

    }, [players, deck])

    if (startGame) {
        return (
            <div className={styles.game}>
                <PlayerHand player={players[0]} />
            </div>
        );
    } else {
        return <></>
    }
}