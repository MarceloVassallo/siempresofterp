
import React from "react";
import { Article } from "@/types/article";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PricingTabProps {
  formData: Article;
  handleChange: (field: keyof Article, value: string | boolean) => void;
  isReadOnly: boolean;
}

export const PricingTab = ({
  formData,
  handleChange,
  isReadOnly,
}: PricingTabProps) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label htmlFor="cost" className="text-xs">Costo</Label>
          <Input
            id="cost"
            type="number"
            placeholder="0.00"
            readOnly={isReadOnly}
            className="h-8 text-xs"
          />
        </div>
        
        <div className="space-y-1.5">
          <Label htmlFor="price" className="text-xs">Precio Venta</Label>
          <Input
            id="price"
            type="number"
            placeholder="0.00"
            readOnly={isReadOnly}
            className="h-8 text-xs"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label htmlFor="currency" className="text-xs">Moneda</Label>
          <Select disabled={isReadOnly}>
            <SelectTrigger id="currency" className="h-8 text-xs">
              <SelectValue placeholder="Seleccione moneda" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="PEN">Soles (PEN)</SelectItem>
              <SelectItem value="USD">Dólares (USD)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-1.5">
          <Label htmlFor="categoryAccount" className="text-xs">Categoría Contable</Label>
          <Select disabled={isReadOnly}>
            <SelectTrigger id="categoryAccount" className="h-8 text-xs">
              <SelectValue placeholder="Seleccione categoría" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mercaderia">Mercadería</SelectItem>
              <SelectItem value="suministros">Suministros</SelectItem>
              <SelectItem value="activos">Activos</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </>
  );
};
