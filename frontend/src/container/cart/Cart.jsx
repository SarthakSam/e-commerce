import { useStore } from '../../contexts/store.context';
import { CartItem } from './cart-item/CartItem';

export function Cart() {
    const { state: { cart } } = useStore();
    return (<div className={`row`}>
        <div className="col-8 col-md-12">
            <h1>Cart</h1>
            <ul style={{ listStyle: 'none' }}>
                {
                    cart.map( cartItem => <li key={cartItem._id }>
                            <CartItem { ...cartItem.product } quantity = { cartItem.quantity } />
                        </li> )
                }
            </ul>
        </div>
        <div className="col-4 col-md-12">
            Wallet aega idhar
        </div>
    </div>);
}