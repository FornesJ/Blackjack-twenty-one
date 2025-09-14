import { Card } from "./Card";
import { Hand } from "./Hand";

export enum PlayerStatus {
    busted,
    hold,
    activ,
}

interface IPlayer {
    isDealer: boolean;
    hands: Hand[];
    currHand: number;
}

export class Players implements IPlayer {
    isDealer: boolean;
    hands: Hand[];
    currHand: number;

    constructor() {
        this.isDealer = false;
        this.hands = [];
        this.currHand = 0;
        this.hands.push(new Hand());
    }

    addCard(card: Card | undefined): void {
        if (card) {
            this.hands[this.currHand].addCard(card);
        }
    }

    removeCards(): void {
        this.hands[this.currHand].removeCards();
    }

    removeLastCard(): Card | undefined {
        const card: Card | undefined = this.hands[this.currHand].cards.pop();
        if (!card) return undefined;
        const newValue = this.hands[this.currHand].totValue -= card.value;
        this.hands[this.currHand].setTotValue(newValue);
        return card;
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
        this.hands[this.currHand].setStatus(status);
    }

    getStatus(): PlayerStatus {
        return this.hands[this.currHand].getStatus();
    }

    addHand(): void {
        this.hands.push(new Hand());
    }

    numberOfHands(): number {
        return this.hands.length;
    }

    changeHand(pos: number): void {
        if (pos > -1 && pos < this.numberOfHands()) this.currHand = pos;
    }

    getCurrentHand(): Hand {
        return this.hands[this.currHand];
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