import { FaPlus, FaMinus } from 'react-icons/fa';

import styles from './CartItem.module.css';

export function CartItem({ _id: id, title, images, company, price, quantity }) {
    return (
        <li key = { id } className={`row card card--horizontal`} >
             <div className="card__img col-3 col-xl-4 col-lg-4 col-sm-4 p-0 m-0">
                    <img src={images[0]} alt="" />
            </div>
            <div className="row col-9 col-xl-8 col-lg-8 col-lg-4 col-sm-8 p-0" style={{ alignItems: 'center'}}>

                <div className={`col-6 col-xl-6 col-lg-6 col-sm-12 p-0`}>
                    <p className="card__title">{ title }</p>
                    <p className="card__meta">{ company }</p>
                </div>

                <div className={`col-3 col-xl-4 col-lg-4  col-sm-8 p-0`}>
                        <p className="card__description">Price <strong>Rs { price }</strong> </p>

                        <button className={`btn btn--primary text--white ${styles.quantityBtn}`}>
                            <FaPlus style={{ fill: 'white' }} />
                        </button>
                        <span>{ quantity }</span>
                        <button className={`btn btn--danger ${styles.quantityBtn}`}>
                            <FaMinus style={{ fill: 'white' }} />
                        </button>
                    </div>
                
                <div className={`col-3 col-xl-2 col-lg-2 col-sm-4 p-0 ${ styles.totalContainer }`}>
                    <p className="card__description">Total: <span className="card__title"> { price * quantity } </span></p>
                </div>
                <div className={`row col-12 p-0`} style={{ justifyContent: 'flex-end'}}>
                            <button className="btn btn--danger btn--inverted" style={{ margin: '0 0.3em' }}> 
                                Delete
                            </button>
                            <button className="btn btn--purple btn--inverted" style={{ margin: '0 0.3em' }}> 
                                Move to closet
                            </button>
                        </div>
            </div>
        </li>
    );
}
// style={{ alignItems: 'center', textAlign: 'center' }}