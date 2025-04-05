
import { Button } from "@/components/ui/button";
import ItemWarehouseForm from "@/components/ItemWarehouseForm";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-8">
        <h1 className="text-center text-2xl font-bold mb-8">Sistema de Gestión de Artículos en Almacén</h1>
        <div className="flex justify-center mb-6">
          <Link to="/edit-warehouse">
            <Button variant="outline">Editar Almacén</Button>
          </Link>
        </div>
        <ItemWarehouseForm />
      </div>
    </div>
  );
};

export default Index;
