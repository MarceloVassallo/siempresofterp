import { useState, useEffect } from "react";
import { Article } from "@/types/article";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

interface ArticleFormProps {
  mode: "new" | "edit" | "view" | null;
  article: Article | null;
  onClose: () => void;
  onSave: (article: Article) => void;
}

const ArticleForm = ({ mode, article, onClose, onSave }: ArticleFormProps) => {
  const [formData, setFormData] = useState<Article>({
    id: "",
    code: "",
    description: "",
    alternateCode: "",
    partNumber: "",
    crossReference: "",
    storage: "",
    status: "Activo",
    brand: "",
    barcode: "",
    supplier: "",
    hasStock: false,
  });

  useEffect(() => {
    if (article) {
      setFormData(article);
    } else {
      setFormData({
        id: "",
        code: "",
        description: "",
        alternateCode: "",
        partNumber: "",
        crossReference: "",
        storage: "",
        status: "Activo",
        brand: "",
        barcode: "",
        supplier: "",
        hasStock: false,
      });
    }
  }, [article]);

  const handleChange = (field: keyof Article, value: string | boolean) => {
    setFormData({ ...formData, [field]: value });
  };

  const isReadOnly = mode === "view";

  return (
    <div className="container mx-auto">
      <Card className="w-full max-w-4xl mx-auto shadow-sm">
        <CardHeader className="py-3 px-4">
          <CardTitle className="text-base">
            {mode === "new" ? "Nuevo Artículo" : mode === "edit" ? "Modificar Artículo" : "Detalle de Artículo"}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3 text-xs">
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid grid-cols-3 h-8">
              <TabsTrigger value="general" className="text-xs py-1">Información General</TabsTrigger>
              <TabsTrigger value="inventory" className="text-xs py-1">Control de Inventario</TabsTrigger>
              <TabsTrigger value="pricing" className="text-xs py-1">Precios y Costos</TabsTrigger>
            </TabsList>
            
            <TabsContent value="general" className="space-y-3 mt-3">
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
            </TabsContent>
            
            <TabsContent value="inventory" className="space-y-3 mt-3">
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
            </TabsContent>
            
            <TabsContent value="pricing" className="space-y-3 mt-3">
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
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-end gap-2 py-2 px-3 border-t">
          <Button variant="outline" onClick={onClose} size="sm" className="h-8 text-xs">
            {isReadOnly ? "Cerrar" : "Cancelar"}
          </Button>
          {!isReadOnly && (
            <Button onClick={() => onSave(formData)} size="sm" className="h-8 text-xs">
              {mode === "new" ? "Crear" : "Guardar"}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default ArticleForm;
