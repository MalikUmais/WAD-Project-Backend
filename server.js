const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./db');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3000;

const Order = require('./Models/Order');
const Review = require('./Models/Review');
const Product = require('./Models/Product');
connectDB();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: 'https://wad-project-frontend.vercel.app' }));
//order endpoints
app.get('/order', async (req, res) => {
    const orders = await Order.find();
    res.json(orders);
});
app.post('/order', async (req, res) => {
    try {
        const order = await Order.create({
            orderId: req.body.orderId,
            customerName: req.body.customerName,
            shippingAddress: req.body.shippingAddress,
            items: req.body.items,
            totalAmount: req.body.totalAmount
        })
        res.status(201).json(order);
    } catch (err) {
        console.error("Fail to post order:", err);
        res.status(500).json({
            message: "Order creation failed",
            error: err.message
        });
    };
});

//reviews endpoints
app.get('/reviews', async (req, res) => {
    const reviews = await Review.find();
    res.json(reviews);
})
app.post('/reviews', async (req, res) => {
    try {
        const lastReview = await Review.findOne().sort({ reviewId: -1 });
        const nextId = lastReview ? Number(lastReview.reviewId) + 1 : 1;
        const review = await Review.create({
            reviewId: nextId.toString(),
            reviewerName: req.body.reviewerName,
            reviewsRating: req.body.reviewsRating,
            reviewerGender: req.body.reviewerGender,
            reviewContent: req.body.reviewContent
        });
        res.status(201).json(review);
    } catch (err) {
        console.err("Fail to post review: ", err);
    }
});
//products endpoints
app.get('/products', async (req, res) => {
    const products = await Product.find();
    res.json(products);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
module.exports = app;
