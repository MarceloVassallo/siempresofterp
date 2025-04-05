
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
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>
            {mode === "new" ? "Nuevo Artículo" : mode === "edit" ? "Modificar Artículo" : "Detalle de Artículo"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid grid-cols-5 md:grid-cols-7">
              <TabsTrigger value="general">Información General</TabsTrigger>
              <TabsTrigger value="inventory">Inventario</TabsTrigger>
              <TabsTrigger value="pricing">Precios</TabsTrigger>
              <TabsTrigger value="categories">Categorías</TabsTrigger>
              <TabsTrigger value="alternates">Códigos Alternos</TabsTrigger>
              {mode !== "new" && <TabsTrigger value="files">Archivos</TabsTrigger>}
              {mode !== "new" && <TabsTrigger value="related">Relacionados</TabsTrigger>}
            </TabsList>
            
            {/* General Information Tab */}
            <TabsContent value="general" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="code">Código</Label>
                  <Input
                    id="code"
                    value={formData.code}
                    onChange={(e) => handleChange("code", e.target.value)}
                    readOnly={isReadOnly || mode === "edit"}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="alternateCode">Código Alterno</Label>
                  <Input
                    id="alternateCode"
                    value={formData.alternateCode || ""}
                    onChange={(e) => handleChange("alternateCode", e.target.value)}
                    readOnly={isReadOnly}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  readOnly={isReadOnly}
                  className="min-h-[80px]"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="partNumber">Número de Parte</Label>
                  <Input
                    id="partNumber"
                    value={formData.partNumber || ""}
                    onChange={(e) => handleChange("partNumber", e.target.value)}
                    readOnly={isReadOnly}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="crossReference">Referencia Cruzada</Label>
                  <Input
                    id="crossReference"
                    value={formData.crossReference || ""}
                    onChange={(e) => handleChange("crossReference", e.target.value)}
                    readOnly={isReadOnly}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="storage">Almacenamiento</Label>
                  <Select 
                    disabled={isReadOnly}
                    value={formData.storage || ""}
                    onValueChange={(value) => handleChange("storage", value)}
                  >
                    <SelectTrigger id="storage">
                      <SelectValue placeholder="Seleccione almacenamiento" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Almacén Principal">Almacén Principal</SelectItem>
                      <SelectItem value="Almacén Secundario">Almacén Secundario</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="status">Estado</Label>
                  <Select 
                    disabled={isReadOnly}
                    value={formData.status || "Activo"}
                    onValueChange={(value) => handleChange("status", value)}
                  >
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Seleccione estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Activo">Activo</SelectItem>
                      <SelectItem value="Inactivo">Inactivo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="brand">Marca</Label>
                  <Select 
                    disabled={isReadOnly}
                    value={formData.brand || ""}
                    onValueChange={(value) => handleChange("brand", value)}
                  >
                    <SelectTrigger id="brand">
                      <SelectValue placeholder="Seleccione marca" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="FIXALL">FIXALL</SelectItem>
                      <SelectItem value="ANCLAFLEX">ANCLAFLEX</SelectItem>
                      <SelectItem value="SELLOTAPE">SELLOTAPE</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="barcode">Código de Barras</Label>
                  <div className="flex gap-2">
                    <Input
                      id="barcode"
                      value={formData.barcode || ""}
                      onChange={(e) => handleChange("barcode", e.target.value)}
                      readOnly={isReadOnly}
                      className="flex-1"
                    />
                    {!isReadOnly && (
                      <Button variant="outline" className="w-auto px-3">
                        Generar
                      </Button>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="supplier">Proveedor</Label>
                <div className="flex gap-2">
                  <Input
                    id="supplier"
                    className="flex-1"
                    value={formData.supplier || ""}
                    onChange={(e) => handleChange("supplier", e.target.value)}
                    readOnly={isReadOnly}
                  />
                  {!isReadOnly && (
                    <Button variant="outline" className="w-12">
                      <Search className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
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
            <TabsContent value="inventory" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="minStock">Stock Mínimo</Label>
                  <Input
                    id="minStock"
                    type="number"
                    placeholder="0"
                    readOnly={isReadOnly}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="maxStock">Stock Máximo</Label>
                  <Input
                    id="maxStock"
                    type="number"
                    placeholder="0"
                    readOnly={isReadOnly}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="reorderPoint">Punto de Reorden</Label>
                  <Input
                    id="reorderPoint"
                    type="number"
                    placeholder="0"
                    readOnly={isReadOnly}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="safetyStock">Stock de Seguridad</Label>
                  <Input
                    id="safetyStock"
                    type="number"
                    placeholder="0"
                    readOnly={isReadOnly}
                  />
                </div>
              </div>
              
              <div className="mt-4 space-y-4">
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
            <TabsContent value="pricing" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cost">Costo</Label>
                  <Input
                    id="cost"
                    type="number"
                    placeholder="0.00"
                    readOnly={isReadOnly}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="price">Precio Venta</Label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="0.00"
                    readOnly={isReadOnly}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="currency">Moneda</Label>
                  <Select disabled={isReadOnly}>
                    <SelectTrigger id="currency">
                      <SelectValue placeholder="Seleccione moneda" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PEN">Soles (PEN)</SelectItem>
                      <SelectItem value="USD">Dólares (USD)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="categoryAccount">Categoría Contable</Label>
                  <Select 
                    value={formData.categoryAccount || ""}
                    onValueChange={(value) => handleChange("categoryAccount", value)}
                    disabled={isReadOnly}
                  >
                    <SelectTrigger id="categoryAccount">
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
              
              <div className="mt-4 space-y-2">
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
            <TabsContent value="categories" className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cat1">Categoría 1 (Reparto)</Label>
                  <Select disabled={isReadOnly}>
                    <SelectTrigger id="cat1">
                      <SelectValue placeholder="Seleccione categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cat1-a">Categoría 1A</SelectItem>
                      <SelectItem value="cat1-b">Categoría 1B</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="cat2">Categoría 2</Label>
                  <Select disabled={isReadOnly}>
                    <SelectTrigger id="cat2">
                      <SelectValue placeholder="Seleccione categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cat2-a">Categoría 2A</SelectItem>
                      <SelectItem value="cat2-b">Categoría 2B</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="priceGroup">Grupo Precios</Label>
                  <Select disabled={isReadOnly}>
                    <SelectTrigger id="priceGroup">
                      <SelectValue placeholder="Seleccione grupo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="price-a">Grupo A</SelectItem>
                      <SelectItem value="price-b">Grupo B</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="commissionGroup">Grupo Comisión</Label>
                  <Select disabled={isReadOnly}>
                    <SelectTrigger id="commissionGroup">
                      <SelectValue placeholder="Seleccione grupo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="comm-a">Comisión A</SelectItem>
                      <SelectItem value="comm-b">Comisión B</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="p-4 border rounded-md mt-6">
                <h3 className="font-medium mb-4">Categorías ABC</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="abcSales">Costo Ventas</Label>
                    <Input
                      id="abcSales"
                      maxLength={1}
                      placeholder="A, B o C"
                      readOnly={isReadOnly}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="abcRotation">Rotación</Label>
                    <Input
                      id="abcRotation"
                      maxLength={1}
                      placeholder="A, B o C"
                      readOnly={isReadOnly}
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {/* Alternate Codes Tab */}
            <TabsContent value="alternates" className="space-y-4">
              <div className="flex gap-2 mb-4">
                <Input 
                  placeholder="Código Alterno"
                  disabled={isReadOnly}
                  className="flex-1"
                />
                <Select disabled={isReadOnly} defaultValue="">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="UM" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Seleccionar UM</SelectItem>
                    <SelectItem value="unidad">Unidad</SelectItem>
                    <SelectItem value="kg">Kilogramo</SelectItem>
                    <SelectItem value="lt">Litro</SelectItem>
                  </SelectContent>
                </Select>
                <Button disabled={isReadOnly}>Agregar</Button>
              </div>
              
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[80px] text-center">Item</TableHead>
                      <TableHead>Código Alterno</TableHead>
                      <TableHead className="w-[100px] text-center">UM</TableHead>
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
                  <Button variant="destructive" size="sm" disabled={true}>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Eliminar
                  </Button>
                </div>
              )}
            </TabsContent>
            
            {/* Files Tab */}
            {mode !== "new" && (
              <TabsContent value="files" className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <div className="border rounded flex-1 p-2 bg-muted-foreground/5">
                    Seleccionar archivo...
                  </div>
                  <Button size="icon" variant="outline" disabled={isReadOnly}>
                    <Search className="h-4 w-4" />
                  </Button>
                  <Button disabled={isReadOnly}>
                    <Upload className="mr-2 h-4 w-4" /> Subir
                  </Button>
                </div>
                
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[80px]">Item</TableHead>
                        <TableHead>Archivo</TableHead>
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
                    <Button variant="outline" size="sm" disabled={true}>
                      <Download className="mr-2 h-4 w-4" />
                      Descargar
                    </Button>
                    <Button variant="destructive" size="sm" disabled={true}>
                      <Trash2 className="mr-2 h-4 w-4" />
                      Eliminar
                    </Button>
                  </div>
                )}
              </TabsContent>
            )}
            
            {/* Related Articles Tab */}
            {mode !== "new" && (
              <TabsContent value="related" className="space-y-4">
                {!isReadOnly && (
                  <Button className="mb-4">
                    <Plus className="mr-2 h-4 w-4" />
                    Nuevo
                  </Button>
                )}
                
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">Código</TableHead>
                        <TableHead>Descripción Artículo</TableHead>
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
                    <Button variant="destructive" size="sm" disabled={true}>
                      <Trash2 className="mr-2 h-4 w-4" />
                      Eliminar
                    </Button>
                  </div>
                )}
              </TabsContent>
            )}
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            {isReadOnly ? "Cerrar" : "Cancelar"}
          </Button>
          {!isReadOnly && (
            <Button onClick={handleSubmit}>
              {mode === "new" ? "Crear" : "Guardar"}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default EditArticleForm;
