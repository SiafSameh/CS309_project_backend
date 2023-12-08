const mongoose = require('mongoose');
const Schema = mongoose.Schema;

CartSchema = new Schema
(   {
        userId: { type: String, required: true, },
       products: [
            {
                productId:{type: String },
                quantity:{type: Number, default:1}
            }
       ],
    },
    {
        timestamps: true
    }
);
  const cartModel = mongoose.model('Cart', CartSchema);
  module.exports = mongoose.model('Cart', CartSchema);
