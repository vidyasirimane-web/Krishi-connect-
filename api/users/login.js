import dbConnect from '../../_db.js';
import mongoose from 'mongoose';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
  await dbConnect();
  const User = mongoose.model('User');
  const { phone, type } = req.body;
  if (!phone) {
    return res.status(400).json({ error: 'Phone is required' });
  }
  try {
    const user = await User.findOne({ phone, type });
    if (!user) {
      return res.status(404).json({ error: 'Account not found. Please register.' });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: 'Login failed', details: err.message });
  }
}
