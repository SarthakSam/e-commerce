import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import styles from './ProductDetails.module.css';
import { useAxios } from '../../custom-hooks/useAxios';
import { useNotifications } from '../../contexts/notifications-context';

export function ProductDetails() {
    const { id } = useParams();
    const apiCall = useAxios();
    const { showNotification } = useNotifications();
    const [ product, setProduct ] = useState(null);

    useEffect( () => {
        apiCall('get', (res) => { 
            setProduct(res.data.product);
        }, (err) => {
            showNotification({ type: 'ERROR', message: err });
        }, { mappingKey: 'getProductDetails', urlParams: { id } } );
    }, [id]);

    return (
        <div className="row">
            <div className="col-6">
                

            </div>
            <div className="col-6">
            

            </div>

        </div>
    )
}