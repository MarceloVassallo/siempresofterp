
import { z } from "zod";

export const formSchema = z.object({
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
