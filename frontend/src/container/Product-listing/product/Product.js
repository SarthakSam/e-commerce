import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';


import styles from './Product.module.css';
import { useStore } from '../../../contexts/store.context';
import { useAuth } from '../../../contexts/auth-context';
import { useAxios } from '../../../custom-hooks/useAxios';
import { RemoveFromWishlist, AddToWishlist } from '../../../actions';
import { useNotifications } from '../../../contexts/notifications-context';

export function Product( { product } ) {
    // const navigate = useNavigate();
    const { state: { wishlist },dispatch } = useStore();
    const [isWishlisted, setIsWishlisted] = useState(false);
    const apiCall = useAxios();
    const { user } = useAuth();
    const { showNotification } = useNotifications();

    
    useEffect( () => {
        const isWishisted = !!wishlist.find( item => product._id === item._id);
        setIsWishlisted(isWishisted);
    } , [product]);

    const addToWishlist = () => {
        const config = {
            headers: { authToken: user._id}
        }
        apiCall('post', res => {
            dispatch( new AddToWishlist(res.data.product));
            setIsWishlisted(true);
            showNotification({ type: 'SUCCESS', message: 'Product added to wishlist' });
        }, err => {
            showNotification({ type: 'ERROR', message: err })
        }, { mappingKey: 'addToWishlist', urlParams: { id: product._id } }, null, config);
    }

    const removeFromWishlist = () => {
        const config = {
            headers: { authToken: user._id}
        }
        apiCall('delete', res => {
            dispatch( new RemoveFromWishlist(res.data.product));
            setIsWishlisted(false);
            showNotification({ type: 'WARNING', message: 'Product removed from wishlist' });
        }, err => {
            showNotification({ type: 'ERROR', message: err })
        }, { mappingKey: 'removeFromWishlist', urlParams: { id: product._id } }, config);
    }

    const wishlistClicked = (event) => {
        event.stopPropagation();
            if(isWishlisted)
            removeFromWishlist();
            else
                addToWishlist();
    }

    // const showProduct = () => {
    //     navigate(`/product/${product.id}`);
    // }

    return (
        // <li className = { styles.card + " card col-3 col-xl-4 col-lg-4 col-md-6 col-sm-12"} onClick = { () => showProduct() }>
        <li className = { styles.card + " card col-3 col-xl-4 col-lg-4 col-md-6 col-sm-12"}>

            <div className = { `card__img badge__container` }>
                <img  className={ styles.img } src={product.images[0]} alt="" />
                <span className={ `badge ${ styles.wishlistIcon }` } onClick = { wishlistClicked }>
                        {
                            isWishlisted? 
                            <FaHeart style={{fill: 'inherit'}} /> :
                            <FaRegHeart style={{fill: 'inherit'}} />
                        }
                </span>
            </div>

            <div className="card__body">
                
                <p className="card__lead">{product.title}</p>
                <p className="card__meta">{ product.company }</p>
                <span className={ `pill bg-blue text-white ${styles.rating}` }>4.5 *</span>
               
                <p className={ styles.price }>Rs {product.price}</p>

            </div>
        </li>
    )
}