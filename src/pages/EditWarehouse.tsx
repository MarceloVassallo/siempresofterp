
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EditWarehouseForm } from "@/components/EditWarehouseForm";
import { Warehouse, defaultWarehouse } from "@/types/warehouse";
import { Package, Edit, Eye, Trash } from "lucide-react";

// Datos de ejemplo para la tabla de almacenes
const warehouseData: Warehouse[] = [
  {
    code: "001",
    establishmentCode: "1001",
    name: "Almacén Principal",
    companyId: "1",
    address: "1",
    otherAddress: "Calle Principal 123",
    branchId: "1",
    locationId: "1",
    warehouseType: "1",
    costCenterId: "1",
    observations: "Almacén principal de la empresa",
    inactive: false,
  },
  {
    code: "002",
    establishmentCode: "1002",
    name: "Almacén Secundario",
    companyId: "1",
    address: "2",
    otherAddress: "Avenida Central 456",
    branchId: "2",
    locationId: "2",
    warehouseType: "2",
    costCenterId: "2",
    observations: "Almacén secundario para stock adicional",
    inactive: false,
  },
];

type ActionMode = "VIEW" | "EDIT" | "NEW" | "LIST";

const EditWarehouse = () => {
  const [warehouses] = useState<Warehouse[]>(warehouseData);
  const [currentWarehouse, setCurrentWarehouse] = useState<Warehouse | null>(null);
  const [mode, setMode] = useState<ActionMode>("LIST");

  const handleNew = () => {
    setCurrentWarehouse({ ...defaultWarehouse });
    setMode("NEW");
  };

  const handleEdit = (warehouse: Warehouse) => {
    setCurrentWarehouse({ ...warehouse });
    setMode("EDIT");
  };

  const handleView = (warehouse: Warehouse) => {
    setCurrentWarehouse({ ...warehouse });
    setMode("VIEW");
  };

  const handleDelete = (code: string) => {
    // En una implementación real, aquí iría la lógica para eliminar el almacén
    alert(`Eliminar almacén con código: ${code}`);
  };

  const handleCancel = () => {
    setMode("LIST");
    setCurrentWarehouse(null);
  };

  const handleSubmit = (data: Warehouse) => {
    // En una implementación real, aquí iría la lógica para guardar los cambios
    console.log("Datos del almacén a guardar:", data);
    setMode("LIST");
    setCurrentWarehouse(null);
  };

  if (mode !== "LIST") {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-8">
          {mode === "NEW" ? "Nuevo Almacén" : 
           mode === "EDIT" ? "Modificar Almacén" : 
           "Ver Detalle de Almacén"}
        </h1>
        <EditWarehouseForm 
          initialWarehouse={currentWarehouse || defaultWarehouse}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          readOnly={mode === "VIEW"}
        />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Gestión de Almacenes</h1>
      
      <div className="mb-6">
        <Button onClick={handleNew} className="mr-2">
          <Package className="mr-2 h-4 w-4" />
          Nuevo
        </Button>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Código</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Dirección</TableHead>
              <TableHead className="w-[150px]">Cód. Establecimiento</TableHead>
              <TableHead className="text-right w-[150px]">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {warehouses.map((warehouse) => (
              <TableRow key={warehouse.code}>
                <TableCell>{warehouse.code}</TableCell>
                <TableCell>{warehouse.name}</TableCell>
                <TableCell>{warehouse.otherAddress}</TableCell>
                <TableCell>{warehouse.establishmentCode}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(warehouse)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleView(warehouse)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(warehouse.code)}>
                    <Trash className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default EditWarehouse;
