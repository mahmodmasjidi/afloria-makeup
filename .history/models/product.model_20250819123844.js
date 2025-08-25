import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  desc: { type: String },
  price: { type: Number, required: true },
  img: { type: String }, // ürün resmi dosya adı veya URL
}, { collection: 'products' });

const Product = mongoose.model('Product', productSchema);

export default Product;
