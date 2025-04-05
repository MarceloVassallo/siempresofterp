import { useState } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ItemWarehouse, defaultItemWarehouse } from "@/types/itemWarehouse";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

const ItemWarehouseForm = () => {
  const [item, setItem] = useState<ItemWarehouse>(defaultItemWarehouse);

  // Mock data for dropdowns
  const warehouses = [
    { value: "ALM01", label: "Almacén Principal" },
    { value: "ALM02", label: "Almacén Secundario" },
  ];

  const igvAffectationCodes = [
    { value: "10", label: "Gravado - Operación Onerosa" },
    { value: "20", label: "Exonerado - Operación Onerosa" },
    { value: "30", label: "Inafecto - Operación Onerosa" },
  ];

  const igvRates = [
    { value: "18", label: "18%" },
    { value: "10", label: "10%" },
  ];

  const iscTypes = [
    { value: "01", label: "Sistema al Valor" },
    { value: "02", label: "Sistema Específico" },
    { value: "03", label: "Sistema al Valor según Precio de Venta al Público" },
  ];

  const unitMeasures = [
    { value: "NIU", label: "Unidad (NIU)" },
    { value: "KGM", label: "Kilogramo (KGM)" },
    { value: "LTR", label: "Litro (LTR)" },
  ];

  const form = useForm<ItemWarehouse>({
    defaultValues: defaultItemWarehouse,
  });

  const { watch, setValue } = form;

  // Watch for checkbox changes to enable/disable related fields
  const affectedByISC = watch("affectedByISC");
  const affectedByPerception = watch("affectedByPerception");
  const affectedByDetraction = watch("affectedByDetraction");

  const handleSubmit = (data: ItemWarehouse) => {
    console.log("Form submitted:", data);
    toast.success("Asignación de artículo actualizada con éxito");
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Código</FormLabel>
                    <FormControl>
                      <Input {...field} readOnly />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="unitMeasure"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unidad de Medida</FormLabel>
                    <FormControl>
                      <Input {...field} readOnly />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Input {...field} readOnly />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="warehouse"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Almacén</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un almacén" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {warehouses.map((warehouse) => (
                        <SelectItem
                          key={warehouse.value}
                          value={warehouse.value}
                        >
                          {warehouse.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Tabs defaultValue="taxes" className="w-full">
              <TabsList className="grid grid-cols-3">
                <TabsTrigger value="taxes">Impuestos</TabsTrigger>
                <TabsTrigger value="inventory">Control de Inventario</TabsTrigger>
                <TabsTrigger value="others">Otros Datos</TabsTrigger>
              </TabsList>

              {/* Taxes Tab */}
              <TabsContent value="taxes" className="space-y-4 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="affectedByIGV"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Afecto a IGV</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="affectedByIVAP"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Afecto a IVAP</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="igvAffectationCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Afectación IGV</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccione" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {igvAffectationCodes.map((code) => (
                              <SelectItem key={code.value} value={code.value}>
                                {code.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="igvRate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tasa IGV</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccione" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {igvRates.map((rate) => (
                              <SelectItem key={rate.value} value={rate.value}>
                                {rate.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="affectedByISC"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Afecto a ISC</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />

                {affectedByISC && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="iscType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tipo ISC</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Seleccione" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {iscTypes.map((type) => (
                                <SelectItem key={type.value} value={type.value}>
                                  {type.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="iscPercentage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Porcentaje</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="iscUnitMeasure"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>UM ISC</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Seleccione" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {unitMeasures.map((um) => (
                                <SelectItem key={um.value} value={um.value}>
                                  {um.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <FormField
                      control={form.control}
                      name="affectedByICBPER"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Afecto a ICBPER</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <FormField
                      control={form.control}
                      name="affectedByPerception"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Afecto a Percepción</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>

                  {affectedByPerception && (
                    <div>
                      <FormField
                        control={form.control}
                        name="perceptionPercentage"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Porcentaje</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <FormField
                      control={form.control}
                      name="affectedByDetraction"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Afecto a Detracción</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>

                  {affectedByDetraction && (
                    <>
                      <FormField
                        control={form.control}
                        name="detractionCode"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center gap-2">
                            <FormControl>
                              <Input {...field} className="w-24" placeholder="Código" />
                            </FormControl>
                            <Button 
                              type="button" 
                              variant="outline" 
                              className="h-10 w-10 p-0"
                              onClick={() => console.log("Buscar detracción")}
                            >
                              ...
                            </Button>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="detractionPercentage"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Detracción (%)</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </>
                  )}
                </div>
              </TabsContent>

              {/* Inventory Control Tab */}
              <TabsContent value="inventory" className="space-y-4 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="reorderPoint"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Punto de Reorden</FormLabel>
                        <FormControl>
                          <Input {...field} type="number" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="safetyStock"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Stock Seguridad</FormLabel>
                        <FormControl>
                          <Input {...field} type="number" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="minimumStock"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Stock Mínimo</FormLabel>
                        <FormControl>
                          <Input {...field} type="number" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="maximumStock"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Stock Máximo</FormLabel>
                        <FormControl>
                          <Input {...field} type="number" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>

              {/* Others Tab */}
              <TabsContent value="others" className="space-y-4 pt-4">
                <div className="flex items-end gap-2">
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Código de Ubicación</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="h-10 w-10 p-0"
                    onClick={() => console.log("Buscar ubicación")}
                  >
                    ...
                  </Button>
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex justify-end gap-2">
              <Button variant="outline" type="button" onClick={() => form.reset()}>
                Cancelar
              </Button>
              <Button type="submit">Aceptar</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ItemWarehouseForm;
