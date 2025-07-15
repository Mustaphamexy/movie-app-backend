// config/db.js
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("🔄 Attempting to connect to MongoDB...");
    console.log("Using URI:", process.env.MONGO_URI.replace(/\/\/.*:.*@/, '//***:***@')); // Hide credentials
    
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 15000, // 15 seconds timeout
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
      family: 4 // Use IPv4, skip trying IPv6
    });
    
    console.log(`✅ MongoDB connected successfully: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
    
    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err);
    });
    
    mongoose.connection.on('disconnected', () => {
      console.log('⚠️ MongoDB disconnected');
    });
    
    mongoose.connection.on('reconnected', () => {
      console.log('✅ MongoDB reconnected');
    });
    
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    
    // Check for common issues
    if (err.message.includes('Server selection timed out')) {
      console.error("💡 Possible issues:");
      console.error("   - Check your network connection");
      console.error("   - Verify IP address is whitelisted in MongoDB Atlas");
      console.error("   - Ensure cluster is not paused");
      console.error("   - Check firewall settings");
    }
    
    if (err.message.includes('Authentication failed')) {
      console.error("💡 Check your username and password in MongoDB Atlas");
    }
    
    process.exit(1);
  }
};

module.exports = connectDB;