
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Commission, defaultCommission } from "@/types/commission";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Search } from "lucide-react";

export default function CommissionForm() {
  const [commission, setCommission] = useState<Commission>({ ...defaultCommission });
  const [detractionDescription, setDetractionDescription] = useState("");

  // Sample data for dropdowns
  const warehouses = [
    { value: "ALM001", label: "Almacén Principal" },
    { value: "ALM002", label: "Almacén Secundario" },
    { value: "ALM003", label: "Almacén de Tránsito" }
  ];

  const igvAffectationCodes = [
    { value: "10", label: "Gravado - Operación Onerosa" },
    { value: "20", label: "Exonerado - Operación Onerosa" },
    { value: "30", label: "Inafecto - Operación Onerosa" },
    { value: "40", label: "Exportación" }
  ];

  const igvRates = [
    { value: "18", label: "18%" },
    { value: "10", label: "10%" }
  ];

  const iscTypes = [
    { value: "01", label: "Sistema al Valor" },
    { value: "02", label: "Aplicación Específica" },
    { value: "03", label: "Sistema de Precio de Venta al Público" }
  ];

  const unitMeasures = [
    { value: "UND", label: "Unidad" },
    { value: "KG", label: "Kilogramo" },
    { value: "LT", label: "Litro" },
    { value: "MT", label: "Metro" }
  ];

  // Handle form changes
  const handleChange = (fieldName: keyof Commission, value: string | boolean) => {
    setCommission(prev => ({
      ...prev,
      [fieldName]: value
    }));
  };

  // Handle checkbox changes
  const handleCheckboxChange = (fieldName: keyof Commission) => {
    setCommission(prev => ({
      ...prev,
      [fieldName]: !prev[fieldName]
    }));
  };

  // Search detraction code
  const searchDetractionCode = () => {
    // Simulating a search with a timeout
    toast.info("Buscando código de detracción...");
    setTimeout(() => {
      if (commission.detractionCode) {
        setDetractionDescription("Servicio de transporte de carga");
        toast.success("Código de detracción encontrado");
      } else {
        setDetractionDescription("");
        toast.error("Ingrese un código válido");
      }
    }, 1000);
  };

  // Search location code
  const searchLocationCode = () => {
    toast.info("Buscando código de ubicación...");
    setTimeout(() => {
      if (commission.location) {
        toast.success("Ubicación encontrada");
      } else {
        toast.error("Ingrese un código válido");
      }
    }, 1000);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Comisión guardada correctamente");
    console.log("Form submitted:", commission);
  };

  return (
    <form onSubmit={handleSubmit} className="container mx-auto p-4 max-w-4xl">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Editar Comisión</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <Label htmlFor="code">Código</Label>
              <Input
                id="code"
                value={commission.code}
                onChange={(e) => handleChange("code", e.target.value)}
                readOnly
                className="bg-gray-100"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="unitMeasure">Unidad de Medida</Label>
              <Input
                id="unitMeasure"
                value={commission.unitMeasure}
                onChange={(e) => handleChange("unitMeasure", e.target.value)}
                readOnly
                className="bg-gray-100"
              />
            </div>
          </div>

          <div className="space-y-2 mb-4">
            <Label htmlFor="description">Descripción</Label>
            <Input
              id="description"
              value={commission.description}
              onChange={(e) => handleChange("description", e.target.value)}
              readOnly
              className="bg-gray-100"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="warehouse">Almacén</Label>
            <Select 
              onValueChange={(value) => handleChange("warehouse", value)}
              defaultValue={commission.warehouse}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Seleccione un almacén" />
              </SelectTrigger>
              <SelectContent>
                {warehouses.map(warehouse => (
                  <SelectItem key={warehouse.value} value={warehouse.value}>
                    {warehouse.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="taxes" className="mb-6">
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="taxes">Impuestos</TabsTrigger>
          <TabsTrigger value="inventory">Control de Inventario</TabsTrigger>
        </TabsList>
        
        <TabsContent value="taxes">
          <Card>
            <CardHeader>
              <CardTitle>Configuración de Impuestos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* IGV Section */}
              <div className="space-y-4">
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="affectedByIGV"
                      checked={commission.affectedByIGV}
                      onCheckedChange={() => handleCheckboxChange("affectedByIGV")}
                    />
                    <Label htmlFor="affectedByIGV">Afecto a IGV</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="affectedByIVAP"
                      checked={commission.affectedByIVAP}
                      onCheckedChange={() => handleCheckboxChange("affectedByIVAP")}
                    />
                    <Label htmlFor="affectedByIVAP">Afecto a IVAP</Label>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="igvAffectationCode">Afectación IGV</Label>
                    <Select 
                      onValueChange={(value) => handleChange("igvAffectationCode", value)}
                      defaultValue={commission.igvAffectationCode}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione afectación" />
                      </SelectTrigger>
                      <SelectContent>
                        {igvAffectationCodes.map(code => (
                          <SelectItem key={code.value} value={code.value}>
                            {code.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="igvRate">Tasa IGV</Label>
                    <Select 
                      onValueChange={(value) => handleChange("igvRate", value)}
                      defaultValue={commission.igvRate}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione tasa" />
                      </SelectTrigger>
                      <SelectContent>
                        {igvRates.map(rate => (
                          <SelectItem key={rate.value} value={rate.value}>
                            {rate.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Separator />

              {/* ISC Section */}
              <div className="space-y-4">
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="affectedByISC" 
                      checked={commission.affectedByISC}
                      onCheckedChange={() => handleCheckboxChange("affectedByISC")}
                    />
                    <Label htmlFor="affectedByISC">Afecto a ISC</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="affectedByICBPER"
                      checked={commission.affectedByICBPER}
                      onCheckedChange={() => handleCheckboxChange("affectedByICBPER")}
                    />
                    <Label htmlFor="affectedByICBPER">Afecto a ICBPER</Label>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="iscType">Tipo ISC</Label>
                    <Select 
                      onValueChange={(value) => handleChange("iscType", value)}
                      defaultValue={commission.iscType}
                      disabled={!commission.affectedByISC}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione tipo ISC" />
                      </SelectTrigger>
                      <SelectContent>
                        {iscTypes.map(type => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="iscUnitMeasure">UM ISC</Label>
                    <Select 
                      onValueChange={(value) => handleChange("iscUnitMeasure", value)}
                      defaultValue={commission.iscUnitMeasure}
                      disabled={!commission.affectedByISC}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione UM" />
                      </SelectTrigger>
                      <SelectContent>
                        {unitMeasures.map(unit => (
                          <SelectItem key={unit.value} value={unit.value}>
                            {unit.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="iscPercentage">Porcentaje ISC</Label>
                  <Input
                    id="iscPercentage"
                    type="text"
                    value={commission.iscPercentage}
                    onChange={(e) => handleChange("iscPercentage", e.target.value)}
                    disabled={!commission.affectedByISC}
                    className="text-right"
                  />
                </div>
              </div>

              <Separator />

              {/* Perception Section */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="affectedByPerception"
                    checked={commission.affectedByPerception}
                    onCheckedChange={() => handleCheckboxChange("affectedByPerception")}
                  />
                  <Label htmlFor="affectedByPerception">Afecto a Percepción</Label>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="perceptionPercentage">Porcentaje Percepción</Label>
                  <Input
                    id="perceptionPercentage"
                    type="text"
                    value={commission.perceptionPercentage}
                    onChange={(e) => handleChange("perceptionPercentage", e.target.value)}
                    disabled={!commission.affectedByPerception}
                    className="text-right"
                  />
                </div>
              </div>

              <Separator />

              {/* Detraction Section */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="affectedByDetraction"
                    checked={commission.affectedByDetraction}
                    onCheckedChange={() => handleCheckboxChange("affectedByDetraction")}
                  />
                  <Label htmlFor="affectedByDetraction">Afecto a Detracción</Label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="detractionCode">Detracción (%)</Label>
                    <div className="flex gap-2">
                      <Input
                        id="detractionCode"
                        value={commission.detractionCode}
                        onChange={(e) => handleChange("detractionCode", e.target.value)}
                        disabled={!commission.affectedByDetraction}
                        className="w-24"
                      />
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="icon" 
                        onClick={searchDetractionCode}
                        disabled={!commission.affectedByDetraction}
                      >
                        <Search className="h-4 w-4" />
                      </Button>
                      <Input
                        id="detractionPercentage"
                        value={commission.detractionPercentage}
                        onChange={(e) => handleChange("detractionPercentage", e.target.value)}
                        disabled={!commission.affectedByDetraction}
                        className="text-right w-24"
                      />
                      {detractionDescription && (
                        <div className="text-sm text-gray-500 mt-1 ml-2">
                          {detractionDescription}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="inventory">
          <Card>
            <CardHeader>
              <CardTitle>Control de Inventario</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="reorderPoint">Punto Reorden</Label>
                  <Input
                    id="reorderPoint"
                    type="text"
                    value={commission.reorderPoint}
                    onChange={(e) => handleChange("reorderPoint", e.target.value)}
                    className="text-right"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="safetyStock">Stock Seguridad</Label>
                  <Input
                    id="safetyStock"
                    type="text"
                    value={commission.safetyStock}
                    onChange={(e) => handleChange("safetyStock", e.target.value)}
                    className="text-right"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="minimumStock">Stock Mínimo</Label>
                  <Input
                    id="minimumStock"
                    type="text"
                    value={commission.minimumStock}
                    onChange={(e) => handleChange("minimumStock", e.target.value)}
                    className="text-right"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maximumStock">Stock Máximo</Label>
                  <Input
                    id="maximumStock"
                    type="text"
                    value={commission.maximumStock}
                    onChange={(e) => handleChange("maximumStock", e.target.value)}
                    className="text-right"
                  />
                </div>
              </div>

              <div className="mt-6">
                <div className="space-y-2">
                  <Label htmlFor="location">Código de Ubicación</Label>
                  <div className="flex gap-2">
                    <Input
                      id="location"
                      value={commission.location}
                      onChange={(e) => handleChange("location", e.target.value)}
                    />
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="icon" 
                      onClick={searchLocationCode}
                    >
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-4">
        <Button variant="outline" type="button" onClick={() => toast.info("Operación cancelada")}>
          Cancelar
        </Button>
        <Button type="submit">
          Aceptar
        </Button>
      </div>
    </form>
  );
}
