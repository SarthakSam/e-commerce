const mongoose          = require('mongoose'),
      { Schema, model } = mongoose;

const userSchema = new Schema({
    username: { type: string, required: 'Username is mandatory' },
    password: { type: string, required: 'Password is mandatory' },
    email: { type: string },
    wishlist: [ { type: Schema.Types.ObjectId, ref: 'Product' } ],
    cart: [ { type: Schema.Types.ObjectId, ref: 'ProductQuantityMapping' } ]
} , { timestamps: true })

const User = model('user', userSchema);

module.exports = User;