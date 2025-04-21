import { NumberCard, SpecialCard, AceCard } from "../services/Card";
import styles from "./styles/card.module.css";

type DisplayCardProps = {
    card: NumberCard | SpecialCard | AceCard;
}

export default function DisplayCard({card}: DisplayCardProps) {
    return (
        <div className={styles.cardContainer}>
            <img className={styles.card} src={card.img} alt="card"/>
            <label className={styles.cardLabel}>
                {card.getName()}
            </label>
        </div>
    );
}