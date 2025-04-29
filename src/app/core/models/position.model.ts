export interface Position {
    id: number;
    currency: string;
    amount: number;
    status: 'OPEN' | 'SOLD';
    owner: string;
  }
  