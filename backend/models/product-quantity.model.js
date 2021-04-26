const mongoose          = require('mongoose'),
      { Schema, model } = mongoose;

const productQuantitySchema = new Schema({
    product: { type: Schema.Types.ObjectId, ref: 'product' },
    quantity: { type: Number, default: 1 },
}, { timestamps: true })

const ProductQuantity = model('productQuantity', productQuantitySchema);

module.exports = ProductQuantity;