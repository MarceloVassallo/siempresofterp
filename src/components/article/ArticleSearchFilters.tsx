
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

interface SearchFiltersProps {
  searchFilters: {
    description: string;
    class: string;
    subClass: string;
    code: string;
    crossReference: string;
    alternateCode: string;
    partNumber: string;
    storage: string;
    status: string;
    brand: string;
    client: string;
    supplier: string;
    price: string;
    categoryAccount: string;
    hasStock: boolean;
  };
  handleFilterChange: (field: string, value: string | boolean) => void;
  handleSearch: () => void;
}

const ArticleSearchFilters = ({ 
  searchFilters, 
  handleFilterChange, 
  handleSearch 
}: SearchFiltersProps) => {
  return (
    <Card className="mb-4">
      <CardContent className="p-3">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="description" className="text-xs">Descripción</Label>
            <div className="flex items-center gap-1.5">
              <Select
                value="contains"
                onValueChange={() => {}}
              >
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="contains" className="text-xs">Contiene</SelectItem>
                  <SelectItem value="equals" className="text-xs">Igual a</SelectItem>
                  <SelectItem value="startsWith" className="text-xs">Comienza con</SelectItem>
                </SelectContent>
              </Select>
              <Input 
                id="description"
                className="h-8 text-xs"
                value={searchFilters.description}
                onChange={(e) => handleFilterChange("description", e.target.value)}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="class" className="text-xs">Clase</Label>
            <div className="flex items-center gap-2">
              <Select
                value="all"
                onValueChange={(value) => handleFilterChange("class", value)}
              >
                <SelectTrigger className="w-full h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all" className="text-xs">Todas</SelectItem>
                  <SelectItem value="class1" className="text-xs">Clase 1</SelectItem>
                  <SelectItem value="class2" className="text-xs">Clase 2</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="subClass" className="text-xs">Sub Clase</Label>
            <div className="flex items-center gap-2">
              <Select
                value="all"
                onValueChange={(value) => handleFilterChange("subClass", value)}
              >
                <SelectTrigger className="w-full h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all" className="text-xs">Todas</SelectItem>
                  <SelectItem value="subclass1" className="text-xs">Sub Clase 1</SelectItem>
                  <SelectItem value="subclass2" className="text-xs">Sub Clase 2</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="code" className="text-xs">Cód. Artículo</Label>
            <div className="flex items-center gap-2">
              <Select
                value="contains"
                onValueChange={() => {}}
              >
                <SelectTrigger className="w-[80px] flex-shrink-0 h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="contains" className="text-xs">Contiene</SelectItem>
                  <SelectItem value="equals" className="text-xs">Igual a</SelectItem>
                  <SelectItem value="startsWith" className="text-xs">Comienza con</SelectItem>
                </SelectContent>
              </Select>
              <Input 
                id="code"
                className="h-8 text-xs"
                value={searchFilters.code}
                onChange={(e) => handleFilterChange("code", e.target.value)}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="alternateCode" className="text-xs">Cód. Alterno</Label>
            <div className="flex items-center gap-2">
              <Select
                value="contains"
                onValueChange={() => {}}
              >
                <SelectTrigger className="w-[80px] flex-shrink-0 h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="contains" className="text-xs">Contiene</SelectItem>
                  <SelectItem value="equals" className="text-xs">Igual a</SelectItem>
                  <SelectItem value="startsWith" className="text-xs">Comienza con</SelectItem>
                </SelectContent>
              </Select>
              <Input 
                id="alternateCode"
                className="h-8 text-xs"
                value={searchFilters.alternateCode}
                onChange={(e) => handleFilterChange("alternateCode", e.target.value)}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="crossReference" className="text-xs">Ref. Cruzada</Label>
            <div className="flex items-center gap-2">
              <Select
                value="contains"
                onValueChange={() => {}}
              >
                <SelectTrigger className="w-[80px] flex-shrink-0 h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="contains" className="text-xs">Contiene</SelectItem>
                  <SelectItem value="equals" className="text-xs">Igual a</SelectItem>
                  <SelectItem value="startsWith" className="text-xs">Comienza con</SelectItem>
                </SelectContent>
              </Select>
              <Input 
                id="crossReference"
                className="h-8 text-xs"
                value={searchFilters.crossReference}
                onChange={(e) => handleFilterChange("crossReference", e.target.value)}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="partNumber" className="text-xs">Nro.Parte</Label>
            <div className="flex items-center gap-2">
              <Select
                value="contains"
                onValueChange={() => {}}
              >
                <SelectTrigger className="w-[80px] flex-shrink-0 h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="contains" className="text-xs">Contiene</SelectItem>
                  <SelectItem value="equals" className="text-xs">Igual a</SelectItem>
                  <SelectItem value="startsWith" className="text-xs">Comienza con</SelectItem>
                </SelectContent>
              </Select>
              <Input 
                id="partNumber"
                className="h-8 text-xs"
                value={searchFilters.partNumber}
                onChange={(e) => handleFilterChange("partNumber", e.target.value)}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="storage" className="text-xs">Almacenamiento</Label>
            <div className="flex items-center gap-2">
              <Select
                value="all"
                onValueChange={(value) => handleFilterChange("storage", value)}
              >
                <SelectTrigger className="w-full h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all" className="text-xs">Todos</SelectItem>
                  <SelectItem value="almacen1" className="text-xs">Almacén Principal</SelectItem>
                  <SelectItem value="almacen2" className="text-xs">Almacén Secundario</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="status" className="text-xs">Estado</Label>
            <div className="flex items-center gap-2">
              <Select
                value="all"
                onValueChange={(value) => handleFilterChange("status", value)}
              >
                <SelectTrigger className="w-full h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all" className="text-xs">Todos</SelectItem>
                  <SelectItem value="activo" className="text-xs">Activo</SelectItem>
                  <SelectItem value="inactivo" className="text-xs">Inactivo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="brand" className="text-xs">Marca</Label>
            <div className="flex items-center gap-2">
              <Select
                value="all"
                onValueChange={(value) => handleFilterChange("brand", value)}
              >
                <SelectTrigger className="w-full h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all" className="text-xs">Todas</SelectItem>
                  <SelectItem value="fixall" className="text-xs">FIXALL</SelectItem>
                  <SelectItem value="anclaflex" className="text-xs">ANCLAFLEX</SelectItem>
                  <SelectItem value="sellotape" className="text-xs">SELLOTAPE</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="client" className="text-xs">Cliente</Label>
            <Input 
              id="client"
              className="h-8 text-xs"
              value={searchFilters.client}
              onChange={(e) => handleFilterChange("client", e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="supplier" className="text-xs">Proveedor</Label>
            <div className="flex gap-2">
              <Input
                id="supplier"
                className="flex-1 h-8 text-xs"
                value={searchFilters.supplier}
                onChange={(e) => handleFilterChange("supplier", e.target.value)}
              />
              <Button variant="outline" className="w-12 h-8" size="sm">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="price" className="text-xs">Cotización</Label>
            <div className="flex gap-2">
              <Input
                id="price"
                type="number"
                className="flex-1 h-8 text-xs"
                value={searchFilters.price}
                onChange={(e) => handleFilterChange("price", e.target.value)}
              />
              <Button variant="outline" className="w-12 h-8" size="sm">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="categoryAccount" className="text-xs">Cat. Contable</Label>
            <Select
              value={searchFilters.categoryAccount || "all"}
              onValueChange={(value) => handleFilterChange("categoryAccount", value)}
            >
              <SelectTrigger className="w-full h-8 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" className="text-xs">Todas</SelectItem>
                <SelectItem value="mercaderia" className="text-xs">Mercadería</SelectItem>
                <SelectItem value="suministros" className="text-xs">Suministros</SelectItem>
                <SelectItem value="activos" className="text-xs">Activos</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="flex items-center mt-4 gap-2">
          <Checkbox 
            id="hasStock" 
            checked={searchFilters.hasStock}
            onCheckedChange={(checked) => handleFilterChange("hasStock", Boolean(checked))}
          />
          <Label htmlFor="hasStock" className="text-xs">Con stock disponible</Label>
        </div>
        
        <div className="flex justify-end mt-6">
          <Button onClick={handleSearch} size="sm" className="h-8 text-xs">
            <Search className="mr-2 h-4 w-4" />
            Buscar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ArticleSearchFilters;
