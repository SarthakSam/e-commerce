import { Route, Routes } from 'react-router-dom';

import styles from './Container.module.css';
import { ProductListing } from './Product-listing/ProductsListing';
import { Signup } from './signup/Signup';
import { Signin } from './signin/Signin';
import { NotificationContainer } from '../common-components/notification/Notification-container';
import { Loader } from '../common-components/loader/Loader';
import { useLoader } from '../contexts/loader-context';
import { useNotifications } from '../contexts/notifications-context';

export function Container() {
    const { loading } = useLoader();
    const { notifications } = useNotifications();
    return (
        <div className={`${ styles.container }`}>
            <Routes>
                <Route path="/" element={<ProductListing />} />
                <Route path="/products" element={<ProductListing />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/signin" element={<Signin />} />


                {/* <Route path="about" element={<About />} /> */}
            </Routes>
            
            <Loader loading = { loading } />
            <NotificationContainer notifications = { notifications } />
        </div>
    )
}