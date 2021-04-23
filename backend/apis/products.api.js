const express           = require('express'),
      router            = express.Router(),
      isAuthenticated   = require('../middlewares/isAuthenticated'),
      Product           = require('../models/product.model');

router.get('/', async (req, res) => {
    try {
         const products = await Product.find({});
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

module.exports = router;