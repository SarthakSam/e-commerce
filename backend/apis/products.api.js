const express           = require('express'),
      router            = express.Router(),
      isAuthenticated   = require('../middlewares/isAuthenticated'),
      Product           = require('../models/product.model');

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