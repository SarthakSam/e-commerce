import { useEffect, useState } from 'react';
import { useStore } from '../../contexts/store.context';
import { CartItem } from './cart-item/CartItem';
import { Wallet } from './wallet/Wallet';

export function Cart() {
    const { state: { cart } } = useStore();
    const [total, setTotal] = useState(0);

    useEffect( () => {
        setTotal( cart.reduce( (acc, cartIten) => acc + cartIten.product.price * cartIten.quantity , 0 ) )
    }, [cart] );

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
        <div className={`col-4 col-md-12`}>
            <Wallet total={ total } discount = { 0 }/>
        </div>
    </div>);
}