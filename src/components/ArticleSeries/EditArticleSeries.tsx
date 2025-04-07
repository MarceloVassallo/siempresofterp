
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArticleSeries } from "@/types/articleSeries";
import { useToast } from "@/hooks/use-toast";

interface EditArticleSeriesProps {
  isOpen: boolean;
  onClose: () => void;
  articleSeries?: ArticleSeries;
  mode: "create" | "edit" | "view";
}

const EditArticleSeries = ({ isOpen, onClose, articleSeries, mode }: EditArticleSeriesProps) => {
  const { toast } = useToast();
  const isViewMode = mode === "view";
  const [formData, setFormData] = useState<Partial<ArticleSeries>>({});

  useEffect(() => {
    if (articleSeries) {
      setFormData(articleSeries);
    } else {
      setFormData({
        status: "Activo",
      });
    }
  }, [articleSeries]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (isViewMode) return;
    
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    if (isViewMode) return;
    
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (name: string, value: string) => {
    if (isViewMode) return;
    
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (isViewMode) {
      onClose();
      return;
    }
    
    toast({
      title: mode === "create" ? "Serie creada" : "Serie actualizada",
      description: "La operación se completó exitosamente",
    });
    
    onClose();
  };

  const getDialogTitle = () => {
    switch (mode) {
      case "create":
        return "Crear Serie";
      case "edit":
        return "Modificar Serie";
      case "view":
        return "Detalle de Serie";
      default:
        return "Serie";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{getDialogTitle()}</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="datos" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="datos">Datos</TabsTrigger>
            <TabsTrigger value="adicionales">Adicionales</TabsTrigger>
          </TabsList>
          
          <TabsContent value="datos" className="space-y-4">
            <div className="grid grid-cols-4 items-center gap-3">
              <Label htmlFor="id" className="text-right">
                ID Serie
              </Label>
              <Input
                id="id"
                name="id"
                className="col-span-3 font-bold"
                value={formData.id || ''}
                onChange={handleChange}
                readOnly={true}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-3">
              <Label htmlFor="warehouseId" className="text-right">
                Almacén
              </Label>
              <Select
                name="warehouseId"
                disabled={isViewMode}
                value={formData.warehouseId}
                onValueChange={(value) => handleSelectChange("warehouseId", value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Seleccionar almacén" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="W001">Almacén Principal</SelectItem>
                  <SelectItem value="W002">Almacén Secundario</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-3">
              <Label htmlFor="articleId" className="text-right">
                Artículo
              </Label>
              <div className="col-span-3 flex gap-2">
                <Input
                  id="articleCode"
                  name="articleCode"
                  value={formData.articleCode || ''}
                  onChange={handleChange}
                  readOnly={isViewMode}
                  className="flex-1"
                />
                <Button
                  variant="outline"
                  size="icon"
                  type="button"
                  disabled={isViewMode}
                >...</Button>
              </div>
            </div>

            {formData.articleName && (
              <div className="grid grid-cols-4 items-center gap-3">
                <div className="col-start-2 col-span-3 text-sm">
                  {formData.articleName}
                </div>
              </div>
            )}

            <div className="grid grid-cols-4 items-center gap-3">
              <Label htmlFor="status" className="text-right">
                Estado
              </Label>
              <Select
                name="status"
                disabled={isViewMode}
                value={formData.status}
                onValueChange={(value) => handleSelectChange("status", value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Seleccionar estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Activo">Activo</SelectItem>
                  <SelectItem value="Inactivo">Inactivo</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-3">
              <Label htmlFor="series1" className="text-right">
                Serie1
              </Label>
              <Input
                id="series1"
                name="series1"
                className="col-span-3"
                value={formData.series1 || ''}
                onChange={handleChange}
                readOnly={isViewMode}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-3">
              <Label htmlFor="series2" className="text-right">
                Serie2
              </Label>
              <Input
                id="series2"
                name="series2"
                className="col-span-3"
                value={formData.series2 || ''}
                onChange={handleChange}
                readOnly={isViewMode}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-3">
              <Label htmlFor="series3" className="text-right">
                Serie3
              </Label>
              <Input
                id="series3"
                name="series3"
                className="col-span-3"
                value={formData.series3 || ''}
                onChange={handleChange}
                readOnly={isViewMode}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-3">
              <Label htmlFor="year" className="text-right">
                Año
              </Label>
              <Input
                id="year"
                name="year"
                className="col-span-3"
                value={formData.year || ''}
                onChange={handleChange}
                readOnly={isViewMode}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-3">
              <Label htmlFor="color" className="text-right">
                Color
              </Label>
              <Select
                name="color"
                disabled={isViewMode}
                value={formData.color}
                onValueChange={(value) => handleSelectChange("color", value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Seleccionar color" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Blanco">Blanco</SelectItem>
                  <SelectItem value="Negro">Negro</SelectItem>
                  <SelectItem value="Rojo">Rojo</SelectItem>
                  <SelectItem value="Azul">Azul</SelectItem>
                  <SelectItem value="Plata">Plata</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-3">
              <Label htmlFor="policyNumber" className="text-right">
                Nro. Póliza
              </Label>
              <Input
                id="policyNumber"
                name="policyNumber"
                className="col-span-3"
                value={formData.policyNumber || ''}
                onChange={handleChange}
                readOnly={isViewMode}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-3">
              <Label htmlFor="cua" className="text-right">
                C.U.A
              </Label>
              <Input
                id="cua"
                name="cua"
                className="col-span-3"
                value={formData.cua || ''}
                onChange={handleChange}
                readOnly={isViewMode}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-3">
              <Label htmlFor="lotNumber" className="text-right">
                Nro. Lote
              </Label>
              <Input
                id="lotNumber"
                name="lotNumber"
                className="col-span-3"
                value={formData.lotNumber || ''}
                onChange={handleChange}
                readOnly={isViewMode}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-3">
              <Label htmlFor="expirationDate" className="text-right">
                Fecha Vencimiento
              </Label>
              <Input
                id="expirationDate"
                name="expirationDate"
                className="col-span-3"
                type="date"
                value={formData.expirationDate || ''}
                onChange={handleChange}
                readOnly={isViewMode}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-3">
              <Label htmlFor="automaticQuantity" className="text-right">
                Cantidad Automática
              </Label>
              <Input
                id="automaticQuantity"
                name="automaticQuantity"
                className="col-span-3"
                type="number"
                value={formData.automaticQuantity || ''}
                onChange={handleChange}
                readOnly={isViewMode}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-3">
              <Label htmlFor="piecesQuantity" className="text-right">
                Cantidad Piezas
              </Label>
              <Input
                id="piecesQuantity"
                name="piecesQuantity"
                className="col-span-3"
                type="number"
                value={formData.piecesQuantity || ''}
                onChange={handleChange}
                readOnly={isViewMode}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="adicionales" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="grid grid-cols-2 items-center gap-2">
                  <Label htmlFor="plate" className="text-right">
                    Placa
                  </Label>
                  <Input
                    id="plate"
                    name="plate"
                    value={formData.plate || ''}
                    onChange={handleChange}
                    readOnly={isViewMode}
                  />
                </div>

                <div className="grid grid-cols-2 items-center gap-2">
                  <Label htmlFor="category" className="text-right">
                    Categoría
                  </Label>
                  <Input
                    id="category"
                    name="category"
                    value={formData.category || ''}
                    onChange={handleChange}
                    readOnly={isViewMode}
                  />
                </div>

                <div className="grid grid-cols-2 items-center gap-2">
                  <Label htmlFor="vehicleType" className="text-right">
                    Form. Rodante
                  </Label>
                  <Input
                    id="vehicleType"
                    name="vehicleType"
                    value={formData.vehicleType || ''}
                    onChange={handleChange}
                    readOnly={isViewMode}
                  />
                </div>

                <div className="grid grid-cols-2 items-center gap-2">
                  <Label htmlFor="version" className="text-right">
                    Versión
                  </Label>
                  <Input
                    id="version"
                    name="version"
                    value={formData.version || ''}
                    onChange={handleChange}
                    readOnly={isViewMode}
                  />
                </div>

                <div className="grid grid-cols-2 items-center gap-2">
                  <Label htmlFor="axes" className="text-right">
                    Ejes
                  </Label>
                  <Input
                    id="axes"
                    name="axes"
                    value={formData.axes || ''}
                    onChange={handleChange}
                    readOnly={isViewMode}
                  />
                </div>

                <div className="grid grid-cols-2 items-center gap-2">
                  <Label htmlFor="seats" className="text-right">
                    Asientos
                  </Label>
                  <Input
                    id="seats"
                    name="seats"
                    value={formData.seats || ''}
                    onChange={handleChange}
                    readOnly={isViewMode}
                  />
                </div>

                <div className="grid grid-cols-2 items-center gap-2">
                  <Label htmlFor="passengers" className="text-right">
                    Pasajeros
                  </Label>
                  <Input
                    id="passengers"
                    name="passengers"
                    value={formData.passengers || ''}
                    onChange={handleChange}
                    readOnly={isViewMode}
                  />
                </div>

                <div className="grid grid-cols-2 items-center gap-2">
                  <Label htmlFor="wheels" className="text-right">
                    Ruedas
                  </Label>
                  <Input
                    id="wheels"
                    name="wheels"
                    value={formData.wheels || ''}
                    onChange={handleChange}
                    readOnly={isViewMode}
                  />
                </div>

                <div className="grid grid-cols-2 items-center gap-2">
                  <Label htmlFor="height" className="text-right">
                    Altura
                  </Label>
                  <Input
                    id="height"
                    name="height"
                    value={formData.height || ''}
                    onChange={handleChange}
                    readOnly={isViewMode}
                  />
                </div>

                <div className="grid grid-cols-2 items-center gap-2">
                  <Label htmlFor="modelYear" className="text-right">
                    Año Modelo
                  </Label>
                  <Input
                    id="modelYear"
                    name="modelYear"
                    value={formData.modelYear || ''}
                    onChange={handleChange}
                    readOnly={isViewMode}
                  />
                </div>

                <div className="grid grid-cols-2 items-center gap-2">
                  <Label htmlFor="brand" className="text-right">
                    Marca
                  </Label>
                  <Input
                    id="brand"
                    name="brand"
                    value={formData.brand || ''}
                    onChange={handleChange}
                    readOnly={isViewMode}
                  />
                </div>

                <div className="grid grid-cols-2 items-center gap-2">
                  <Label htmlFor="traction" className="text-right">
                    Tracción
                  </Label>
                  <Input
                    id="traction"
                    name="traction"
                    value={formData.traction || ''}
                    onChange={handleChange}
                    readOnly={isViewMode}
                  />
                </div>

                <div className="grid grid-cols-2 items-center gap-2">
                  <Label htmlFor="doors" className="text-right">
                    Puerta
                  </Label>
                  <Input
                    id="doors"
                    name="doors"
                    value={formData.doors || ''}
                    onChange={handleChange}
                    readOnly={isViewMode}
                  />
                </div>

                <div className="grid grid-cols-2 items-center gap-2">
                  <Label htmlFor="fuelType" className="text-right">
                    Combustible
                  </Label>
                  <Input
                    id="fuelType"
                    name="fuelType"
                    value={formData.fuelType || ''}
                    onChange={handleChange}
                    readOnly={isViewMode}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 items-center gap-2">
                  <Label htmlFor="bodywork" className="text-right">
                    Carrocería
                  </Label>
                  <Input
                    id="bodywork"
                    name="bodywork"
                    value={formData.bodywork || ''}
                    onChange={handleChange}
                    readOnly={isViewMode}
                  />
                </div>

                <div className="grid grid-cols-2 items-center gap-2">
                  <Label htmlFor="power" className="text-right">
                    Potencia
                  </Label>
                  <Input
                    id="power"
                    name="power"
                    value={formData.power || ''}
                    onChange={handleChange}
                    readOnly={isViewMode}
                  />
                </div>

                <div className="grid grid-cols-2 items-center gap-2">
                  <Label htmlFor="cylinders" className="text-right">
                    Cilindros
                  </Label>
                  <Input
                    id="cylinders"
                    name="cylinders"
                    value={formData.cylinders || ''}
                    onChange={handleChange}
                    readOnly={isViewMode}
                  />
                </div>

                <div className="grid grid-cols-2 items-center gap-2">
                  <Label htmlFor="displacement" className="text-right">
                    Cilindrada
                  </Label>
                  <Input
                    id="displacement"
                    name="displacement"
                    value={formData.displacement || ''}
                    onChange={handleChange}
                    readOnly={isViewMode}
                  />
                </div>

                <div className="grid grid-cols-2 items-center gap-2">
                  <Label htmlFor="grossWeight" className="text-right">
                    Peso Bruto
                  </Label>
                  <Input
                    id="grossWeight"
                    name="grossWeight"
                    value={formData.grossWeight || ''}
                    onChange={handleChange}
                    readOnly={isViewMode}
                  />
                </div>

                <div className="grid grid-cols-2 items-center gap-2">
                  <Label htmlFor="netWeight" className="text-right">
                    Peso Neto
                  </Label>
                  <Input
                    id="netWeight"
                    name="netWeight"
                    value={formData.netWeight || ''}
                    onChange={handleChange}
                    readOnly={isViewMode}
                  />
                </div>

                <div className="grid grid-cols-2 items-center gap-2">
                  <Label htmlFor="loadCapacity" className="text-right">
                    Carga Útil
                  </Label>
                  <Input
                    id="loadCapacity"
                    name="loadCapacity"
                    value={formData.loadCapacity || ''}
                    onChange={handleChange}
                    readOnly={isViewMode}
                  />
                </div>

                <div className="grid grid-cols-2 items-center gap-2">
                  <Label htmlFor="length" className="text-right">
                    Longitud
                  </Label>
                  <Input
                    id="length"
                    name="length"
                    value={formData.length || ''}
                    onChange={handleChange}
                    readOnly={isViewMode}
                  />
                </div>

                <div className="grid grid-cols-2 items-center gap-2">
                  <Label htmlFor="width" className="text-right">
                    Ancho
                  </Label>
                  <Input
                    id="width"
                    name="width"
                    value={formData.width || ''}
                    onChange={handleChange}
                    readOnly={isViewMode}
                  />
                </div>

                <div className="grid grid-cols-2 items-center gap-2">
                  <Label htmlFor="transmission" className="text-right">
                    Transmisión
                  </Label>
                  <Input
                    id="transmission"
                    name="transmission"
                    value={formData.transmission || ''}
                    onChange={handleChange}
                    readOnly={isViewMode}
                  />
                </div>

                <div className="grid grid-cols-2 items-center gap-2">
                  <Label htmlFor="tireType" className="text-right">
                    Tipo Neumático
                  </Label>
                  <Input
                    id="tireType"
                    name="tireType"
                    value={formData.tireType || ''}
                    onChange={handleChange}
                    readOnly={isViewMode}
                  />
                </div>

                <div className="grid grid-cols-2 items-center gap-2">
                  <Label htmlFor="axesDistance" className="text-right">
                    Dist Ejes
                  </Label>
                  <Input
                    id="axesDistance"
                    name="axesDistance"
                    value={formData.axesDistance || ''}
                    onChange={handleChange}
                    readOnly={isViewMode}
                  />
                </div>

                <div className="grid grid-cols-2 items-center gap-2">
                  <Label htmlFor="model" className="text-right">
                    Modelo
                  </Label>
                  <Input
                    id="model"
                    name="model"
                    value={formData.model || ''}
                    onChange={handleChange}
                    readOnly={isViewMode}
                  />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            {isViewMode ? "Cerrar" : "Cancelar"}
          </Button>
          <Button onClick={handleSubmit}>
            {isViewMode ? "Cerrar" : "Aceptar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditArticleSeries;
