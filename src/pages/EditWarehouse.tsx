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
import { EditWarehouseForm } from "@/components/warehouse/EditWarehouseForm";
import { Warehouse, defaultWarehouse } from "@/types/warehouse";
import { Package, PencilLine, Eye, Trash2, Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  {
    code: "003",
    establishmentCode: "1003",
    name: "Almacén Norte",
    companyId: "1",
    address: "1",
    otherAddress: "Av. Norte 789",
    branchId: "1",
    locationId: "3",
    warehouseType: "1",
    costCenterId: "1",
    observations: "Almacén de la zona norte",
    inactive: false,
  },
  {
    code: "004",
    establishmentCode: "1004",
    name: "Almacén Sur",
    companyId: "1",
    address: "2",
    otherAddress: "Av. Sur 321",
    branchId: "2",
    locationId: "1",
    warehouseType: "2",
    costCenterId: "2",
    observations: "Almacén de la zona sur",
    inactive: true,
  },
  {
    code: "005",
    establishmentCode: "1005",
    name: "Almacén Este",
    companyId: "1",
    address: "1",
    otherAddress: "Av. Este 456",
    branchId: "1",
    locationId: "2",
    warehouseType: "1",
    costCenterId: "1",
    observations: "Almacén de la zona este",
    inactive: false,
  },
];

type ActionMode = "VIEW" | "EDIT" | "NEW" | "LIST";

const EditWarehouse = () => {
  const [warehouses] = useState<Warehouse[]>(warehouseData);
  const [currentWarehouse, setCurrentWarehouse] = useState<Warehouse | null>(null);
  const [mode, setMode] = useState<ActionMode>("LIST");

  // Paginación
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<string>("5");
  
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

  // Para la paginación
  const totalPages = Math.ceil(warehouses.length / parseInt(perPage));
  const pageItems = Array.from({ length: totalPages }, (_, i) => i + 1);
  
  const startIndex = (currentPage - 1) * parseInt(perPage);
  const endIndex = startIndex + parseInt(perPage);
  const currentWarehouses = warehouses.slice(startIndex, endIndex);

  if (mode !== "LIST") {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-8">
          {mode === "NEW" ? "Nuevo Almacén" : 
           mode === "EDIT" ? "Modificar Almacén" : 
           "Ver Detalle de Almacén"}
        </h1>
        <Card>
          <CardContent className="pt-6">
            <EditWarehouseForm 
              initialWarehouse={currentWarehouse || defaultWarehouse}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
              readOnly={mode === "VIEW"}
            />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestión de Almacenes</h1>
      </div>
      
      {/* Updated toolbar */}
      <div className="flex flex-wrap gap-2 mb-4">
        <Button 
          variant="outline" 
          onClick={handleNew}
          className="flex items-center gap-2"
        >
          <Plus size={16} />
          Nuevo
        </Button>
        <Button 
          variant="outline" 
          onClick={() => {
            // For demo purposes, edit the first warehouse
            if (warehouses.length > 0) handleEdit(warehouses[0]);
          }}
          className="flex items-center gap-2"
        >
          <PencilLine size={16} />
          Modificar
        </Button>
        <Button 
          variant="outline" 
          onClick={() => {
            // For demo purposes, delete the first warehouse
            if (warehouses.length > 0) handleDelete(warehouses[0].code);
          }}
          className="flex items-center gap-2"
        >
          <Trash2 size={16} />
          Eliminar
        </Button>
        <Button 
          variant="outline" 
          onClick={() => {
            // For demo purposes, view the first warehouse
            if (warehouses.length > 0) handleView(warehouses[0]);
          }}
          className="flex items-center gap-2"
        >
          <Eye size={16} />
          Ver Detalle
        </Button>
      </div>
      
      <Card>
        <CardContent className="p-0">
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
              {currentWarehouses.map((warehouse) => (
                <TableRow key={warehouse.code}>
                  <TableCell>{warehouse.code}</TableCell>
                  <TableCell>{warehouse.name}</TableCell>
                  <TableCell>{warehouse.otherAddress}</TableCell>
                  <TableCell>{warehouse.establishmentCode}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(warehouse)}>
                      <PencilLine className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleView(warehouse)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(warehouse.code)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          <div className="flex items-center justify-between px-4 py-4 border-t">
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium">Filas por página</p>
              <Select
                value={perPage}
                onValueChange={(value) => {
                  setPerPage(value);
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger className="h-8 w-[70px]">
                  <SelectValue placeholder={perPage} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
                
                {pageItems.map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      isActive={page === currentPage}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditWarehouse;
