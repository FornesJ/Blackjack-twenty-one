interface ICard {
    suit: string;
    type: string
    value: number;
    img: string;
}

export abstract class Card implements ICard {
    constructor(suit: string, type: string, value: number) {
        this.type = type;
        this.suit = suit;
        this.value = value;
        this.img = '/card_images/' + this.getName() + '.png';
    }
    
    img: string;
    type: string;
    suit: string;
    value: number;

    getName(): string {
        return this.type + this.suit;
    }
}

export class NumberCard extends Card {
    constructor(suit: string, type: string, value: number) {
        super(suit, type, value);
    }
}

export class SpecialCard extends Card {
    constructor(suit: string, type: string) {
        super(suit, type, 10);
    }
}

export class AceCard extends Card {
    reduced: boolean;

    constructor(suit: string) {
        super(suit, 'A', 11);
        this.reduced = false;
    }

    reduceValue() {
        this.value = 1;
        this.reduced = true;
    }
}