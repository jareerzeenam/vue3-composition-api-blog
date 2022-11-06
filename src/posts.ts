import { DateTime } from 'luxon';

export interface Post {
  id: string;
  title: string;
  description: string;
  author: string;
  categoryId: string;
  createdAt: string;
  markdown: string;
}

export interface TimelinePost extends Omit<Post, 'createdAt'> {
  createdAt: DateTime;
}

export const today: Post = {
  id: '1',
  title: 'Today',
  description: "Today's post Description",
  author: '54df56sd4f65sdf',
  categoryId: 'dsdfsdf85sd46f',
  createdAt: DateTime.now().toISO(),
};

export const thisWeek: Post = {
  id: '2',
  title: 'This Week',
  description: "This Week's post Description",
  author: '54df56sd4f65sdf',
  categoryId: 'dsdfsdf85sd46f',
  createdAt: DateTime.now().minus({ days: 5 }).toISO(),
  markdown: '',
};

export const thisMonth: Post = {
  id: '3',
  title: 'This Month',
  description: "This Month's post Description",
  author: '54df56sd4f65sdf',
  categoryId: 'dsdfsdf85sd46f',
  createdAt: DateTime.now().minus({ weeks: 3 }).toISO(),
  markdown: '',
};

export const thisYear: Post = {
  id: '4',
  title: 'This Year',
  description: "This Year's post Description",
  author: '54df56sd4f65sdf',
  categoryId: 'dsdfsdf85sd46f',
  createdAt: DateTime.now().minus({ months: 10 }).toISO(),
  markdown: '',
};
