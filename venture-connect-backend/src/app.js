import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '100kb' }));

app.get('/', (req, res) => {
  res.send('Welcome to venture connect...!');
});

export default app;
