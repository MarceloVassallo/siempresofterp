
export interface Article {
  id: string;
  code: string;
  description: string;
  unitMeasure?: string;
  [key: string]: any; // This allows for additional properties if needed
}

// Mock data for articles that was missing
export const mockArticles: Article[] = [
  {
    id: "1",
    code: "ART001",
    description: "Laptop HP 15.6\"",
    unitMeasure: "NIU"
  },
  {
    id: "2",
    code: "ART002",
    description: "Monitor LG 24\"",
    unitMeasure: "NIU"
  },
  {
    id: "3",
    code: "ART003",
    description: "Teclado Logitech K380",
    unitMeasure: "NIU"
  },
  {
    id: "4",
    code: "ART004",
    description: "Mouse Logitech M170",
    unitMeasure: "NIU"
  },
  {
    id: "5",
    code: "ART005",
    description: "Papel A4 (Resma)",
    unitMeasure: "NIU"
  }
];
