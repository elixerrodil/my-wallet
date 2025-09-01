export interface ExpenseDetail {
  id: number;
  description: string;
  amount: number;
  frequency: number;
  user_id: number;
  created_date: Date | null; // ISO date string (e.g. 2025-04-03T15:13:36.620Z)
  currency: string;
  updated_date: Date | null; // ISO date string
  first_due_date: Date | null; // ISO date string
}
