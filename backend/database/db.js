const mongoose = require('mongoose');
require('dotenv').config();

console.log('MONGO_URI:', process.env.MONGO_URI ? 'Found' : 'Not found');

exports.connectToDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || process.env.MONGODB_URI;

    if (!mongoURI) {
      throw new Error('MongoDB URI not found in environment variables');
    }

    await mongoose.connect(mongoURI);
    console.log('Connected to DB successfully');
  } catch (error) {
    console.error('Database connection error:', error.message);
    process.exit(1);
  }
};
