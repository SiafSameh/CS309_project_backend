const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ReviewSchema = new Schema(
{
    rating: { type: String, min: 1, max: 5,required: [true, "Please provide rating"], },
    product: { type: mongoose.Types.ObjectId, ref: "Product", required: true,},
    comment: { type: String, required: false },
},
{ timestamps: true }
  )
  const reviewModel = mongoose.model('reviews', ProductSchema);
  module.exports = mongoose.model("Review", ReviewSchema)