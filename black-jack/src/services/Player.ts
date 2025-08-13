import { Card } from "./Card";

export enum PlayerStatus {
    busted,
    hold,
    activ,
}

interface IPlayer {
    cards: Card[];
    totValue: number;
    isDealer: boolean;
    status: PlayerStatus;
}

export class Players implements IPlayer {
    cards: Card[];
    totValue: number;
    isDealer: boolean;
    status: PlayerStatus;

    constructor() {
        this.cards = [];
        this.totValue = 0;
        this.isDealer = false;
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

    setStatus(status: PlayerStatus): void {
        this.status = status;
    }

    getStatus(): PlayerStatus {
        return this.status;
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