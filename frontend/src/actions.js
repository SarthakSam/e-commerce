export const actions = {
    INITIALIZE_WISHLIST: 'INITIALIZE_WISHLIST',
    INITIALIZE_CART: 'INITIALIZE_CART',
    ADD_TO_WISHLIST: 'ADD_TO_WISHLIST',
    REMOVE_FROM_WISHLIST: 'REMOVE_FROM_WISHLIST',
    ADD_TO_CART: 'ADD_TO_CART',
    REMOVE_FROM_CART: 'REMOVE_FROM_CART'
}

export class InitializeWishlist {
    constructor(payload) {
        this.type = actions.INITIALIZE_WISHLIST;
        this.payload = payload;
    }
}

export class InitializeCart {
    constructor(payload) {
        this.type = actions.INITIALIZE_CART;
        this.payload = payload;
    }
}

export class AddToWishlist {
    constructor(payload) {
        this.type = actions.ADD_TO_WISHLIST;
        this.payload = payload;
    }
}

export class AddToCart {
    constructor(payload) {
        this.type = actions.ADD_TO_CART;
        this.payload = payload;
    }
}

export class RemoveFromWishlist {
    constructor(payload) {
        this.type = actions.REMOVE_FROM_WISHLIST;
        this.payload = payload;
    }
}

export class RemoveFromCart {
    constructor(payload) {
        this.type = actions.REMOVE_FROM_CART;
        this.payload = payload;
    }
}