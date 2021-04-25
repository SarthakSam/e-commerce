import { useState } from 'react';
import styles from './menu.module.css';

export function Menu({icon, options, id}) {

    const [visible, setVisible] = useState(false);

    const onFocus = function() {
        setVisible( true );
    }

    const onBlur = function() {
        setTimeout( () => {
            setVisible(false);
        }, 200)
    }

    const stopEventPropogation = (event) => {
        event.stopPropagation();
    }

    const optionClicked = (event, option) => {
        stopEventPropogation(event);
        option.action();
    }

    return (
        <div className ={ styles.dropdown + " dropdown" } tabIndex="0">
            <button className={ styles.dropdown__toggle + " dropdown__toggle" }  onFocus={ onFocus } onBlur={ onBlur } onClick={stopEventPropogation}>
            { icon }
            </button>
            {
                visible &&
                <ul className={ styles.dropdown__menu + " dropdown__menu" }>
                {
                    options.map( (option, index) => 
                        <li key = { index } className = { styles.dropdown__item + " dropdown__item" }
                        onClick = { (e) => { optionClicked(e, option) } }>
                             { option.title }
                        </li>)
                }
            </ul>
    
            }
    </div>
    )
}