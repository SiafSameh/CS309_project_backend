const mongoose = require('mongoose');
const Schema = mongoose.Schema;

ProductSchema = new Schema
(   {
        name: { type: String, required: [true, "Product name must be included"] },
        price: { type: Number, required: true, min: 1 },
        category: { type: String,  lowercase: true },
        description: {type: String, },
    }
);
  const ProductModel = mongoose.model('Product', ProductSchema);
  module.exports = mongoose.model('product', ProductSchema);