import { Card } from "./Card";

interface IHand {
    cards: Card[];
    totValue: number;
}

export class Hand implements IHand {
    cards: Card[];
    totValue: number;

    constructor() {
        this.cards = [];
        this.totValue = 0;
    }

    addCard(card: Card | undefined): void {
        if (card) {
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

    setTotValue(value: number): void {
        this.totValue = value;
    }

}