import { Link } from 'react-router-dom';
import { useLocation } from "react-router";
import styles from './header.module.css';

const Header = () => {

    const location: any = useLocation();

    return (
        <header className={styles.head}>
            {location.pathname !== '/characters' && <Link to='/characters'><span>{'Back'}</span></Link>}
            <h1>Rick And Morty App</h1>
        </header>
    )

}

export default Header;