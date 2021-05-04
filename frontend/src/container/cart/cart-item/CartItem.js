import { FaPlus, FaMinus } from 'react-icons/fa';

import { useAxios } from '../../../custom-hooks/useAxios';
import { useAuth } from '../../../contexts/auth-context';
import { useNotifications } from '../../../contexts/notifications-context';
import { useStore } from '../../../contexts/store.context';

import styles from './CartItem.module.css';
import { AddToCart, RemoveFromCart } from '../../../actions';

export function CartItem({ _id: id, title, images, company, price, quantity }) {
    const apiCall = useAxios();
    const { user } = useAuth();
    const { showNotification } = useNotifications();
    const { dispatch } = useStore();

    const incQuantity = () => {
        const onSuccess = res => {
            dispatch(new AddToCart( res.data.product ));
            showNotification({ type: 'SUCCESS', message: 'Item added to cart' });
        };
        const onFailure = err => {
            showNotification({ type: 'ERROR', message: 'Unable to increase quantity. Please try after some time' });
        };
        updateCart('post', onSuccess, onFailure, { operation: 'add' });
    }

    const decQuantity = () => {
        const onSuccess = res => {
            dispatch(new RemoveFromCart( res.data.product ));
            showNotification({ type: 'WARNING', message: 'Item removed from cart' });
        };
        const onFailure = err => {
            showNotification({ type: 'ERROR', message: 'Unable to decrease quantity. Please try after some time' });
        };
        updateCart('post', onSuccess, onFailure, { operation: 'subtract' });
    }

    const removeFromCart = () => {
        // const onSuccess = res => {
        //     dispatch(new RemoveFromCart( res.data.product ));
        //     showNotification({ type: 'WARNING', message: 'Item removed from cart' });
        // };
        // const onFailure = err => {
        //     showNotification({ type: 'ERROR', message: 'Unable to remove product from cart. Please try after some time' });
        // };
        const config = {
            headers: { authToken: user._id }
        };
        apiCall('delete', res => {
            dispatch(new RemoveFromCart( { ...res.data.product, deleteAllQuantity: true } ));
            showNotification({ type: 'WARNING', message: 'Item removed from cart' });
        }, err => {
            showNotification({ type: 'ERROR', message: 'Unable to decrease quantity. Please try after some time' });
        }, { mappingKey: 'removeFromCart', urlParams: {id} }, config);
    }

    const updateCart = (method, onSuccess, onFailure, body) => {
        const config = {
            headers: { authToken: user._id }
        };
        apiCall(method, onSuccess, onFailure, { mappingKey: 'removeFromCart', urlParams: {id} }, body, config);
    }

    return (
        <div className={`row card card--horizontal ${ styles.cartItem }`} >
             <div className="card__img col-3 col-xl-4 col-lg-4 col-sm-6 col-xs-12 p-0 m-0">
                    <img src={images[0]} alt="" />
            </div>
            <div className="row col-9 col-xl-8 col-lg-8 col-lg-4 col-sm-6 col-xs-12 p-0" style={{ alignItems: 'center'}}>

                <div className={`col-6 col-xl-6 col-lg-6 col-sm-12 p-0`}>
                    <p className="card__title">{ title }</p>
                    <p className="card__meta">{ company }</p>
                </div>

                <div className={`col-3 col-xl-4 col-lg-4  col-sm-8 p-0`}>
                        <p className="card__description">Price <strong>Rs { price }</strong> </p>

                        <button className={`btn btn--primary text--white ${styles.quantityBtn}`} onClick = { incQuantity }>
                            <FaPlus style={{ fill: 'white' }} />
                        </button>
                        <span>{ quantity }</span>
                        <button className={`btn btn--danger ${styles.quantityBtn}`} onClick = { decQuantity }>
                            <FaMinus style={{ fill: 'white' }} />
                        </button>
                    </div>
                
                <div className={`col-3 col-xl-2 col-lg-2 col-sm-4 p-0 ${ styles.totalContainer }`}>
                    <p className="card__description">Total: <span className="card__title"> { price * quantity } </span></p>
                </div>
                <div className={`row col-12 p-0`} style={{ justifyContent: 'flex-end'}}>
                            <button className="btn btn--danger btn--inverted" style={{ margin: '0 0.3em' }} onClick = { removeFromCart }> 
                                Delete
                            </button>
                            <button className="btn btn--purple btn--inverted" style={{ margin: '0 0.3em' }}> 
                                Move to wishlist
                            </button>
                        </div>
            </div>
        </div>
    );
}