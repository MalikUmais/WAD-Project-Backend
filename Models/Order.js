const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  productId: String,
  productModel: String,
  price: Number,
  quantity: Number,
  subTotal: Number
});

const orderSchema = new mongoose.Schema({
  orderId: Number,

  customerName: String,
  shippingAddress: String,

  items: [orderItemSchema],   

  totalAmount: Number,

  orderStatus: {
    type: String,
    default: 'Pending'
  },

  orderDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Order', orderSchema);
