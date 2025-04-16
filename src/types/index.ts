import { Timestamp } from 'firebase/firestore';

export interface Link {
  id: string;
  title: string;
  url: string;
  created_at: Timestamp; // Properly typed as Firestore Timestamp
}