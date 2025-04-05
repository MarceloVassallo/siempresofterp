
import { EditWarehouseForm } from "@/components/EditWarehouseForm";

const EditWarehouse = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-8 px-4 mx-auto max-w-4xl">
        <h1 className="text-center text-2xl font-bold mb-8">Editar Almacén</h1>
        <EditWarehouseForm 
          onCancel={() => window.history.back()}
        />
      </div>
    </div>
  );
};

export default EditWarehouse;
