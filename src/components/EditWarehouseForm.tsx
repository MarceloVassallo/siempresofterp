
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Warehouse, defaultWarehouse } from "@/types/warehouse";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

// Sample data for dropdowns
const companies = [
  { id: "1", name: "Empresa Principal S.A." },
  { id: "2", name: "Sucursal Norte S.A." },
];

const addresses = [
  { id: "1", name: "Calle Principal 123" },
  { id: "2", name: "Avenida Central 456" },
];

const branches = [
  { id: "1", name: "Sucursal Lima" },
  { id: "2", name: "Sucursal Arequipa" },
];

const locations = [
  { id: "1", name: "Lima" },
  { id: "2", name: "Arequipa" },
  { id: "3", name: "Trujillo" },
];

const warehouseTypes = [
  { id: "1", name: "Principal" },
  { id: "2", name: "Secundario" },
  { id: "3", name: "Tránsito" },
];

const costCenters = [
  { id: "1", name: "Centro de Costo 1" },
  { id: "2", name: "Centro de Costo 2" },
];

const formSchema = z.object({
  code: z.string().min(1, "El código es obligatorio").max(3, "Máximo 3 caracteres"),
  establishmentCode: z.string().max(4, "Máximo 4 caracteres"),
  name: z.string().min(1, "El nombre es obligatorio").max(40, "Máximo 40 caracteres"),
  companyId: z.string(),
  address: z.string(),
  otherAddress: z.string().max(80, "Máximo 80 caracteres"),
  branchId: z.string(),
  locationId: z.string().min(1, "La localidad es obligatoria"),
  warehouseType: z.string().min(1, "El tipo de almacén es obligatorio"),
  costCenterId: z.string(),
  observations: z.string().max(40, "Máximo 40 caracteres"),
  inactive: z.boolean(),
});

interface EditWarehouseFormProps {
  initialWarehouse?: Warehouse;
  onSubmit?: (data: Warehouse) => void;
  onCancel?: () => void;
}

export function EditWarehouseForm({
  initialWarehouse = defaultWarehouse,
  onSubmit,
  onCancel
}: EditWarehouseFormProps) {
  const [warehouse] = useState<Warehouse>(initialWarehouse);

  const form = useForm<Warehouse>({
    resolver: zodResolver(formSchema),
    defaultValues: warehouse,
  });

  const handleSubmit = (data: Warehouse) => {
    if (onSubmit) {
      onSubmit(data);
    } else {
      console.log("Warehouse data:", data);
      toast.success("Almacén guardado exitosamente");
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Editar Almacén</h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="flex items-center gap-8">
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Código</FormLabel>
                      <FormControl>
                        <Input {...field} maxLength={3} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="inactive"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-2 space-y-0 mt-6">
                      <FormControl>
                        <Checkbox 
                          checked={field.value} 
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel>Inactivo</FormLabel>
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="establishmentCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Código Establecimiento</FormLabel>
                    <FormControl>
                      <Input {...field} maxLength={4} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input {...field} maxLength={40} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="companyId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Compañía</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      value={field.value}
                      disabled={true}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar compañía" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {companies.map((company) => (
                          <SelectItem key={company.id} value={company.id}>
                            {company.name}
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
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dirección</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar dirección" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {addresses.map((address) => (
                          <SelectItem key={address.id} value={address.id}>
                            {address.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-4">
              <FormField
                control={form.control}
                name="otherAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Otra Dirección</FormLabel>
                    <FormControl>
                      <Input {...field} maxLength={80} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="branchId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sucursal</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar sucursal" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {branches.map((branch) => (
                          <SelectItem key={branch.id} value={branch.id}>
                            {branch.name}
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
                name="locationId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Localidad</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar localidad" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {locations.map((location) => (
                          <SelectItem key={location.id} value={location.id}>
                            {location.name}
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
                name="warehouseType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar tipo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {warehouseTypes.map((type) => (
                          <SelectItem key={type.id} value={type.id}>
                            {type.name}
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
                name="costCenterId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Centro Costo</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar centro de costo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {costCenters.map((center) => (
                          <SelectItem key={center.id} value={center.id}>
                            {center.name}
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
                name="observations"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Observaciones</FormLabel>
                    <FormControl>
                      <Input {...field} maxLength={40} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" type="button" onClick={onCancel}>
              Cancelar
            </Button>
            <Button type="submit">
              Aceptar
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
