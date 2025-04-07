
export interface Article {
  id: string;
  code: string;
  name?: string;
  description: string;
  alternateCode?: string;
  partNumber?: string;
  crossReference?: string;
  storage?: string;
  status?: string;
  brand?: string;
  barcode?: string;
  supplier?: string;
  hasStock?: boolean;
  price?: number;
  categoryAccount?: string;
  unitMeasure?: string;
  [key: string]: any; // This allows for additional properties if needed
}

// Mock data for articles
export const mockArticles: Article[] = [
  {
    id: "1",
    code: "ART001",
    name: "Laptop HP 15.6\"",
    description: "Laptop HP 15.6\" Core i5 8GB RAM 256GB SSD",
    price: 1200,
    unitMeasure: "NIU",
    hasStock: true
  },
  {
    id: "2",
    code: "ART002",
    name: "Monitor LG 24\"",
    description: "Monitor LG 24\" Full HD IPS",
    price: 250,
    unitMeasure: "NIU",
    hasStock: true
  },
  {
    id: "3",
    code: "ART003",
    name: "Teclado Logitech K380",
    description: "Teclado Logitech K380 Bluetooth",
    price: 45,
    unitMeasure: "NIU",
    hasStock: false
  },
  {
    id: "4",
    code: "ART004",
    name: "Mouse Logitech M170",
    description: "Mouse Logitech M170 Inalámbrico",
    price: 15,
    unitMeasure: "NIU",
    hasStock: true
  },
  {
    id: "5",
    code: "ART005",
    name: "Papel A4 (Resma)",
    description: "Papel A4 500 hojas 75g/m²",
    price: 5,
    unitMeasure: "NIU",
    hasStock: true
  },
  {
    id: "6",
    code: "ART006",
    name: "Disco Duro Externo",
    description: "Disco Duro Externo 1TB USB 3.0",
    price: 65,
    unitMeasure: "NIU",
    hasStock: true
  },
  {
    id: "7",
    code: "ART007",
    name: "Memoria USB 32GB",
    description: "Memoria USB 32GB USB 3.0",
    price: 12,
    unitMeasure: "NIU",
    hasStock: true
  }
];
