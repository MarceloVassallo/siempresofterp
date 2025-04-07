
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Warehouse, defaultWarehouse } from "@/types/warehouse";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "sonner";
import { formSchema } from "./WarehouseFormSchema";
import { WarehouseBasicInfoForm } from "./WarehouseBasicInfoForm";
import { WarehouseLocationForm } from "./WarehouseLocationForm";

interface EditWarehouseFormProps {
  initialWarehouse?: Warehouse;
  onSubmit?: (data: Warehouse) => void;
  onCancel?: () => void;
  readOnly?: boolean;
}

export function EditWarehouseForm({
  initialWarehouse = defaultWarehouse,
  onSubmit,
  onCancel,
  readOnly = false
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
    <div className="p-3 bg-white rounded-lg text-sm">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <WarehouseBasicInfoForm form={form} readOnly={readOnly} />
            <WarehouseLocationForm form={form} readOnly={readOnly} />
          </div>

          <div className="flex justify-end space-x-2 pt-3">
            <Button variant="outline" type="button" onClick={onCancel} size="sm" className="h-8 text-xs">
              Cancelar
            </Button>
            {!readOnly && (
              <Button type="submit" size="sm" className="h-8 text-xs">
                Aceptar
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}
