const mongoose = require("mongoose");

// const reviewSchema = mongoose.Schema({
//     name: {type : String,required : true },
//     rating: {type :Number, required : true   },
//     comment: {type : String, required : true },
//     user: { type : mongoose.Schema.Types.ObjectId,required : true, ref : "User"  },
// })
const productSchema = mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  countInStock: { type: Number, required: true },
  rating: { type: Number, required: true },
  numReview: { type: Number, required: true },
  // reviews : [reviewSchema]
});

module.exports = mongoose.model("Product", productSchema);
