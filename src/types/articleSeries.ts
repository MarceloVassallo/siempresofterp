
export interface ArticleSeries {
  id: string;
  warehouseId: string;
  warehouseName?: string;
  articleId: string;
  articleCode?: string;
  articleName?: string;
  series1?: string;
  series2?: string;
  series3?: string;
  status?: string;
  year?: string;
  color?: string;
  policyNumber?: string;
  cua?: string;
  lotNumber?: string;
  expirationDate?: string;
  automaticQuantity?: string;
  piecesQuantity?: string;
  // Vehicle details
  plate?: string;
  category?: string;
  vehicleType?: string;
  version?: string;
  axes?: string;
  seats?: string;
  bodywork?: string;
  power?: string;
  cylinders?: string;
  displacement?: string;
  grossWeight?: string;
  netWeight?: string;
  loadCapacity?: string;
  passengers?: string;
  wheels?: string;
  length?: string;
  width?: string;
  height?: string;
  modelYear?: string;
  transmission?: string;
  brand?: string;
  tireType?: string;
  traction?: string;
  axesDistance?: string;
  doors?: string;
  model?: string;
  fuelType?: string;
}

// Mock data for article series
export const mockArticleSeries: ArticleSeries[] = [
  {
    id: "1",
    warehouseId: "W001",
    warehouseName: "Almacén Principal",
    articleId: "1",
    articleCode: "ART001",
    articleName: "Laptop HP 15.6\"",
    series1: "SER001",
    series2: "LOT001",
    status: "Activo"
  },
  {
    id: "2",
    warehouseId: "W001",
    warehouseName: "Almacén Principal",
    articleId: "2",
    articleCode: "ART002",
    articleName: "Monitor LG 24\"",
    series1: "SER002",
    series2: "LOT002",
    status: "Activo"
  },
  {
    id: "3",
    warehouseId: "W002",
    warehouseName: "Almacén Secundario",
    articleId: "3",
    articleCode: "ART003",
    articleName: "Teclado Logitech K380",
    series1: "SER003",
    series2: "LOT003",
    status: "Inactivo"
  }
];
