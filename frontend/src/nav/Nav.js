import { FaBars } from 'react-icons/fa';
import { NavLink, useNavigate } from 'react-router-dom';

import styles from './Nav.module.css';
import { useAuth } from '../contexts/auth-context';

export function Nav() {
    const { user, setUser } = useAuth();
    const navigate = useNavigate();

    const logout = () => {
        setUser(null);
        navigate('/');
    }

    return (
        <nav className = { `nav nav--custom ${ styles.customNav }` }>
            <label className="nav__title">
                <NavLink to="/">Ecommerce</NavLink>
            </label>
            <input type="checkbox" id={ styles.navBtn } className="nav__toggler" />
            <label htmlFor= { styles.navBtn } className="nav__toggler--button">
                <FaBars />
            </label>
            <div className={ `nav__content ${ styles.nav__content }` }>
                    <ul className="nav__list">
                        <li className="nav__item">
                            {/* <NavLink to="/categories" activeClassName={styles.active}>Categories</NavLink> */}
                        </li>
                    </ul>
    
                {
                    user ?                    
                    <ul className="nav__list">
                        <li className="nav__item">
                            <NavLink to="/cart" activeClassName={styles.active}>Cart</NavLink>
                        </li>
                        <li className="nav__item">
                            <NavLink to="/wishlist" activeClassName={styles.active}>Wishlist</NavLink>
                        </li>
                        <li className="nav__item" onClick = { logout }>
                            Logout
                        </li>
                    </ul>
                    : 
                    <ul className="nav__list">
                        <li className="nav__item">
                            <NavLink to="/signin" activeClassName={styles.active}>Signin</NavLink>
                        </li>
                        <li className="nav__item">
                            <NavLink to="/signup" activeClassName={styles.active}>Signup</NavLink>
                        </li>
                    </ul>

                }                    
                </div>
        </nav>
    );
}