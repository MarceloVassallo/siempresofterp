
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
        <h1 className="text-base font-semibold mb-3">
          {mode === "NEW" ? "Nuevo Almacén" : 
           mode === "EDIT" ? "Modificar Almacén" : 
           "Ver Detalle de Almacén"}
        </h1>
        <Card className="shadow-sm">
          <CardContent className="pt-4">
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
    <div className="text-sm">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-base font-semibold">Gestión de Almacenes</h1>
      </div>
      
      {/* Updated toolbar */}
      <div className="flex flex-wrap gap-2 mb-3">
        <Button 
          variant="outline" 
          size="sm"
          onClick={handleNew}
          className="flex items-center gap-1 h-8 text-xs px-2"
        >
          <Plus size={14} />
          Nuevo
        </Button>
        <Button 
          variant="outline"
          size="sm" 
          onClick={() => {
            // For demo purposes, edit the first warehouse
            if (warehouses.length > 0) handleEdit(warehouses[0]);
          }}
          className="flex items-center gap-1 h-8 text-xs px-2"
        >
          <PencilLine size={14} />
          Modificar
        </Button>
        <Button 
          variant="outline"
          size="sm" 
          onClick={() => {
            // For demo purposes, delete the first warehouse
            if (warehouses.length > 0) handleDelete(warehouses[0].code);
          }}
          className="flex items-center gap-1 h-8 text-xs px-2"
        >
          <Trash2 size={14} />
          Eliminar
        </Button>
        <Button 
          variant="outline"
          size="sm" 
          onClick={() => {
            // For demo purposes, view the first warehouse
            if (warehouses.length > 0) handleView(warehouses[0]);
          }}
          className="flex items-center gap-1 h-8 text-xs px-2"
        >
          <Eye size={14} />
          Ver Detalle
        </Button>
      </div>
      
      <Card className="shadow-sm text-xs">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="h-8">
                <TableHead className="w-[100px] text-xs font-medium">Código</TableHead>
                <TableHead className="text-xs font-medium">Nombre</TableHead>
                <TableHead className="text-xs font-medium">Dirección</TableHead>
                <TableHead className="w-[150px] text-xs font-medium">Cód. Establecimiento</TableHead>
                <TableHead className="text-right w-[120px] text-xs font-medium">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentWarehouses.map((warehouse) => (
                <TableRow key={warehouse.code} className="h-8">
                  <TableCell className="text-xs py-1">{warehouse.code}</TableCell>
                  <TableCell className="text-xs py-1">{warehouse.name}</TableCell>
                  <TableCell className="text-xs py-1">{warehouse.otherAddress}</TableCell>
                  <TableCell className="text-xs py-1">{warehouse.establishmentCode}</TableCell>
                  <TableCell className="text-right py-1">
                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleEdit(warehouse)}>
                      <PencilLine className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleView(warehouse)}>
                      <Eye className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleDelete(warehouse.code)}>
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          <div className="flex items-center justify-between px-3 py-2 border-t text-xs">
            <div className="flex items-center gap-2">
              <p className="text-xs font-medium">Filas por página</p>
              <Select
                value={perPage}
                onValueChange={(value) => {
                  setPerPage(value);
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger className="h-7 w-[60px] text-xs">
                  <SelectValue placeholder={perPage} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5" className="text-xs">5</SelectItem>
                  <SelectItem value="10" className="text-xs">10</SelectItem>
                  <SelectItem value="20" className="text-xs">20</SelectItem>
                  <SelectItem value="50" className="text-xs">50</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Pagination>
              <PaginationContent className="text-xs">
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    className={`text-xs h-7 ${currentPage === 1 ? "pointer-events-none opacity-50" : ""}`}
                  />
                </PaginationItem>
                
                {pageItems.map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      isActive={page === currentPage}
                      onClick={() => setCurrentPage(page)}
                      className="text-xs h-7 w-7"
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    className={`text-xs h-7 ${currentPage === totalPages ? "pointer-events-none opacity-50" : ""}`}
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
