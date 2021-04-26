
import { useEffect, useState } from 'react';
import { Product } from './product/Product';
import { useAxios } from '../../custom-hooks/useAxios';
import { useNotifications } from '../../contexts/notifications-context';

export function ProductListing() {

    const [products, setProducts] = useState([]);
    const apiCall = useAxios();
    const { showNotification } = useNotifications();

    useEffect( () => {
        const getProducts = async () => {
            apiCall('get', (res) => {
                setProducts(res.data.products);
            }, (err) => {
                console.log(err);
                showNotification({ type: 'ERROR', message: err })
            }, { mappingKey: 'getProducts' } );
        }
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