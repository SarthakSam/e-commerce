
import { useEffect, useState } from 'react';
import { Product } from './product/Product';
import { UseAxios } from '../../custom-hooks/useAxios';
import { useNotifications } from '../../contexts/notifications-context';

export function ProductListing() {

    const [products, setProducts] = useState([]);
    const apiCall = UseAxios();
    const { showNotification } = useNotifications();

    const getProducts = async () => {
        apiCall('get', (res) => {
            setProducts(res.data.products);
        }, (err) => {
            console.log(err);
            showNotification({ type: 'ERROR', message: err })
        }, { mappingKey: 'products' } );
    }

    useEffect( () => {
        getProducts();
    }, []);

    return (
        <div>
            <ul className = "row">
                {
                    products.map( product => <Product key = { product._id } product= { product } /> )
                }
            </ul>
        </div>
    );
}