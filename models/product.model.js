const mongoose = require("mongoose");
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const productSchema = new mongoose.Schema({
    product_category_id: {
        type: String,
        default: ""
    },
    title: String,
    slug: { 
        type: String, 
        slug: "title",
        unique: true
    },
    description: String,
    price: Number,
    discountPercentage: Number,
    stock: Number,
    thumbnail: String,
    status: String,
    position: Number,
    deleted: {
        type: Boolean,
        default: false
    },
    deletedBy: {
        deletedAt: Date,
        accountId: String,
    },
    createdBy: {
        accountId: String,
        createdAt: Date
    },
    updateBy:[
        {
            accountId: String,
            updateAt: Date
        }
    ],
    featured: String,
}, {
    timestamps: true
});

const Product = mongoose.model("Product", productSchema, "products");

module.exports = Product;