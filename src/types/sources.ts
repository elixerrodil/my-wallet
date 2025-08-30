interface IncomeTypes {
  id: number;
  description: string | null;
}

export interface IncomeSources {
  id: number;
  income: number | null;
  frequency: number | null;
  user_id: number | null;
  created_date: Date | null;
  description: string | null;
  type_id: number | null;
  currency: string | null;
  updated_date: Date | null;
  income_types?: IncomeTypes | null;
}
