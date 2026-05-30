import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/krishi_connect';

let cached = global.mongo && global.mongo.cached;
if (!cached) {
  cached = { conn: null, promise: null };
  global.mongo = { cached };
}

async function dbConnect() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then(mongoose => mongoose);
  }
  cached.conn = await cached.promise;
  // Define schemas only once
  const userSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, default: '' },
    village: { type: String, default: 'Tumkur' },
    type: { type: String, default: 'farmer' },
    status: { type: String, default: 'pending' },
    registeredAt: { type: Date, default: Date.now }
  });
  const productSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    price: { type: Number, default: 0 },
    stock: { type: Number, default: 100 },
    unit: { type: String, default: 'kg' },
    quality: { type: String, default: 'A+' },
    health: { type: String, default: 'Good' },
    category: { type: String, default: 'Vegetables' },
    status: { type: String, default: 'Unverified' },
    image: { type: String, default: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400' },
    farmerName: { type: String, default: 'Local Farmer' },
    farmerPhone: { type: String, default: 'guest' },
    village: { type: String, default: 'Tumkur' },
    createdAt: { type: Date, default: Date.now }
  });
  const orderSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    productName: { type: String, required: true },
    farmerName: { type: String, required: true },
    companyName: { type: String, default: 'AgriCorp' },
    quantity: { type: Number, default: 100 },
    totalPrice: { type: Number, default: 0 },
    status: { type: String, default: 'Processing' },
    paymentMethod: { type: String, default: 'Cash on Delivery' },
    date: { type: String },
    createdAt: { type: Date, default: Date.now }
  });

  mongoose.model('User', userSchema);
  mongoose.model('Product', productSchema);
  mongoose.model('Order', orderSchema);
  return cached.conn;
}

export default dbConnect;
