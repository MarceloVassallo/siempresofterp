
export interface Article {
  id: string;
  code: string;
  description: string;
  [key: string]: any; // This allows for additional properties if needed
}
