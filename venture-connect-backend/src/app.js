import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import routes from './routes/index.routes.js';

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  }),
);

app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '100kb' }));

app.use('/api/v1', routes);

app.get('/', (req, res) => {
  res.send('Welcome to venture connect...!');
});

export default app;
