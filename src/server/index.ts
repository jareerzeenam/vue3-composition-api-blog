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
  console.log('REQ ::: ', req.cookies);

  try {
    // Validate JWT token
    const token = req.cookies[COOKIE]; //
    const result = jsonwebtoken.verify(token, SECRET) as { id: string };

    console.log('RESULT ::: ', result);
    res.json({ id: result.id });
  } catch (error) {
    // ...
    res.status(404).end();
  }
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

app.listen(5500, () => {
  console.log('Listening on port 5500');
});
