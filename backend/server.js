// const express = require('express');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const path = require('path');
// const cors = require('cors');

// dotenv.config();
// const app = express();
// app.use(cors());
// app.use(express.json());

// const MONGO_URI = process.env.MONGO_URI;
// if (!MONGO_URI) {
//   console.error('MONGO_URI not set in .env');
//   process.exit(1);
// }

// mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(()=> console.log('MongoDB connected'))
//   .catch(err => { console.error('MongoDB connection error', err); process.exit(1); });

// // Models
// require('./models/Course');
// require('./models/Category');
// require('./models/Instructor');
// require('./models/User');
// require('./models/Purchase');

// // Routes
// const courseRoutes = require('./routes/courseRoutes');
// const categoryRoutes = require('./routes/categoryRoutes');
// const instructorRoutes = require('./routes/instructorRoutes');
// const userRoutes = require('./routes/userRoutes');
// const purchaseRoutes = require('./routes/purchaseRoutes');

// app.use('/api/courses', courseRoutes);
// app.use('/api/categories', categoryRoutes);
// app.use('/api/instructors', instructorRoutes);
// app.use('/api/users', userRoutes);
// app.use('/api/purchases', purchaseRoutes);

// // Seed endpoint (for first-time only)
// const seed = require('./seed');
// app.get('/api/seed', async (req, res) => {
//   try {
//     await seed();
//     res.json({ message: 'Seed completed' });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Serve frontend
// app.use(express.static(path.join(__dirname, '..', 'frontend')));
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));











const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Error:', err));

// Models
require('./models/Course');
require('./models/Category');
require('./models/Instructor');
require('./models/User');
require('./models/Purchase');

// Routes
app.use('/api/courses', require('./routes/courseRoutes'));
app.use('/api/categories', require('./routes/categoryRoutes'));
app.use('/api/instructors', require('./routes/instructorRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/purchases', require('./routes/purchaseRoutes'));

// Seed (for demo data)
const seed = require('./seed');
app.get('/api/seed', async (req, res) => {
  try {
    await seed();
    res.json({ message: 'Demo data added!' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Serve frontend
app.use(express.static(path.join(__dirname, '..', 'frontend')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
