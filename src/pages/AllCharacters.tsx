import { useState, useEffect, useContext } from "react";
import CharacterCard from "../components/CharacterCard";
import Header from "../components/Header";
import styles from './allCharacters.module.css';
import SearchFilterHeader from "../components/SearchFilterHeader";
import { dataContext } from "../contexts/appContext";

// Component containing all Characters grid
const AllCharacters = () => {
    const [allCharacters, setAllCharacters] = useState<any[]>([]); // state for saving allCharacters fetched from api
    const [filteredCharacters, setFilteredCharacters] = useState<any[]>([]); // state for showing filtered data as per filters applied or character searched.
    const [isLoading, setIsLoading] = useState<boolean>(false); // state showing loading , when data is being fetch
    const [page, setPage] = useState<number>(1); // state for number of page being fetched from api (using for infinite scrolling)
    const [error, setError] = useState<boolean>(false); // state for assigning error and showing user backup msg if error comes.
    const [searchValue, setSearchValue] = useState<string>(''); // state for character name searched

    const { filterType, filterValue } = useContext(dataContext); // getting values from context

    useEffect(() => {
        const getAllCharacters = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);

                const resObj = await response.json();

                setIsLoading(false);

                let arr: any[];

                if (response.ok) {
                    arr = resObj.results;

                    setAllCharacters((prevState: any) => [...prevState, ...arr]);
                    setFilteredCharacters((prevState: any) => [...prevState, ...arr]);
                    // setting state for allCharacters and filteredCharacters
                } else if (!response.ok) {
                    throw new Error("Sorry not stable internet connection");
                }
            } catch (err) {
                setIsLoading(false);
                setError(true);
            }
        };

        getAllCharacters(); // calling function for fetching characters data
    }, [page]);

    useEffect(() => {

        if (searchValue.length > 0) {
            const tempArr = allCharacters.filter((el: any) => el.name.toLowerCase().includes(searchValue.toLowerCase()));
            setFilteredCharacters(tempArr);
        } else {
            setFilteredCharacters(allCharacters);
        }

        //handling search particular character by name

    }, [searchValue])

    useEffect(() => {

        if (filterType.length > 0 && filterValue.length > 0) {

            switch (filterType) {
                case 'location':
                    const tempLocArr = allCharacters.filter((el: any) => el.location.name.toLowerCase() === filterValue.toLowerCase());
                    setFilteredCharacters(tempLocArr);
                    break;
                case 'episode':
                    const tempEpArr = allCharacters.filter((el: any) => {
                        for (let i = 0; i < el.episode.length; i++) {
                            const cond = el.episode[i].split('/').slice(-1)[0] === String(filterValue);
                            if (cond) {
                                return true;
                            }
                        }
                    });
                    setFilteredCharacters(tempEpArr);
                    break;

                default:
                    const tempArr = allCharacters.filter((el: any) => el[filterType].toLowerCase() === filterValue.toLowerCase());
                    setFilteredCharacters(tempArr);
                    break;
            }

        } else {
            setFilteredCharacters(allCharacters);
        }

        //handling filtering of character grid cards when filters applied such as status, gender, location, episode etc

    }, [filterValue])

    const handleScroll = () => {
        if (
            window.innerHeight + document.documentElement.scrollTop >=
            document.documentElement.offsetHeight
        ) {
            setPage((prevState: number) => prevState + 1);
        }

        //checking when the user touches bottom, we increse the page value by 1 that triggers the fetch request
    };

    useEffect(() => {
        //attached event 
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);

    //handling infinite scrolling


    return (
        <main>
            <Header />
            <SearchFilterHeader setSearchValue={setSearchValue} searchValue={searchValue} />
            {error && <p className={styles.backUptext}>Please, please Refresh</p>}
            {isLoading && !error && <p className={styles.backUptext}>Loading...</p>}
            {!error && !isLoading && filteredCharacters?.length === 0 && <p className={styles.backUptext}>No Characters with applied filters</p>}
            {filteredCharacters?.length > 0 && <section className={styles.cardsSec}>
                {filteredCharacters.map((el: any, i: number) => <CharacterCard cardData={el} key={i} />)}
            </section>}
        </main>
    )
}

export default AllCharacters;