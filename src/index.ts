import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database';

import veterinarianRoutes from './routes/veterinarian.routes';
import authRoutes from './routes/auth.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const BASE_URL = process.env.BASE_URL || `http://localhost`;

connectDB();

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/veterinarians', veterinarianRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on ${BASE_URL}:${PORT}`);
});