import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import styles from './ProductDetails.module.css';
import { useAxios } from '../../custom-hooks/useAxios';
import { useNotifications } from '../../contexts/notifications-context';
import { useStore } from '../../contexts/store.context';
import { AddToCart } from '../../actions';
import { useAuth } from '../../contexts/auth-context';


export function ProductDetails() {
    const { id } = useParams();
    const apiCall = useAxios();
    const { showNotification } = useNotifications();
    const [ product, setProduct ] = useState(null);
    const { dispatch } = useStore();
    const { user } = useAuth();

    useEffect( () => {
        apiCall('get', (res) => { 
            setProduct(res.data.product);
        }, (err) => {
            showNotification({ type: 'ERROR', message: err });
        }, { mappingKey: 'getProductDetails', urlParams: { id } } );
    }, [id]);

    const addToCart = (event) => {
        event.stopPropagation();
        if(!user) {
            showNotification({ type: 'ERROR', message: 'Please signin to continue' });
            return;
        }
        const config = {
            headers: { authToken: user._id}
        }
        apiCall('post', res => {
            dispatch( new AddToCart(res.data.product));
            showNotification({ type: 'SUCCESS', message: 'Product added to cart' });
        }, err => {
            showNotification({ type: 'ERROR', message: 'Unable to process your request at present. Please try again later' })
        }, { mappingKey: 'addToCart', urlParams: { id: product._id } }, { operation: 'add' }, config);
    }

    return (
        <>
            { product && 
                <div className={`row ${styles.container}`}>
                    <div class="row col-6 col-lg-5 col-md-6 col-sm-12" >
                        <img src={product.images[0]} class="image" alt="" />
                    </div>
                    <div className="col-6">
                        <h1 className="h1">{ product.title }</h1>
                        <p className="text--lead"> { product.company } </p>
                        <p>Rs <strong className="h2">{ product.price }</strong></p>
                        <p className="text--muted">{  product.description }</p>
                        <br />
                        <button className="btn btn--purple" onClick={ addToCart } >Add to Cart</button>
                    </div>
                </div>

            }
        </>
    )
}

// https://dribbble.com/shots/15596100-Arkent-Landing-Page-Header/attachments/7383254?mode=media
// https://dribbble.com/shots/14524477-Ecommerce-Shopify-Product-Page-Design