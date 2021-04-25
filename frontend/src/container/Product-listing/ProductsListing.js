
// import { useStore } from '../../../contexts/store.context';
import { Product } from './product/Product';

export function ProductListing() {
    // const { state: { products } } = useStore();

    return (
        <div>
            <ul className = "row">
                {
                    // products.map( product => <Product key = { product.id } product= { product } /> )
                }
            </ul>
        </div>
    );
}