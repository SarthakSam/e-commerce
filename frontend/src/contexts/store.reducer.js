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
        case actions.ADD_TO_CART: return { ...state, cart: [ ...state.card, action.payload]};
        case actions.REMOVE_FROM_CART: return { ...state, cart: state.cart.filter(product => product._id !== action.payload._id) };
        default: return state;
    }
    return state;
}