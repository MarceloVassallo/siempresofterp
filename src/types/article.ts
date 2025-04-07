
export interface Article {
  id: string;
  code: string;
  description: string;
  alternateCode?: string;
  partNumber?: string;
  crossReference?: string;
  storage?: string;
  status?: string;
  brand?: string;
  barcode?: string;
  supplier?: string;
  categoryAccount?: string;
  hasStock?: boolean;
  unitMeasure?: string;
}

export const mockArticles: Article[] = [
  {
    id: "1",
    code: "ART001",
    description: "TORNILLO HEXAGONAL 3/8 X 1",
    alternateCode: "T-HEX-38-1",
    partNumber: "TH381",
    storage: "Almacén Principal",
    status: "Activo",
    brand: "FIXALL",
    supplier: "Ferretería Industrial S.A.",
    categoryAccount: "mercaderia",
    hasStock: true,
    unitMeasure: "NIU"
  },
  {
    id: "2",
    code: "ART002",
    description: "TUERCA HEXAGONAL 3/8",
    alternateCode: "T-NUT-38",
    partNumber: "TN38",
    storage: "Almacén Principal",
    status: "Activo",
    brand: "FIXALL",
    supplier: "Ferretería Industrial S.A.",
    categoryAccount: "mercaderia",
    hasStock: true,
    unitMeasure: "NIU"
  },
  {
    id: "3",
    code: "ART003",
    description: "ARANDELA PLANA 3/8",
    alternateCode: "A-PL-38",
    partNumber: "AP38",
    storage: "Almacén Secundario",
    status: "Activo",
    brand: "FIXALL",
    supplier: "Ferretería Industrial S.A.",
    categoryAccount: "mercaderia",
    hasStock: false,
    unitMeasure: "NIU"
  },
  {
    id: "4",
    code: "ART004",
    description: "PERNO EXPANSIÓN 1/2 X 4",
    alternateCode: "P-EXP-12-4",
    partNumber: "PE124",
    storage: "Almacén Principal",
    status: "Activo",
    brand: "ANCLAFLEX",
    supplier: "Importadora Técnica S.A.",
    categoryAccount: "suministros",
    hasStock: true,
    unitMeasure: "NIU"
  },
  {
    id: "5",
    code: "ART005",
    description: "CINTA TEFLON 1/2",
    alternateCode: "C-TEF-12",
    partNumber: "CT12",
    storage: "Almacén Secundario",
    status: "Inactivo",
    brand: "SELLOTAPE",
    supplier: "Distribuidora Nacional S.A.",
    categoryAccount: "mercaderia",
    hasStock: false,
    unitMeasure: "NIU"
  }
];
