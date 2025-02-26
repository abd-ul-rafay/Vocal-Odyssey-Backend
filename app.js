require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const Test = require('./models/Test');

const authRoutes = require('./routes/auth');
const supervisorRoutes = require('./routes/supervisor');
const childRoutes = require('./routes/child');
const levelRoutes = require('./routes/level');
const progressRoutes = require('./routes/progress');
const attemptRoutes = require('./routes/attempt');
const adminRoutes = require('./routes/admin');

const app = express();
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('MongoDB connected successfully');

    // Test data to ensure connection
    const testEntry = new Test({ name: 'MongoDB Test by khizar\'s PC' });
    await testEntry.save();
    console.log('Test data added:', testEntry);
  })
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/supervisor', supervisorRoutes);
app.use('/api/v1/children', childRoutes);
app.use('/api/v1/levels', levelRoutes);
app.use('/api/v1/progress', progressRoutes);
app.use('/api/v1/attempts', attemptRoutes);
app.use('/api/v1/admin', adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
