
import { MenuItem } from "@/types/menu";
import {
  Archive,
  BoxIcon,
  Building2,
  FileBarChart2,
  Package,
  Tags,
  Truck,
} from "lucide-react";

export const menuStructure: MenuItem[] = [
  {
    title: "Almacén",
    icon: Package,
    submenu: [
      {
        title: "Información maestra",
        submenu: [
          { title: "Artículos", path: "/articles", icon: Archive },
          { title: "Almacenes", path: "/warehouses", icon: Package },
          { title: "Series de Artículos", path: "/article-series", icon: Tags },
        ],
      },
      {
        title: "Ingresos",
        submenu: [
          { title: "Ingresos por ajuste", path: "/ingreso-ajuste" },
          { title: "Ingresos por transferencia", path: "/ingreso-transferencia" },
        ],
      },
    ],
  },
  {
    title: "Contabilidad",
    icon: FileBarChart2,
    submenu: [
      {
        title: "Información maestra",
        submenu: [
          { title: "Plan de cuentas", path: "/plan-cuentas" },
          { title: "Cuentas por compañía", path: "/cuentas-compania" },
          { title: "Unidades de negocio", path: "/unidades-negocio" },
        ],
      },
    ],
  },
];
