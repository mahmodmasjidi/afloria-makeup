import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: {
    type: String,
    enum: ['Makeup','Cosmetic'], // **sadece bu iki değer**
    required: true
  },
  description: { type: String },
  img: { type: String },      // tek görsel
  imgs: { type: [String] }    // çoklu görseller (dizin adları)
});

export default mongoose.model('Product', productSchema);
