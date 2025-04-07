
import { Warehouse } from "@/types/warehouse";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { UseFormReturn } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface WarehouseBasicInfoFormProps {
  form: UseFormReturn<Warehouse>;
  readOnly?: boolean;
}

export function WarehouseBasicInfoForm({ form, readOnly = false }: WarehouseBasicInfoFormProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-8">
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs">Código</FormLabel>
              <FormControl>
                <Input {...field} maxLength={3} disabled={readOnly} className="h-8 text-xs" />
              </FormControl>
              <FormMessage className="text-xs" />
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
                  disabled={readOnly}
                />
              </FormControl>
              <FormLabel className="text-xs">Inactivo</FormLabel>
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="establishmentCode"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-xs">Código Establecimiento</FormLabel>
            <FormControl>
              <Input {...field} maxLength={4} disabled={readOnly} className="h-8 text-xs" />
            </FormControl>
            <FormMessage className="text-xs" />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-xs">Nombre</FormLabel>
            <FormControl>
              <Input {...field} maxLength={40} disabled={readOnly} className="h-8 text-xs" />
            </FormControl>
            <FormMessage className="text-xs" />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="companyId"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-xs">Compañía</FormLabel>
            <Select 
              onValueChange={field.onChange} 
              value={field.value}
              disabled={true}
            >
              <FormControl>
                <SelectTrigger className="h-8 text-xs">
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
            <FormMessage className="text-xs" />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="address"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-xs">Dirección</FormLabel>
            <Select onValueChange={field.onChange} value={field.value} disabled={readOnly}>
              <FormControl>
                <SelectTrigger className="h-8 text-xs">
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
            <FormMessage className="text-xs" />
          </FormItem>
        )}
      />
    </div>
  );
}

// Sample data for dropdowns
const companies = [
  { id: "1", name: "Empresa Principal S.A." },
  { id: "2", name: "Sucursal Norte S.A." },
];

const addresses = [
  { id: "1", name: "Calle Principal 123" },
  { id: "2", name: "Avenida Central 456" },
];
