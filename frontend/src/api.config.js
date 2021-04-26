const endpoints = {
    'signup': `/signup`,
    'signin': `/signin`,
    'getProducts': `/products`,
    'getWishlist': `/products/wishlisted`,
    'addToWishlist': `/products/:id/wishlisted`,
    'removeFromWishlist': `/products/:id/wishlisted`,
    'getCartItems': `/products/cart`,
}

export const getUrl = ({ mappingKey, urlParams = {} }) => {
    return Object.keys(urlParams).reduce( (acc, cur) => { 
        acc = acc.replace(`:${cur}`, urlParams[cur]);
        return acc;
     }, endpoints[mappingKey] );
}