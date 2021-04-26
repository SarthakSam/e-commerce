import { useStore } from "../../contexts/store.context";
import { Product } from '../Product-listing/product/Product';

export function Wishlist() {
    const { state: { wishlist } } = useStore();

    return (
        <ul className={`row`}>
            {
                wishlist.map( product => <Product key = { product._id } product= { product } /> )
            }
        </ul>
    )
}