
import React from "react";
import { Article } from "@/types/article";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface GeneralInfoTabProps {
  formData: Article;
  handleChange: (field: keyof Article, value: string | boolean) => void;
  isReadOnly: boolean;
}

export const GeneralInfoTab = ({
  formData,
  handleChange,
  isReadOnly,
}: GeneralInfoTabProps) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label htmlFor="code" className="text-xs">Código</Label>
          <Input
            id="code"
            value={formData.code}
            onChange={(e) => handleChange("code", e.target.value)}
            readOnly={isReadOnly}
            className="h-8 text-xs"
          />
        </div>
        
        <div className="space-y-1.5">
          <Label htmlFor="alternateCode" className="text-xs">Código Alterno</Label>
          <Input
            id="alternateCode"
            value={formData.alternateCode || ""}
            onChange={(e) => handleChange("alternateCode", e.target.value)}
            readOnly={isReadOnly}
            className="h-8 text-xs"
          />
        </div>
      </div>
      
      <div className="space-y-1.5">
        <Label htmlFor="description" className="text-xs">Descripción</Label>
        <Input
          id="description"
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          readOnly={isReadOnly}
          className="h-8 text-xs"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label htmlFor="partNumber" className="text-xs">Número de Parte</Label>
          <Input
            id="partNumber"
            value={formData.partNumber || ""}
            onChange={(e) => handleChange("partNumber", e.target.value)}
            readOnly={isReadOnly}
            className="h-8 text-xs"
          />
        </div>
        
        <div className="space-y-1.5">
          <Label htmlFor="crossReference" className="text-xs">Referencia Cruzada</Label>
          <Input
            id="crossReference"
            value={formData.crossReference || ""}
            onChange={(e) => handleChange("crossReference", e.target.value)}
            readOnly={isReadOnly}
            className="h-8 text-xs"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label htmlFor="storage" className="text-xs">Almacenamiento</Label>
          <Select 
            value={formData.storage} 
            onValueChange={(value) => handleChange("storage", value)}
            disabled={isReadOnly}
          >
            <SelectTrigger id="storage" className="h-8 text-xs">
              <SelectValue placeholder="Seleccione almacenamiento" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Almacén Principal">Almacén Principal</SelectItem>
              <SelectItem value="Almacén Secundario">Almacén Secundario</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-1.5">
          <Label htmlFor="status" className="text-xs">Estado</Label>
          <Select 
            value={formData.status} 
            onValueChange={(value) => handleChange("status", value)}
            disabled={isReadOnly}
          >
            <SelectTrigger id="status" className="h-8 text-xs">
              <SelectValue placeholder="Seleccione estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Activo">Activo</SelectItem>
              <SelectItem value="Inactivo">Inactivo</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label htmlFor="brand" className="text-xs">Marca</Label>
          <Select 
            value={formData.brand} 
            onValueChange={(value) => handleChange("brand", value)}
            disabled={isReadOnly}
          >
            <SelectTrigger id="brand" className="h-8 text-xs">
              <SelectValue placeholder="Seleccione marca" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="FIXALL">FIXALL</SelectItem>
              <SelectItem value="ANCLAFLEX">ANCLAFLEX</SelectItem>
              <SelectItem value="SELLOTAPE">SELLOTAPE</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-1.5">
          <Label htmlFor="barcode" className="text-xs">Código de Barras</Label>
          <Input
            id="barcode"
            value={formData.barcode || ""}
            onChange={(e) => handleChange("barcode", e.target.value)}
            readOnly={isReadOnly}
            className="h-8 text-xs"
          />
        </div>
      </div>
      
      <div className="space-y-1.5">
        <Label htmlFor="supplier" className="text-xs">Proveedor</Label>
        <div className="flex gap-2">
          <Input
            id="supplier"
            className="flex-1 h-8 text-xs"
            value={formData.supplier || ""}
            onChange={(e) => handleChange("supplier", e.target.value)}
            readOnly={isReadOnly}
          />
          {!isReadOnly && (
            <Button variant="outline" className="w-12 h-8 text-xs">...</Button>
          )}
        </div>
      </div>
    </>
  );
};
