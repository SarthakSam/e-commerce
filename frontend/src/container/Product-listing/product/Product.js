import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';


import styles from './Product.module.css';
// import { useStore } from '../../../../contexts/store.context';
// import { useEffect, useState } from 'react';
// import { RemoveFromWishlist, AddToWishlist } from '../../../../actions';


export function Product( { product } ) {
    // const navigate = useNavigate();
    // const { state: { wishlist },dispatch } = useStore();
    // const [isWishlisted, setIsWishlisted] = useState(false);
    
    // useEffect( () => {
    //     const isWishisted = !!wishlist.find( item => product.id === item.id);
    //     setIsWishlisted(isWishisted);
    // } , [product, wishlist]);

    
    // const wishlistClicked = (event) => {
    //     event.stopPropagation();
    //     if(isWishlisted) {
    //         dispatch( new RemoveFromWishlist(product));
    //     } else {
    //         dispatch( new AddToWishlist(product));
    //     }
    //     setIsWishlisted(val => !val);
    // }

    // const showProduct = () => {
    //     navigate(`/product/${product.id}`);
    // }

    return (
        // <li className = { styles.card + " card col-3 col-xl-4 col-lg-4 col-md-6 col-sm-12"} onClick = { () => showProduct() }>
        <li className = { styles.card + " card col-3 col-xl-4 col-lg-4 col-md-6 col-sm-12"}>

            <div className = { `card__img badge__container` }>
                <img  className={ styles.img } src={product.images[0]} alt="" />
                <span className={ `badge ${ styles.wishlistIcon }` }>
                        {/* {
                            isWishlisted? 
                            <FaHeart style={{fill: 'inherit'}} /> :
                            <FaRegHeart style={{fill: 'inherit'}} />
                        } */}
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