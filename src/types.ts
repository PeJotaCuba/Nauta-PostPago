export interface Session {
  id: string;
  date: string;
  duration: string;
  cost: string;
  status: 'complete' | 'active';
}

export type NetworkStatus = 'validated' | 'required' | 'disconnected';
