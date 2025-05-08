import { NumberCard, SpecialCard, AceCard } from "../services/Card";
import styles from "./styles/components.module.css";

type DisplayCardProps = {
    card: NumberCard | SpecialCard | AceCard | undefined;
}

export default function DisplayCard({card}: DisplayCardProps) {
    if (card) {
        return (
            <div className={styles.flexcolumn}>
                <img className={styles.cards} src={card.img} alt="card"/>
                <label className={styles.cardlabel}>
                    {card.getName()}
                </label>
            </div>
        );
    } else {
        return (
            <div className={styles.flexcolumn}>
                <img className={styles.cards} src="/card_images/red_back.png" alt="card"/>
                <label className={styles.cardlabel}>
                    ...
                </label>
            </div>
        );
    }
}