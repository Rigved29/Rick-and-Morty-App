import { useState, useContext } from 'react';
import styles from './searchFilterHeader.module.css';
import FilterTypeInput from './FilterTypeInput';
import { dataContext } from '../contexts/appContext';

type Props = {
    setSearchValue: React.Dispatch<React.SetStateAction<string>>;
    searchValue: string;
}

//component containing filters and character search bar

const SearchFilterHeader = (props: Props) => {
    // const [filterType, setFilterType] = useState('');
    const { setSearchValue, searchValue } = props;

    const { filterType,
        filterValue,
        updateFilterType,
        updateFilterValue } = useContext(dataContext);

    return (
        <div className={styles.searchFilterContainer}>
            <div className={styles.filterDiv}>
                <select value={filterType} onChange={(e) => {
                    updateFilterType(e.target.value)
                    updateFilterValue('');
                }}>
                    <option value=''>Filter</option>
                    <option value='status'>status</option>
                    <option value='location'>location</option>
                    <option value='episode'>episode</option>
                    <option value='gender'>gender</option>
                    <option value='species'>species</option>
                    <option value='type'>type</option>
                </select>
                <FilterTypeInput filterType={filterType} />
                {filterType.length > 0 && <span className={styles.removeFilterSpan} onClick={() => {
                    updateFilterType('')
                    updateFilterValue('');
                }}>X</span>}
            </div>
            <input type="text" name="character" placeholder='Search Character' value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
        </div>
    )

}

export default SearchFilterHeader;