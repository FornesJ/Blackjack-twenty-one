import { Card } from "./Card";
import { PlayerStatus } from "./Player";

interface IHand {
    cards: Card[];
    totValue: number;
    split: boolean;
    status: PlayerStatus;
}

export class Hand implements IHand {
    cards: Card[];
    totValue: number;
    split: boolean;
    status: PlayerStatus;

    constructor() {
        this.cards = [];
        this.totValue = 0;
        this.split = false;
        this.status = PlayerStatus.activ;
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

    setSplit(): void {
        if (this.split) {
            this.split = false;
        } else {
            this.split = true;
        }
    }

    getSplit(): boolean {
        return this.split;
    }

    setStatus(status: PlayerStatus): void {
        this.status = status;
    }

    getStatus(): PlayerStatus {
        return this.status;
    }
}