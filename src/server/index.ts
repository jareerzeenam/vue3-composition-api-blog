import { NewUser, User } from './../users';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { today, thisWeek, thisMonth, thisYear, Post } from '../posts';

const app = express();
app.use(cors());
app.use(bodyParser.json());

const allPosts = [today, thisWeek, thisMonth, thisYear];
const allUsers: User[] = [];

app.get('/posts', (req, res) => {
  res.json(allPosts);
});

app.post<{}, {}, Post>('/posts', (req, res) => {
  const post = { ...req.body, id: (Math.random() * 100000).toFixed() };
  allPosts.push(post);
  res.json(post);
});

app.post<{}, {}, NewUser>('/users', (req, res) => {
  const user: User = { ...req.body, id: (Math.random() * 100000).toFixed() };
  allUsers.push(user);
  // Ignore password and return the rest
  const { password, ...rest } = user;
  res.json(rest);
});

app.listen(5500, () => {
  console.log('Listening on port 5500');
});
