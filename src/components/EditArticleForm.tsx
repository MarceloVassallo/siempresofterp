import { useState, useEffect } from "react";
import { Article } from "@/types/article";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Search, Upload, Download, Plus, Trash2 } from "lucide-react";

interface EditArticleFormProps {
  mode: "new" | "edit" | "view";
  article: Article | null;
  onClose: () => void;
  onSave: (article: Article) => void;
}

const EditArticleForm = ({ mode, article, onClose, onSave }: EditArticleFormProps) => {
  const { toast } = useToast();
  const isReadOnly = mode === "view";
  
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
    categoryAccount: "",
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
        categoryAccount: "",
      });
    }
  }, [article]);

  const handleChange = (field: keyof Article, value: string | boolean) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = () => {
    // Add validation if needed
    if (!formData.code || !formData.description) {
      toast({
        title: "Error",
        description: "Código y descripción son requeridos",
        variant: "destructive",
      });
      return;
    }
    
    onSave(formData);
    toast({
      title: mode === "new" ? "Artículo Creado" : "Artículo Actualizado",
      description: `${formData.description} ha sido ${mode === "new" ? "creado" : "actualizado"} exitosamente.`,
    });
  };

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
            <TabsList className="grid grid-cols-5 md:grid-cols-7 h-8">
              <TabsTrigger value="general" className="text-xs py-1">Información General</TabsTrigger>
              <TabsTrigger value="inventory" className="text-xs py-1">Inventario</TabsTrigger>
              <TabsTrigger value="pricing" className="text-xs py-1">Precios</TabsTrigger>
              <TabsTrigger value="categories" className="text-xs py-1">Categorías</TabsTrigger>
              <TabsTrigger value="alternates" className="text-xs py-1">Códigos Alternos</TabsTrigger>
              {mode !== "new" && <TabsTrigger value="files" className="text-xs py-1">Archivos</TabsTrigger>}
              {mode !== "new" && <TabsTrigger value="related" className="text-xs py-1">Relacionados</TabsTrigger>}
            </TabsList>
            
            {/* General Information Tab */}
            <TabsContent value="general" className="space-y-3 mt-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="code" className="text-xs">Código</Label>
                  <Input
                    id="code"
                    value={formData.code}
                    onChange={(e) => handleChange("code", e.target.value)}
                    readOnly={isReadOnly || mode === "edit"}
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
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  readOnly={isReadOnly}
                  className="min-h-[60px] text-xs resize-none"
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
                    disabled={isReadOnly}
                    value={formData.storage || "default_storage"}
                    onValueChange={(value) => handleChange("storage", value)}
                  >
                    <SelectTrigger id="storage" className="h-8 text-xs">
                      <SelectValue placeholder="Seleccione almacenamiento" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default_storage">Seleccione almacenamiento</SelectItem>
                      <SelectItem value="Almacén Principal">Almacén Principal</SelectItem>
                      <SelectItem value="Almacén Secundario">Almacén Secundario</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-1.5">
                  <Label htmlFor="status" className="text-xs">Estado</Label>
                  <Select 
                    disabled={isReadOnly}
                    value={formData.status || "Activo"}
                    onValueChange={(value) => handleChange("status", value)}
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
                    disabled={isReadOnly}
                    value={formData.brand || "default_brand"}
                    onValueChange={(value) => handleChange("brand", value === "default_brand" ? "" : value)}
                  >
                    <SelectTrigger id="brand" className="h-8 text-xs">
                      <SelectValue placeholder="Seleccione marca" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default_brand">Seleccione marca</SelectItem>
                      <SelectItem value="FIXALL">FIXALL</SelectItem>
                      <SelectItem value="ANCLAFLEX">ANCLAFLEX</SelectItem>
                      <SelectItem value="SELLOTAPE">SELLOTAPE</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-1.5">
                  <Label htmlFor="barcode" className="text-xs">Código de Barras</Label>
                  <div className="flex gap-2">
                    <Input
                      id="barcode"
                      value={formData.barcode || ""}
                      onChange={(e) => handleChange("barcode", e.target.value)}
                      readOnly={isReadOnly}
                      className="flex-1 h-8 text-xs"
                    />
                    {!isReadOnly && (
                      <Button variant="outline" className="w-auto px-3 h-8 text-xs">
                        Generar
                      </Button>
                    )}
                  </div>
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
                    <Button variant="outline" className="w-12 h-8 text-xs">
                      <Search className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="hasStock" 
                    checked={formData.hasStock} 
                    onCheckedChange={(checked) => handleChange("hasStock", Boolean(checked))}
                    disabled={isReadOnly}
                  />
                  <label htmlFor="hasStock" className="text-sm font-medium leading-none cursor-pointer">
                    Tiene stock disponible
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="service" 
                    disabled={isReadOnly}
                  />
                  <label htmlFor="service" className="text-sm font-medium leading-none cursor-pointer">
                    Servicio
                  </label>
                </div>
              </div>
            </TabsContent>
            
            {/* Inventory Tab */}
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
              
              <div className="mt-4 space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox id="allowLots" disabled={isReadOnly} />
                  <label htmlFor="allowLots" className="text-sm font-medium leading-none">
                    Permitir Lote
                  </label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox id="allowSerial" disabled={isReadOnly} />
                  <label htmlFor="allowSerial" className="text-sm font-medium leading-none">
                    Permitir Serie
                  </label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox id="isPrimary" disabled={isReadOnly} />
                  <label htmlFor="isPrimary" className="text-sm font-medium leading-none">
                    Permitir cantidad fracción de UM Primaria
                  </label>
                </div>
              </div>
            </TabsContent>
            
            {/* Pricing Tab */}
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
                  <Select disabled={isReadOnly} defaultValue="PEN">
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
                  <Select 
                    value={formData.categoryAccount || "default_category"}
                    onValueChange={(value) => handleChange("categoryAccount", value === "default_category" ? "" : value)}
                    disabled={isReadOnly}
                  >
                    <SelectTrigger id="categoryAccount" className="h-8 text-xs">
                      <SelectValue placeholder="Seleccione categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default_category">Seleccione categoría</SelectItem>
                      <SelectItem value="mercaderia">Mercadería</SelectItem>
                      <SelectItem value="suministros">Suministros</SelectItem>
                      <SelectItem value="activos">Activos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="mt-4 space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox id="volumePrice" disabled={isReadOnly} />
                  <label htmlFor="volumePrice" className="text-sm font-medium leading-none">
                    Precios por Volumen
                  </label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox id="allowLowerPrice" disabled={isReadOnly} />
                  <label htmlFor="allowLowerPrice" className="text-sm font-medium leading-none">
                    Permitir precio menor que costo
                  </label>
                </div>
              </div>
            </TabsContent>
            
            {/* Categories Tab */}
            <TabsContent value="categories" className="space-y-3 mt-3">
              <div className="grid grid-cols-1 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="cat1" className="text-xs">Categoría 1 (Reparto)</Label>
                  <Select disabled={isReadOnly} defaultValue="default">
                    <SelectTrigger id="cat1" className="h-8 text-xs">
                      <SelectValue placeholder="Seleccione categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Seleccione categoría</SelectItem>
                      <SelectItem value="cat1-a">Categoría 1A</SelectItem>
                      <SelectItem value="cat1-b">Categoría 1B</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-1.5">
                  <Label htmlFor="cat2" className="text-xs">Categoría 2</Label>
                  <Select disabled={isReadOnly} defaultValue="default">
                    <SelectTrigger id="cat2" className="h-8 text-xs">
                      <SelectValue placeholder="Seleccione categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Seleccione categoría</SelectItem>
                      <SelectItem value="cat2-a">Categoría 2A</SelectItem>
                      <SelectItem value="cat2-b">Categoría 2B</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-1.5">
                  <Label htmlFor="priceGroup" className="text-xs">Grupo Precios</Label>
                  <Select disabled={isReadOnly} defaultValue="default">
                    <SelectTrigger id="priceGroup" className="h-8 text-xs">
                      <SelectValue placeholder="Seleccione grupo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Seleccione grupo</SelectItem>
                      <SelectItem value="price-a">Grupo A</SelectItem>
                      <SelectItem value="price-b">Grupo B</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-1.5">
                  <Label htmlFor="commissionGroup" className="text-xs">Grupo Comisión</Label>
                  <Select disabled={isReadOnly} defaultValue="default">
                    <SelectTrigger id="commissionGroup" className="h-8 text-xs">
                      <SelectValue placeholder="Seleccione grupo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Seleccione grupo</SelectItem>
                      <SelectItem value="comm-a">Comisión A</SelectItem>
                      <SelectItem value="comm-b">Comisión B</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="p-4 border rounded-md mt-6">
                <h3 className="font-medium mb-4">Categorías ABC</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="abcSales" className="text-xs">Costo Ventas</Label>
                    <Input
                      id="abcSales"
                      maxLength={1}
                      placeholder="A, B o C"
                      readOnly={isReadOnly}
                      className="h-8 text-xs"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="abcRotation" className="text-xs">Rotación</Label>
                    <Input
                      id="abcRotation"
                      maxLength={1}
                      placeholder="A, B o C"
                      readOnly={isReadOnly}
                      className="h-8 text-xs"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {/* Alternate Codes Tab */}
            <TabsContent value="alternates" className="space-y-3 mt-3">
              <div className="flex gap-2 mb-4">
                <Input 
                  placeholder="Código Alterno"
                  disabled={isReadOnly}
                  className="flex-1 h-8 text-xs"
                />
                <Select disabled={isReadOnly} defaultValue="default_um">
                  <SelectTrigger className="w-[180px] h-8 text-xs">
                    <SelectValue placeholder="UM" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default_um">Seleccionar UM</SelectItem>
                    <SelectItem value="unidad">Unidad</SelectItem>
                    <SelectItem value="kg">Kilogramo</SelectItem>
                    <SelectItem value="lt">Litro</SelectItem>
                  </SelectContent>
                </Select>
                <Button disabled={isReadOnly} className="h-8 text-xs">Agregar</Button>
              </div>
              
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[80px] text-center text-xs font-medium py-1.5">Item</TableHead>
                      <TableHead className="text-xs font-medium py-1.5">Código Alterno</TableHead>
                      <TableHead className="w-[100px] text-center text-xs font-medium py-1.5">UM</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isReadOnly ? (
                      <TableRow>
                        <TableCell colSpan={3} className="text-center py-6 text-muted-foreground">
                          No hay códigos alternos registrados
                        </TableCell>
                      </TableRow>
                    ) : (
                      <TableRow>
                        <TableCell colSpan={3} className="text-center py-6 text-muted-foreground">
                          No hay códigos alternos registrados
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
              
              {!isReadOnly && (
                <div className="flex justify-end mt-2">
                  <Button variant="destructive" size="sm" disabled={true} className="h-8 text-xs">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Eliminar
                  </Button>
                </div>
              )}
            </TabsContent>
            
            {/* Files Tab */}
            {mode !== "new" && (
              <TabsContent value="files" className="space-y-3 mt-3">
                <div className="flex items-center gap-2 mb-4">
                  <div className="border rounded flex-1 p-2 bg-muted-foreground/5">
                    Seleccionar archivo...
                  </div>
                  <Button size="icon" variant="outline" disabled={isReadOnly} className="h-8 text-xs">
                    <Search className="h-4 w-4" />
                  </Button>
                  <Button disabled={isReadOnly} className="h-8 text-xs">
                    <Upload className="mr-2 h-4 w-4" /> Subir
                  </Button>
                </div>
                
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[80px] text-xs font-medium py-1.5">Item</TableHead>
                        <TableHead className="text-xs font-medium py-1.5">Archivo</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell colSpan={2} className="text-center py-6 text-muted-foreground">
                          No hay archivos subidos
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
                
                {!isReadOnly && (
                  <div className="flex justify-end gap-2 mt-2">
                    <Button variant="outline" size="sm" disabled={true} className="h-8 text-xs">
                      <Download className="mr-2 h-4 w-4" />
                      Descargar
                    </Button>
                    <Button variant="destructive" size="sm" disabled={true} className="h-8 text-xs">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Eliminar
                    </Button>
                  </div>
                )}
              </TabsContent>
            )}
            
            {/* Related Articles Tab */}
            {mode !== "new" && (
              <TabsContent value="related" className="space-y-3 mt-3">
                {!isReadOnly && (
                  <Button className="h-8 text-xs">
                    <Plus className="mr-2 h-4 w-4" />
                    Nuevo
                  </Button>
                )}
                
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px] text-xs font-medium py-1.5">Código</TableHead>
                        <TableHead className="text-xs font-medium py-1.5">Descripción Artículo</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell colSpan={2} className="text-center py-6 text-muted-foreground">
                          No hay artículos relacionados
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
                
                {!isReadOnly && (
                  <div className="flex justify-end mt-2">
                    <Button variant="destructive" size="sm" disabled={true} className="h-8 text-xs">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Eliminar
                    </Button>
                  </div>
                )}
              </TabsContent>
            )}
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-end gap-2 py-2 px-3 border-t">
          <Button variant="outline" onClick={onClose} size="sm" className="h-8 text-xs">
            {isReadOnly ? "Cerrar" : "Cancelar"}
          </Button>
          {!isReadOnly && (
            <Button onClick={handleSubmit} size="sm" className="h-8 text-xs">
              {mode === "new" ? "Crear" : "Guardar"}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default EditArticleForm;
