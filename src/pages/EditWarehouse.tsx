
import { EditWarehouseForm } from "@/components/EditWarehouseForm";

const EditWarehouse = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Editar Almacén</h1>
      <EditWarehouseForm 
        onCancel={() => window.history.back()}
      />
    </div>
  );
};

export default EditWarehouse;
