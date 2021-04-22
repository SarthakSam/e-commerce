import { FaBars } from 'react-icons/fa';

import styles from './Nav.module.css';

export function Nav() {
    return (
        <nav className = { `nav nav--custom ${ styles.customNav }` }>
            <a href="./index.html" className="nav__title">ECommerce</a>
            <input type="checkbox" id={ styles.navBtn } className="nav__toggler" />
            <label htmlFor= { styles.navBtn } className="nav__toggler--button">
                <FaBars />
            </label>
            <div className={ `nav__content ${ styles.nav__content }` }>
                    <ul className="nav__list">
                        <li className="nav__item">
                            <a href="./components.html" className="nav__link">CATEGORIES</a>
                        </li>
                    </ul>
    
                    <ul className="nav__list">
                        <li className="nav__item">
                            <a href="./docs.html" className="nav__link">CART</a>
                        </li>
                        <li className="nav__item">
                            <a href="./docs.html" className="nav__link">WISHLIST</a>
                        </li>

                    </ul>
                    
                </div>
        </nav>
    );
}