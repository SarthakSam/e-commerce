const mongoose          = require('mongoose'),
      { Schema, model } = mongoose;

const productSchema = new Schema({
    title: { type: String, required: 'Title is mandatory' },
    description: { type: String },
    price: { type: Number, required: 'Price is mandatory' },
    seller: { type: Schema.Types.ObjectId, ref: 'User' },
    images: [ { type: String } ],
    company: { type: String, require: 'Company name is mandatory' },
}, { timestamps: true })

const Product = model('product', productSchema);
module.exports = Product;