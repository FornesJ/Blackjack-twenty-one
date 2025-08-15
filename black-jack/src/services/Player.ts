import { Card } from "./Card";
import { Hand } from "./Hand";

export enum PlayerStatus {
    busted,
    hold,
    activ,
}

interface IPlayer {
    isDealer: boolean;
    status: PlayerStatus;
    hands: Hand[];
    currHand: number;
}

export class Players implements IPlayer {
    isDealer: boolean;
    status: PlayerStatus;
    hands: Hand[];
    currHand: number;

    constructor() {
        this.isDealer = false;
        this.status = PlayerStatus.activ;
        this.hands = [];
        this.currHand = 0;
        this.hands.push(new Hand);
    }

    addCard(card: Card | undefined): void {
        if (card) {
            this.hands[this.currHand].addCard(card);
        }
    }

    removeCards(): void {
        this.hands[this.currHand].removeCards();
    }

    hand(): Card[] {
        return this.hands[this.currHand].hand();
    }

    setTotValue(value: number): void {
        this.hands[this.currHand].setTotValue(value);
    }

    getTotalValue(): number {
        return this.hands[this.currHand].totValue;
    }

    setStatus(status: PlayerStatus): void {
        this.status = status;
    }

    getStatus(): PlayerStatus {
        return this.status;
    }

    addHand(): void {
        this.hands.push(new Hand);
    }

    numberOfHands(): number {
        return this.hands.length;
    }

    changeHand(pos: number): void {
        if (pos > -1 && pos < this.numberOfHands()) this.currHand = pos;
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

    getTotalValue(): number {
        return this.revealed ? 
            this.hands[this.currHand].totValue : 
            (this.hands[this.currHand].hand().length > 0) ? 
            this.hands[this.currHand].hand()[0].value : 0;
    }        
}