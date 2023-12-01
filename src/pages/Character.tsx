import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import Header from "../components/Header";
import styles from './character.module.css';
import { dataContext } from "../contexts/appContext";

type Props = {
    locationDetails: any
}

const DeatilsCard = (props: Props) => {

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

const Character = () => {
    const [episodeNames, setEpisodesNames] = useState<string[]>([]);
    const [character, setCharacter] = useState<any>(null);
    const [locationDetails, setLocationDetails] = useState<any>(null);
    const [error, setError] = useState<boolean>(false);
    const params: any = useParams();

    const { id } = params;


    useEffect(() => {
        const getACharacter = async () => {

            try {
                console.log("running...");
                const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);

                console.log(response);

                const resObj = await response.json();

                let rslt;

                console.log(response, resObj);

                if (response.ok) {
                    rslt = resObj;

                    const locationRes = await fetch(rslt.location.url);
                    const locationObj = await locationRes.json();

                    console.log('line41', locationObj);

                    if (locationRes.ok) {
                        setLocationDetails(locationObj);
                    }

                    setCharacter(rslt);

                    if (rslt?.episode?.length > 0) {

                        let episodeUrl = `https://rickandmortyapi.com/api/episode/`

                        rslt.episode.forEach((ep: any, i: number) => {

                            const epNumber = ep.split('/').slice(-1)[0];
                            if (i === 0) {
                                episodeUrl += `${epNumber}`;
                            } else {
                                episodeUrl += `,${epNumber}`;
                            }

                            console.log('line84', episodeUrl)

                        });

                        const episodes = await fetch(episodeUrl);
                        const episodesArr = await episodes.json();

                        if (episodesArr.length > 0) {
                            const episodeNames = episodesArr.map((ep: any) => ep.name);
                            setEpisodesNames(episodeNames);
                        } else {
                            setEpisodesNames([episodesArr.name]);
                        }



                    }

                } else if (!response.ok) {
                    throw new Error("Sorry not stable internet connection");
                }
            } catch (err) {
                console.log(`I think your internet is not working: ${err}`);
                setError(true);
            }
        };

        getACharacter();
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
                        {episodeNames.map((ep) => <div className={styles.chip}>{ep}</div>)}
                    </div>

                </div>
            </section>}
        </main>
    )
}

export default Character;