const mongoose          = require('mongoose'),
      { Schema, model } = mongoose;

const CategorySchema = new Schema({
    title: { type: String, required: "Category name is mandatory", unique: "Category already exists. PLease choose a unique name" },
    products: [{ type: Schema.Types.ObjectId, ref: 'product' }],
})

const Category = model('category', CategorySchema);

module.exports = Category;