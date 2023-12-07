const mongoose = require('mongoose');
const Schema = mongoose.Schema;

ProductSchema = new Schema
(   {
        name: { type: String, required: [true, "Product name must be included"] },
        price: { type: Number, required: [true, "Please provide price value"] },
        category: { type: String,  lowercase: true , },
        description: {type: String, required: false },
        image: { type: String},
        numOfReviews: {    type: Number, default: 0,  },

    }
);
  const ProductModel = mongoose.model('Product', ProductSchema);
  module.exports = mongoose.model('product', ProductSchema);