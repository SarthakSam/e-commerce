const mongoose          = require('mongoose'),
      { Schema, model } = mongoose;

const userSchema = new Schema({
    username: { type: String, required: 'Username is mandatory', unique: 'This username already exists. Please choose a unique username' },
    password: { type: String, required: 'Password is mandatory' },
    email: { type: String },
    wishlist: [ { type: Schema.Types.ObjectId, ref: 'Product' } ],
    cart: [ { type: Schema.Types.ObjectId, ref: 'ProductQuantityMapping' } ]
} , { timestamps: true })

const User = model('user', userSchema);

module.exports = User;