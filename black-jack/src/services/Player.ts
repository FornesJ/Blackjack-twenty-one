import { Card } from "./Card";

interface IPlayer {
    cards: Card[];
    totValue: number;
    isDealer: boolean;
}

export class Players implements IPlayer {
    cards: Card[];
    totValue: number;
    isDealer: boolean;

    constructor() {
        this.cards = [];
        this.totValue = 0;
        this.isDealer = false;
    }

    addCard(card: Card | undefined): void {
        if (card) {
            this.totValue += card.value;
            this.cards.push(card);
        }
    }

    removeCards(): void {
        this.cards = [];
        this.totValue = 0;
    }

    hand(): Card[] {
        return this.cards;
    }
}

export class Dealer extends Players {
    revealed: boolean;
    constructor() {
        super();
        this.isDealer = true;
        this.revealed = false;
    }

    releaveHands(): void {
        this.revealed = true;
    }
}