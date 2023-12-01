import styles from './card.module.css';
import { Link } from "react-router-dom";


type Props = {
    cardData: any;
}

//It is a card component , we are using in grid of characters

const CharacterCard = (props: Props) => {

    const { cardData }: any = props;

    return (
        <div className={styles.card}>
            <Link to={`/character/${cardData.id}`}><img src={cardData.image} /></Link>
            <div className={styles.contentDiv}>
                <div className={styles.contentheading}>
                    <span className={styles.name}>{cardData.name}</span>
                    <span style={{ marginTop: '5px' }}><span className={cardData.status === 'Alive' ? styles.alive : styles.dead}></span>{cardData.status}</span>
                </div>
                <div className={styles.contentheading}>
                    <span><span style={{ color: 'rgb(158, 158, 158)' }}>species: </span>{cardData.species}</span>
                    <span><span style={{ color: 'rgb(158, 158, 158)' }}>gender: </span>{cardData.gender}</span>
                </div>
                <p><span style={{ color: 'rgb(158, 158, 158)' }}>Last Known Loaction:</span><br /> <span>{cardData.location.name}</span></p>
                <p><span style={{ color: 'rgb(158, 158, 158)' }}>First seen in:</span><br /> <span>{cardData.origin.name}</span></p>
            </div>
        </div>
    )

}

export default CharacterCard;