const express  = require('express'),
      router   = express.Router(),
      Category = require('../models/category.model');

router.get('/', async (req, res) => {
    try {
        const categories = await Category.find({}).lean();
        res.status(200).json({ message: 'Success', categories });
    } catch(err) {
        console.log(err);
        res.status(500).json({ error: 'Unable to fetch categories right now. Please try again later'});
    }
});

router.post('/', async (req, res) => {
    const title = req.body.title;
    try {
        const category = await Category.create({ title });
        res.status(201).json({ message: 'Success', category });
    } catch(err) {
        console.log(err);
        res.status(500).json({ error: 'Unable to create new category right now. Please try again later'});
    }
});

router.get('/:categoryId', async (req, res) => {
    let category = req.category; 
    try {
       category = await category.populate('products').execPopulate();
       res.status(200).json({ message: 'Success', category });
    } catch(err) {
        console.log(err);
        res.status(500).json({ error: 'Unable to fetch category right now. Please try again later'});
    }
});

router.delete('/:categoryId', async (req, res) => {
    try {
        await category.delete();
        res.status(200).json({ message: 'Success', category });
    } catch(err) {
        console.log(err);
        res.status(500).json({ error: 'Unable to delete category right now. Please try again later'});
    }
} );

router.put('/:categoryId/product/:productId', async (req, res) => {
    const category = req.category;
    const {productId} = req.params;
    const isProductPresentInCategory = category.products.find( id => id.equals(productId) );
    
    if(isProductPresentInCategory) 
        return res.status(200).json({ message: 'Product already present in the category' });

    try {
        category.products.push(productId);
        await category.save();
        res.status(200).json({ message: 'Success', category });
    } catch(err) {
        console.log(err);
        res.status(500).json({ error: 'Unable to add product right now. Please try again later'});
    }
} );

router.delete('/:categoryId/product/:productId', async (req, res) => {
    const category = req.category;
    const {productId} = req.params;
    
    try {
        category.products = category.products.filter( id => !id.equals(productId) );
        await category.save();
        res.status(200).json({ message: 'Success', category });
    } catch(err) {
        console.log(err);
        res.status(500).json({ error: 'Unable to delete product right now. Please try again later'});
    }
} );

router.param('categoryId', async (req, res, next, categoryId) => {
    try {
        const category = await Category.findById(categoryId);
        req.category = category;
        next();
    } catch(err) {
        console.log(err);
        res.status(500).json({ error: 'Unable to fetch category details. Please try again later'});
    }
});

module.exports = router;