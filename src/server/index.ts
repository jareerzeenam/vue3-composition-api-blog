import express from 'express';
import cors from 'cors';
import { today, thisWeek, thisMonth, thisYear } from '../posts';

const app = express();
app.use(cors());

app.get('/posts', (req, res) => {
  res.json([today, thisWeek, thisMonth, thisYear]);
});

app.listen(5500, () => {
  console.log('Listening on port 5500');
});
