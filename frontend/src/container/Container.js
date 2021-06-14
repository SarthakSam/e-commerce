import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';

import styles from './Container.module.css';
import { ProductListing } from './Product-listing/ProductsListing';
import { Signup } from './signup/Signup';
import { Signin } from './signin/Signin';
import { NotificationContainer } from '../common-components/notification/Notification-container';
import { Loader } from '../common-components/loader/Loader';
import { useLoader } from '../contexts/loader-context';
import { useNotifications } from '../contexts/notifications-context';
import { Wishlist } from './wishlist/Wishlist';
import { useAxios } from '../custom-hooks/useAxios';
import { useAuth } from '../contexts/auth-context';
import { useStore } from '../contexts/store.context';
import { InitializeCart, InitializeWishlist } from '../actions';
import { Cart } from './cart/Cart';
import { ProductDetails } from './product-details/ProductDetails';

export function Container() {
    const { loading } = useLoader();
    const { notifications, showNotification } = useNotifications();
    const apiCall = useAxios();
    const { user } = useAuth();
    const { dispatch } = useStore();

    useEffect(() => {
        if(user) {
            const getWishlist = async () => {
                const config = {
                    headers: { authToken: user._id }
                }
                apiCall('get', (res) => {
                    dispatch( new InitializeWishlist(res.data.wishlist) );
                }, (err) => {
                    console.log(err);
                    showNotification({ type: 'ERROR', message: err })
                }, { mappingKey: 'getWishlist' }, config);
            }
            getWishlist();
        }
    }, []);

    useEffect(() => {
        if(user) {
            const getCart = async () => {
                const config = {
                    headers: { authToken: user._id }
                }
                apiCall('get', (res) => {
                    dispatch( new InitializeCart(res.data.cart) );
                }, (err) => {
                    console.log(err);
                    showNotification({ type: 'ERROR', message: err })
                }, { mappingKey: 'getCartItems' }, config);
            }
            getCart();
        }
    }, []);

    return (
        <div className={`${ styles.container }`}>
            <Routes>
                <Route path="/" element={<ProductListing />} />
                <Route path="/products" element={<ProductListing />} />
                <Route path="/products/:id" element={<ProductDetails />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/signin" element={<Signin />} />
                <Route path='/wishlist' element={<Wishlist />} />
                <Route path='/cart' element={<Cart />} />
            </Routes>
            
            <Loader loading = { loading } />
            <NotificationContainer notifications = { notifications } />
        </div>
    )
}