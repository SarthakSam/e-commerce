const express           = require('express'),
      router            = express.Router(),
      isAuthenticated   = require('../middlewares/isAuthenticated'),
      Product           = require('../models/product.model'),
      ProductQuantity = require('../models/product-quantity.model');

router.get('/', async (req, res) => {
    try {
         const products = await Product.find({}).lean();
         res.status(200).json({ message: 'success', products });
    } catch(err) {
        console.log(er);
         res.status(500).json({ error: err });
    }
});

router.post('/', isAuthenticated, async (req, res) => {
    const body = request.body;
    try {
         const product = await Product.create(body);
         res.status(201).json({ message: 'success', product });
    } catch(err) {
        console.log(er);
         res.status(500).json({ error: err });
    }
});

router.get('/wishlisted', isAuthenticated ,async (req, res) => {
    const user = req.user;
    try {
         const wishlist = (await user.populate('wishlist').execPopulate()).wishlist;
         res.status(200).json({ message: 'success', wishlist });
    } catch(err) {
        console.log(err);
         res.status(500).json({ error: err });
    }
});

router.post('/:id/wishlisted', isAuthenticated ,async (req, res) => {
    const product = req.product;
    const user = req.user;
    try {
         user.wishlist.push(product);
         await user.save();
         res.status(200).json({ message: 'success', product });
    } catch(err) {
        console.log(err);
         res.status(500).json({ error: err });
    }
});

router.delete('/:id/wishlisted', isAuthenticated, async (req, res) => {
    const product = req.product;
    const user = req.user;
    try {
         user.wishlist = user.wishlist.filter(prod => !prod._id.equals(product._id) );
         await user.save();
         res.status(200).json({ message: 'success', product });
    } catch(err) {
        console.log(err);
         res.status(500).json({ error: err });
    }
});

router.get('/cart', isAuthenticated, async (req, res) => {
    const user = req.user;
    try {
         const cart = (await user.populate({ path: 'cart', populate: { path: 'product' } }).execPopulate()).cart;
         res.status(200).json({ message: 'success', cart });
    } catch(err) {
        console.log(err);
         res.status(500).json({ error: err });
    }
});

router.post('/:id/cart', isAuthenticated, async (req, res) => {
    const user = req.user;
    const productToBeAdded = req.product;
    try {
        const cart = (await user.populate('cart').execPopulate()).cart;
        let productInCart = cart.find( ({ product }) => product.equals(productToBeAdded._id) );
        if(productInCart) {
            productInCart.quantity++;
            await productInCart.save();
        } else {
            productInCart = await ProductQuantity.create({ product: productToBeAdded });
            user.cart.push(productInCart);
            await user.save();
        }
        return res.status(201).json({ message: 'Product removed from cart', cart });
    } catch(err) {
        console.log(err);
        return res.status(500).json({ error: err });
    }
})

router.delete('/:id/cart', isAuthenticated, async (req, res) => {
    const user = req.user;
    const productToBeRemoved = req.product;
    try {
        const cart = (await user.populate('cart').execPopulate()).cart;
        const productInCart = cart.find( ({ product }) => product.equals(productToBeRemoved._id) );
        if(productInCart.quantity === 1) {
            user.cart = user.cart.filter( product => !product.equals(productToBeRemoved._id) );
            const promises = [user.save(), productInCart.remove()];
            await Promise.all(promises);
        } else {
            productInCart.quantity--;
            await productInCart.save();
        }
        return res.status(201).json({ message: 'Product added to cart', cart });
    } catch(err) {
        console.log(err);
        return res.status(500).json({ error: err });
    }
})


router.param('id', async (req, res, next, id) => {
    const productId = req.params.id;
    try {
        const product = await Product.findById(productId);
        if(!product) {
            return res.status(500).json({ error: 'Unable to fetch product' });
        }
        req.product = product;
        next();
    } catch(err) {
        console.log(err);
        return res.status(500).json({ error: err });
    }
})


module.exports = router;