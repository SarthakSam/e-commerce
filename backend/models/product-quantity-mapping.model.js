const mongoose          = require('mongoose'),
      { Schema, model } = mongoose;

const productQuantityMappingSchema = new Schema({
    product: { type: Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, default: 1 },
}, { timestamps: true })

const ProductQuantityMapping = model('user', productQuantityMappingSchema);

module.exports = ProductQuantityMapping;