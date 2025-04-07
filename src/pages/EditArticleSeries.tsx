
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate, useLocation } from "react-router-dom";
import { ArticleSeries } from "@/types/articleSeries";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const EditArticleSeriesPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("datos");
  
  // Get the mode and articleSeries from location state
  const { mode = "create", articleSeries } = location.state || {};
  const isViewOnly = mode === "view";
  
  // Initialize form state with provided article series or default values
  const [formData, setFormData] = useState<ArticleSeries>(() => {
    return articleSeries || {
      id: "",
      warehouseId: "",
      articleId: "",
      warehouseName: "",
      articleCode: "",
      articleName: "",
      series1: "",
      series2: "",
      series3: "",
      status: "Activo",
    };
  });

  const handleInputChange = (field: keyof ArticleSeries, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCancel = () => {
    navigate("/article-series");
  };

  const handleSubmit = () => {
    // In a real app, this would save to the backend
    toast({
      title: mode === "create" ? "Serie creada" : "Serie actualizada",
      description: `La serie ${formData.series1} ha sido ${mode === "create" ? "creada" : "actualizada"} exitosamente.`
    });
    
    navigate("/article-series");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">
        {mode === "create" ? "Nueva Serie de Artículo" : 
         mode === "edit" ? "Modificar Serie de Artículo" : 
         "Detalle de Serie de Artículo"}
      </h1>

      <Card>
        <CardContent className="pt-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="datos">Datos</TabsTrigger>
              <TabsTrigger value="adicionales">Adicionales</TabsTrigger>
            </TabsList>
            
            <TabsContent value="datos" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="idSerie">ID Serie</Label>
                  <Input 
                    id="idSerie" 
                    value={formData.id} 
                    onChange={(e) => handleInputChange("id", e.target.value)}
                    disabled={isViewOnly || mode === "edit"}
                    className="bg-gray-50"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="warehouse">Almacén</Label>
                  <Select 
                    value={formData.warehouseId} 
                    onValueChange={(value) => handleInputChange("warehouseId", value)}
                    disabled={isViewOnly}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar almacén" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="W001">Almacén Principal</SelectItem>
                      <SelectItem value="W002">Almacén Secundario</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="article">Artículo</Label>
                  <div className="flex gap-2">
                    <Input 
                      id="article" 
                      value={formData.articleCode} 
                      onChange={(e) => handleInputChange("articleCode", e.target.value)}
                      disabled={isViewOnly}
                      className="flex-1"
                    />
                    <Button variant="outline" size="icon" disabled={isViewOnly}>...</Button>
                  </div>
                  <p className="text-sm text-gray-500">{formData.articleName}</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Estado</Label>
                  <Select 
                    value={formData.status} 
                    onValueChange={(value) => handleInputChange("status", value)}
                    disabled={isViewOnly}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Activo">Activo</SelectItem>
                      <SelectItem value="Inactivo">Inactivo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="series1">Serie 1</Label>
                  <Input 
                    id="series1" 
                    value={formData.series1 || ''} 
                    onChange={(e) => handleInputChange("series1", e.target.value)}
                    disabled={isViewOnly}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="series2">Serie 2</Label>
                  <Input 
                    id="series2" 
                    value={formData.series2 || ''} 
                    onChange={(e) => handleInputChange("series2", e.target.value)}
                    disabled={isViewOnly}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="series3">Serie 3</Label>
                  <Input 
                    id="series3" 
                    value={formData.series3 || ''} 
                    onChange={(e) => handleInputChange("series3", e.target.value)}
                    disabled={isViewOnly}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="year">Año</Label>
                  <Input 
                    id="year" 
                    value={formData.year || ''} 
                    onChange={(e) => handleInputChange("year", e.target.value)}
                    disabled={isViewOnly}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="color">Color</Label>
                  <Select 
                    value={formData.color || ''} 
                    onValueChange={(value) => handleInputChange("color", value)}
                    disabled={isViewOnly}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar color" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Blanco">Blanco</SelectItem>
                      <SelectItem value="Negro">Negro</SelectItem>
                      <SelectItem value="Rojo">Rojo</SelectItem>
                      <SelectItem value="Azul">Azul</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="policyNumber">Nro. Póliza</Label>
                  <Input 
                    id="policyNumber" 
                    value={formData.policyNumber || ''} 
                    onChange={(e) => handleInputChange("policyNumber", e.target.value)}
                    disabled={isViewOnly}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cua">C.U.A</Label>
                  <Input 
                    id="cua" 
                    value={formData.cua || ''} 
                    onChange={(e) => handleInputChange("cua", e.target.value)}
                    disabled={isViewOnly}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lotNumber">Nro. Lote</Label>
                  <Input 
                    id="lotNumber" 
                    value={formData.lotNumber || ''} 
                    onChange={(e) => handleInputChange("lotNumber", e.target.value)}
                    disabled={isViewOnly}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="expirationDate">Fecha Vencimiento</Label>
                  <Input 
                    id="expirationDate" 
                    type="date" 
                    value={formData.expirationDate || ''} 
                    onChange={(e) => handleInputChange("expirationDate", e.target.value)}
                    disabled={isViewOnly}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="automaticQuantity">Cantidad Automática</Label>
                  <Input 
                    id="automaticQuantity" 
                    value={formData.automaticQuantity || ''} 
                    onChange={(e) => handleInputChange("automaticQuantity", e.target.value)}
                    disabled={isViewOnly}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="piecesQuantity">Cantidad Piezas</Label>
                  <Input 
                    id="piecesQuantity" 
                    value={formData.piecesQuantity || ''} 
                    onChange={(e) => handleInputChange("piecesQuantity", e.target.value)}
                    disabled={isViewOnly}
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="adicionales" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="plate">Placa</Label>
                  <Input 
                    id="plate" 
                    value={formData.plate || ''} 
                    onChange={(e) => handleInputChange("plate", e.target.value)}
                    disabled={isViewOnly}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Categoría</Label>
                  <Input 
                    id="category" 
                    value={formData.category || ''} 
                    onChange={(e) => handleInputChange("category", e.target.value)}
                    disabled={isViewOnly}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="vehicleType">Form. Rodante</Label>
                  <Input 
                    id="vehicleType" 
                    value={formData.vehicleType || ''} 
                    onChange={(e) => handleInputChange("vehicleType", e.target.value)}
                    disabled={isViewOnly}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="version">Versión</Label>
                  <Input 
                    id="version" 
                    value={formData.version || ''} 
                    onChange={(e) => handleInputChange("version", e.target.value)}
                    disabled={isViewOnly}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="axes">Ejes</Label>
                  <Input 
                    id="axes" 
                    value={formData.axes || ''} 
                    onChange={(e) => handleInputChange("axes", e.target.value)}
                    disabled={isViewOnly}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="seats">Asientos</Label>
                  <Input 
                    id="seats" 
                    value={formData.seats || ''} 
                    onChange={(e) => handleInputChange("seats", e.target.value)}
                    disabled={isViewOnly}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bodywork">Carrocería</Label>
                  <Input 
                    id="bodywork" 
                    value={formData.bodywork || ''} 
                    onChange={(e) => handleInputChange("bodywork", e.target.value)}
                    disabled={isViewOnly}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="power">Potencia</Label>
                  <Input 
                    id="power" 
                    value={formData.power || ''} 
                    onChange={(e) => handleInputChange("power", e.target.value)}
                    disabled={isViewOnly}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cylinders">Cilindros</Label>
                  <Input 
                    id="cylinders" 
                    value={formData.cylinders || ''} 
                    onChange={(e) => handleInputChange("cylinders", e.target.value)}
                    disabled={isViewOnly}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="displacement">Cilindrada</Label>
                  <Input 
                    id="displacement" 
                    value={formData.displacement || ''} 
                    onChange={(e) => handleInputChange("displacement", e.target.value)}
                    disabled={isViewOnly}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="grossWeight">Peso Bruto</Label>
                  <Input 
                    id="grossWeight" 
                    value={formData.grossWeight || ''} 
                    onChange={(e) => handleInputChange("grossWeight", e.target.value)}
                    disabled={isViewOnly}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="netWeight">Peso Neto</Label>
                  <Input 
                    id="netWeight" 
                    value={formData.netWeight || ''} 
                    onChange={(e) => handleInputChange("netWeight", e.target.value)}
                    disabled={isViewOnly}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="loadCapacity">Carga Útil</Label>
                  <Input 
                    id="loadCapacity" 
                    value={formData.loadCapacity || ''} 
                    onChange={(e) => handleInputChange("loadCapacity", e.target.value)}
                    disabled={isViewOnly}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="passengers">Pasajeros</Label>
                  <Input 
                    id="passengers" 
                    value={formData.passengers || ''} 
                    onChange={(e) => handleInputChange("passengers", e.target.value)}
                    disabled={isViewOnly}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="wheels">Ruedas</Label>
                  <Input 
                    id="wheels" 
                    value={formData.wheels || ''} 
                    onChange={(e) => handleInputChange("wheels", e.target.value)}
                    disabled={isViewOnly}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="length">Longitud</Label>
                  <Input 
                    id="length" 
                    value={formData.length || ''} 
                    onChange={(e) => handleInputChange("length", e.target.value)}
                    disabled={isViewOnly}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="width">Ancho</Label>
                  <Input 
                    id="width" 
                    value={formData.width || ''} 
                    onChange={(e) => handleInputChange("width", e.target.value)}
                    disabled={isViewOnly}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="height">Altura</Label>
                  <Input 
                    id="height" 
                    value={formData.height || ''} 
                    onChange={(e) => handleInputChange("height", e.target.value)}
                    disabled={isViewOnly}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="modelYear">Año Modelo</Label>
                  <Input 
                    id="modelYear" 
                    value={formData.modelYear || ''} 
                    onChange={(e) => handleInputChange("modelYear", e.target.value)}
                    disabled={isViewOnly}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="transmission">Transmisión</Label>
                  <Input 
                    id="transmission" 
                    value={formData.transmission || ''} 
                    onChange={(e) => handleInputChange("transmission", e.target.value)}
                    disabled={isViewOnly}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="brand">Marca</Label>
                  <Input 
                    id="brand" 
                    value={formData.brand || ''} 
                    onChange={(e) => handleInputChange("brand", e.target.value)}
                    disabled={isViewOnly}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tireType">Tipo Neumático</Label>
                  <Input 
                    id="tireType" 
                    value={formData.tireType || ''} 
                    onChange={(e) => handleInputChange("tireType", e.target.value)}
                    disabled={isViewOnly}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="traction">Tracción</Label>
                  <Input 
                    id="traction" 
                    value={formData.traction || ''} 
                    onChange={(e) => handleInputChange("traction", e.target.value)}
                    disabled={isViewOnly}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="axesDistance">Dist Ejes</Label>
                  <Input 
                    id="axesDistance" 
                    value={formData.axesDistance || ''} 
                    onChange={(e) => handleInputChange("axesDistance", e.target.value)}
                    disabled={isViewOnly}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="doors">Puertas</Label>
                  <Input 
                    id="doors" 
                    value={formData.doors || ''} 
                    onChange={(e) => handleInputChange("doors", e.target.value)}
                    disabled={isViewOnly}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="model">Modelo</Label>
                  <Input 
                    id="model" 
                    value={formData.model || ''} 
                    onChange={(e) => handleInputChange("model", e.target.value)}
                    disabled={isViewOnly}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fuelType">Combustible</Label>
                  <Input 
                    id="fuelType" 
                    value={formData.fuelType || ''} 
                    onChange={(e) => handleInputChange("fuelType", e.target.value)}
                    disabled={isViewOnly}
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-2 mt-6">
            <Button variant="outline" onClick={handleCancel}>
              Cancelar
            </Button>
            {!isViewOnly && (
              <Button onClick={handleSubmit}>
                {mode === "create" ? "Crear" : "Guardar"}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditArticleSeriesPage;
