// Read only const
export const periods = [
  'Today',
  'This Week',
  'This Month',
  'This Year',
] as const;

// TS (as const "Today" | "This Week" | "This Month" | "This Year")
export type Period = typeof periods[number];
