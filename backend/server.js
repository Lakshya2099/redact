const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const redactRoutes = require('./routes/redactRoutes');

const app = express();
connectDB();

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/redact', redactRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
