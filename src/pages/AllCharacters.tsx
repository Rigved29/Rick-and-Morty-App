import { useState, useEffect, useContext } from "react";
import CharacterCard from "../components/CharacterCard";
import Header from "../components/Header";
import styles from './allCharacters.module.css';
import SearchFilterHeader from "../components/SearchFilterHeader";
import { dataContext } from "../contexts/appContext";


const AllCharacters = () => {
    const [allCharacters, setAllCharacters] = useState<any[]>([]);
    const [filteredCharacters, setFilteredCharacters] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [error, setError] = useState<boolean>(false);
    const [searchValue, setSearchValue] = useState<string>('');

    const { filterType,
        filterValue,
        updateFilterType,
        updateFilterValue } = useContext(dataContext);

    useEffect(() => {
        const getAllCharacters = async () => {
            setIsLoading(true);
            try {
                console.log("running...");
                const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);

                console.log(response);

                const resObj = await response.json();

                setIsLoading(false);
                let arr: any[];

                console.log(response, resObj);

                if (response.ok) {
                    arr = resObj.results;

                    setAllCharacters((prevState: any) => [...prevState, ...arr]);
                    setFilteredCharacters((prevState: any) => [...prevState, ...arr]);
                } else if (!response.ok) {
                    throw new Error("Sorry not stable internet connection");
                }
            } catch (err) {
                setIsLoading(false);
                console.log(`I think your internet is not working: ${err}`);
                setError(true);
            }
        };

        getAllCharacters();
    }, [page]);

    useEffect(() => {

        if (searchValue.length > 0) {
            console.log('line50', searchValue, allCharacters)
            const tempArr = allCharacters.filter((el: any) => el.name.toLowerCase().includes(searchValue.toLowerCase()));
            console.log('line52', tempArr)
            setFilteredCharacters(tempArr);
        } else {
            setFilteredCharacters(allCharacters);
        }

    }, [searchValue])

    useEffect(() => {

        if (filterType.length > 0) {

            switch (filterType) {
                case 'location':
                    const tempLocArr = allCharacters.filter((el: any) => el.location.name.toLowerCase() === filterValue.toLowerCase());
                    console.log('line77 location', filterValue, allCharacters, tempLocArr)
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
                    console.log('line87 ep', filterValue, allCharacters, tempEpArr)
                    setFilteredCharacters(tempEpArr);
                    break;

                default:
                    const tempArr = allCharacters.filter((el: any) => el[filterType].toLowerCase() === filterValue.toLowerCase());
                    console.log('line72', filterValue, allCharacters, tempArr)
                    setFilteredCharacters(tempArr);
                    break;
            }

        }


    }, [filterValue])

    const handleScroll = () => {
        console.log('handleScroll running', window.innerHeight + document.documentElement.scrollTop, document.documentElement.offsetHeight);
        if (
            window.innerHeight + document.documentElement.scrollTop >=
            document.documentElement.offsetHeight
        ) {
            setPage((prevState: number) => prevState + 1);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);


    return (
        <main>
            <Header />
            <SearchFilterHeader setSearchValue={setSearchValue} searchValue={searchValue} />
            <section className={styles.cardsSec}>
                {filteredCharacters?.length > 0 && filteredCharacters.map((el: any) => <CharacterCard cardData={el} />)}
            </section>
        </main>
    )
}

export default AllCharacters;