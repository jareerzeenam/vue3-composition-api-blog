import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import jsonwebtoken from 'jsonwebtoken';
import { today, thisWeek, thisMonth, thisYear, Post } from '../posts';
import { NewUser, User } from './../users';

const app = express();
app.use(cors());
app.use(cookieParser());
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

// Update Post
app.put<{}, {}, Post>('/posts', (req, res) => {
  const index = allPosts.findIndex((x) => x.id === req.body.id);

  if (index === -1) {
    throw Error(`Post with id ${req.body.id} was not found!`);
  }

  const existingPost = allPosts[index];
  allPosts[index] = { ...existingPost, ...req.body };
  res.json(allPosts[index]);
});

// Move this to environment variable (.env)
const SECRET = 'my-secret';
const COOKIE = 'vuejs-jwt';

//! Authentication
function authentication(id: string, req: Request, res: Response) {
  // create a token and sign it
  const token = jsonwebtoken.sign({ id }, SECRET, {
    issuer: 'vuejs-course', // Whoever creates the token
    expiresIn: '30 days', // expires in 30 days
  });

  //set a cookie
  res.cookie(COOKIE, token, { httpOnly: true });
}

app.get('/current-user', (req, res) => {
  try {
    // Validate JWT token
    const token = req.cookies[COOKIE]; //
    const result = jsonwebtoken.verify(token, SECRET) as { id: string };

    res.json({ id: result.id });
  } catch (error) {
    // ...
    res.status(404).end();
  }
});

// Log Out
app.post('/logout', (req, res) => {
  res.cookie(COOKIE, '', { httpOnly: true });
  res.status(200).end();
});

app.post<{}, {}, NewUser>('/users', (req, res) => {
  const user: User = { ...req.body, id: (Math.random() * 100000).toFixed() };
  allUsers.push(user);

  // Auth
  authentication(user.id, req, res);
  // Ignore password and return the rest
  const { password, ...rest } = user;
  res.json(rest);
});

// Login
app.post<{}, {}, NewUser>('/login', (req, res) => {
  const targetUser = allUsers.find((x) => x.username === req.body.username);

  if (!targetUser || targetUser.password !== req.body.password) {
    res.status(401).end();
  } else {
    authentication(targetUser.id, req, res);
    res.status(200).end();
  }
});

app.listen(5500, () => {
  console.log('Listening on port 5500');
});
