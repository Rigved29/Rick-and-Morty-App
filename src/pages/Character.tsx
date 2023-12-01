import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import Header from "../components/Header";
import styles from './character.module.css';
import { dataContext } from "../contexts/appContext";

type Props = {
    locationDetails: any
}

const DeatilsCard = (props: Props) => {

    // component for location details

    const { locationDetails } = props;


    return (
        <div className={styles.detailsDiv}>
            <h2>{locationDetails.name}</h2>
            <div className={styles.details}>
                <div className={styles.row}>
                    <span style={{ marginTop: '5px' }}>type: <span className={styles.value}>{locationDetails.type}</span></span>
                </div>
                <div className={styles.row}>
                    <span style={{ marginTop: '5px' }}>dimension: <span className={styles.value}>{locationDetails.dimension}</span></span>
                </div>
                <div className={styles.row}>
                    <span style={{ marginTop: '5px' }}>Amount of Residents: <span className={styles.value}>{locationDetails.residents.length}</span></span>
                </div>
            </div>
        </div>
    )
}

//Component for particular character

const Character = () => {
    const [episodeNames, setEpisodesNames] = useState<string[]>([]); //state for saving episodesNames
    const [character, setCharacter] = useState<any>(null); // state for saving character value
    const [locationDetails, setLocationDetails] = useState<any>(null); // state for saving location details
    const [error, setError] = useState<boolean>(false); // for checing error , if it comes
    const params: any = useParams(); // using params to get id of character

    const { id } = params;


    useEffect(() => {
        const getACharacter = async () => {

            try {
                const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);

                const resObj = await response.json();

                let charRslt;

                if (response.ok) {
                    charRslt = resObj;

                    const locationRes = await fetch(charRslt.location.url);
                    const locationObj = await locationRes.json();

                    if (locationRes.ok) {
                        setLocationDetails(locationObj); // setting location details
                    }

                    setCharacter(charRslt); // setting character data

                    if (charRslt?.episode?.length > 0) {

                        let episodeUrl = `https://rickandmortyapi.com/api/episode/`

                        charRslt.episode.forEach((ep: any, i: number) => {

                            const epNumber = ep.split('/').slice(-1)[0];
                            if (i === 0) {
                                episodeUrl += `${epNumber}`;
                            } else {
                                episodeUrl += `,${epNumber}`;
                            }

                        }); // creating multiple episdoes url

                        const episodes = await fetch(episodeUrl);
                        const episodesArr = await episodes.json();

                        // here using multiple episodes url, to get data of multiple episodes in single request only so that we can get episodes name

                        if (episodesArr.length > 0) {
                            const episodeNames = episodesArr.map((ep: any) => ep.name);
                            setEpisodesNames(episodeNames);
                        } else {
                            setEpisodesNames([episodesArr.name]);
                        } //setting episodes names



                    }

                } else if (!response.ok) {
                    throw new Error("Sorry not stable internet connection");
                }
            } catch (err) {
                setError(true);
            }
        };

        getACharacter(); // calling function for fetching a particular character
    }, []);

    if (error) {
        return (
            <main>
                <Header />
                <h2>There is some issue, please Referesh</h2>
            </main>
        )
    }


    return (
        <main>
            <Header />
            {character && <section >
                <p className={styles.charName}>{character.name}</p>
                <div className={styles.characterContainer}>
                    <div className={styles.characterDiv}>
                        <img src={character.image} alt="char_imagr" />
                    </div>
                    <div className={styles.characterInfoDiv}>
                        <div className={styles.row}>
                            <span style={{ marginTop: '5px' }}>Status: <span className={styles.value}>{character.status}</span></span>
                        </div>
                        <div className={styles.row}>
                            <span style={{ marginTop: '5px' }}>species: <span className={styles.value}>{character.species}</span></span>
                        </div>
                        <div className={styles.row}>
                            <span style={{ marginTop: '5px' }}>gender: <span className={styles.value}>{character.gender}</span></span>
                        </div>
                        <div className={styles.row}>
                            <span style={{ marginTop: '5px' }}>Origin: <span className={styles.value}>{character.origin.name}</span></span>
                        </div>
                        <DeatilsCard locationDetails={locationDetails} />
                    </div>
                </div>
                <div className={styles.episodeDiv}>
                    <h2>Episodes in which Character is featured in</h2>
                    <div>
                        {episodeNames.map((ep, i) => <div className={styles.chip} key={i}>{ep}</div>)}
                    </div>

                </div>
            </section>}
        </main>
    )
}

export default Character;