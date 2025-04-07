
import { Warehouse } from "@/types/warehouse";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface WarehouseLocationFormProps {
  form: UseFormReturn<Warehouse>;
  readOnly?: boolean;
}

// Sample data for dropdowns
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

export function WarehouseLocationForm({ form, readOnly = false }: WarehouseLocationFormProps) {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="otherAddress"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-xs">Otra Dirección</FormLabel>
            <FormControl>
              <Input {...field} maxLength={80} disabled={readOnly} className="h-8 text-xs" />
            </FormControl>
            <FormMessage className="text-xs" />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="branchId"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-xs">Sucursal</FormLabel>
            <Select onValueChange={field.onChange} value={field.value} disabled={readOnly}>
              <FormControl>
                <SelectTrigger className="h-8 text-xs">
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
            <FormMessage className="text-xs" />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="locationId"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-xs">Localidad</FormLabel>
            <Select onValueChange={field.onChange} value={field.value} disabled={readOnly}>
              <FormControl>
                <SelectTrigger className="h-8 text-xs">
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
            <FormMessage className="text-xs" />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="warehouseType"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-xs">Tipo</FormLabel>
            <Select onValueChange={field.onChange} value={field.value} disabled={readOnly}>
              <FormControl>
                <SelectTrigger className="h-8 text-xs">
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
            <FormMessage className="text-xs" />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="costCenterId"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-xs">Centro Costo</FormLabel>
            <Select onValueChange={field.onChange} value={field.value} disabled={readOnly}>
              <FormControl>
                <SelectTrigger className="h-8 text-xs">
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
            <FormMessage className="text-xs" />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="observations"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-xs">Observaciones</FormLabel>
            <FormControl>
              <Input {...field} maxLength={40} disabled={readOnly} className="h-8 text-xs" />
            </FormControl>
            <FormMessage className="text-xs" />
          </FormItem>
        )}
      />
    </div>
  );
}
