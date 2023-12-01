import { useContext, useState } from 'react';
import { dataContext } from '../contexts/appContext';
import styles from './searchFilterHeader.module.css';


type Props = {
    filterType: string
}

const FilterTypeInput = (props: Props) => {
    const [inputValue, setInputValue] = useState('');
    const { filterValue, updateFilterValue } = useContext(dataContext);

    const handleEnter = (e: any) => {
        if (e.key === 'Enter') {
            updateFilterValue(inputValue);
        }
    }

    //A dynamic component for rendering filter field as per filterType

    const renderFilterType = (filterType: string) => {

        switch (filterType) {
            case 'status':
                return (
                    <div className={styles.spanDiv}>
                        <span onClick={() => updateFilterValue('Alive')} className={filterValue === 'Alive' ? styles.active : ''}>Alive</span>
                        <span onClick={() => updateFilterValue('Dead')} className={filterValue === 'Dead' ? styles.active : ''}>Dead</span>
                        <span onClick={() => updateFilterValue('Unknown')} className={filterValue === 'Unknown' ? styles.active : ''}>Unknown</span>
                    </div>);
            case 'species':
            case 'type':
            case 'location':
                return (<input type="text" name={filterType} placeholder={`filter by ${filterType}`} value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={handleEnter} />);
            case 'episode':
                return (<input type="number" name={filterType} placeholder={`filter by ${filterType}`} value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={handleEnter} />)
            case 'gender':
                return (<div className={styles.spanDiv}>
                    <span onClick={() => updateFilterValue('Male')} className={filterValue === 'Male' ? styles.active : ''}>Male</span>
                    <span onClick={() => updateFilterValue('Female')} className={filterValue === 'Female' ? styles.active : ''}>Female</span>
                    <span onClick={() => updateFilterValue('Genderless')} className={filterValue === 'Genderless' ? styles.active : ''}>Genderless</span>
                    <span onClick={() => updateFilterValue('unknown')} className={filterValue === 'unknown' ? styles.active : ''}>unknown</span>
                </div>)
            default:
                return <></>;
        }

    }

    return (
        <>
            {renderFilterType(props.filterType)}
        </>
    )


}

export default FilterTypeInput;