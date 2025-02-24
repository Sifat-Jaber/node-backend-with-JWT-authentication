const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const protectedRoutes = require('./routes/protectedRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/auth', authRoutes); // Authentication routes
app.use('/api', protectedRoutes); // Protected routes

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});















// const express = require('express');
// const mongoose = require('mongoose');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');
// require('dotenv').config();

// const app = express();

// app.use(express.json());

// // MongoDB connection
// let connection =   process.env.MONGO_URI;
// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// // User schema
// const userSchema = new mongoose.Schema({
//   username: String,
//   password: String,
// });

// // Middleware to protect routes
// const authMiddleware = (req, res, next) => {
//   const token = req.header('Authorization').replace('Bearer ', '');
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (e) {
//     res.status(401).send({ error: 'Please authenticate.' });
//   }
// };

// // Register route
// app.post('/register', async (req, res) => {
//   const { username, password } = req.body;
//   const hashedPassword = await bcrypt.hash(password, 8);
//   const user = new User({ username, password: hashedPassword });
//   await user.save();
//   const token = jwt.sign({ _id: user._id. toString() }, process.env.JWT_SECRET);
//   res.send({ user, token });
// });

// // Login route
// app.post('/login', async (req, res) => {
//   const { username, password } = req.body;
//   const user = await User.findOne({ username });
//   if (!user) return res.status(400).send('Username not found!');
  
//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) return res.status(400).send('Invalid password!');

//   const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);
//   res.send({ user, token });
// });

// app.listen(3000, () => console.log('Server running on port 3000'));
