import { actions } from '../actions';

export const initialState = {
    wishlist: [],
    cart: []
}

export const reducer = (state, action) => {
    switch(action.type) {
        case actions.INITIALIZE_WISHLIST: return { ...state, wishlist: action.payload};
        case actions.INITIALIZE_CART: return { ...state, cart: action.payload};
        case actions.ADD_TO_WISHLIST: return { ...state, wishlist: [ ...state.wishlist, action.payload]};
        case actions.REMOVE_FROM_WISHLIST: return { ...state, wishlist: state.wishlist.filter(product => product._id !== action.payload._id ) };
        case actions.ADD_TO_CART: return addToCart(state, action);
        case actions.REMOVE_FROM_CART: return removeFromCart(state, action);
        default: return state;
    }
}

function addToCart(state, action) {
    const productToBeAdded = state.cart.find(item => item._id === action.payload._id);
    if(productToBeAdded) {
        const updatedCart = state.cart.map(item => {
            if(item._id === action.payload._id) {
                item.quantity++;
            }
            return item;
        }); 
        return { ...state, cart: updatedCart };
    }
    else {
        return { ...state, cart: [ ...state.cart, action.payload ] };
    }
}

function removeFromCart(state, action) {
    const productToBeRemoved = state.cart.find(item => item._id === action.payload._id);
    if(productToBeRemoved.quantity === 1 || action.payload.deleteAllQuantity ) {
        return { ...state, cart: state.cart.filter(item => item._id !== action.payload._id) };
    }
    else {
        const updatedCart = state.cart.map(item => {
            if(item._id === action.payload._id) {
                item.quantity--;
            }
            return item;
        }); 
        return { ...state, cart: updatedCart };
    }
}