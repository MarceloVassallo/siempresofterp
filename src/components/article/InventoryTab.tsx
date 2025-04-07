
import React from "react";
import { Article } from "@/types/article";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface InventoryTabProps {
  formData: Article;
  handleChange: (field: keyof Article, value: string | boolean) => void;
  isReadOnly: boolean;
}

export const InventoryTab = ({
  formData,
  handleChange,
  isReadOnly,
}: InventoryTabProps) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label htmlFor="minStock" className="text-xs">Stock Mínimo</Label>
          <Input
            id="minStock"
            type="number"
            placeholder="0"
            readOnly={isReadOnly}
            className="h-8 text-xs"
          />
        </div>
        
        <div className="space-y-1.5">
          <Label htmlFor="maxStock" className="text-xs">Stock Máximo</Label>
          <Input
            id="maxStock"
            type="number"
            placeholder="0"
            readOnly={isReadOnly}
            className="h-8 text-xs"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label htmlFor="reorderPoint" className="text-xs">Punto de Reorden</Label>
          <Input
            id="reorderPoint"
            type="number"
            placeholder="0"
            readOnly={isReadOnly}
            className="h-8 text-xs"
          />
        </div>
        
        <div className="space-y-1.5">
          <Label htmlFor="safetyStock" className="text-xs">Stock de Seguridad</Label>
          <Input
            id="safetyStock"
            type="number"
            placeholder="0"
            readOnly={isReadOnly}
            className="h-8 text-xs"
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="hasStock" 
          checked={formData.hasStock} 
          onCheckedChange={(checked) => handleChange("hasStock", Boolean(checked))}
          disabled={isReadOnly}
        />
        <label htmlFor="hasStock" className="text-sm font-medium leading-none">
          Tiene stock disponible
        </label>
      </div>
    </>
  );
};
