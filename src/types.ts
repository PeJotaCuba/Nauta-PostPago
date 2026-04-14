export interface Session {
  id: string;
  date: string;
  duration: number; // in seconds
  cost: number;
}

export interface MonthlyConsolidation {
  month: string;
  totalHours: number;
  totalCost: number;
  date: string;
}
