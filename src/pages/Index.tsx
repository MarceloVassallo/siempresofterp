
import CommissionForm from "@/components/CommissionForm";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-8">
        <h1 className="text-center text-2xl font-bold mb-8">Sistema de Gestión de Comisiones</h1>
        <CommissionForm />
      </div>
    </div>
  );
};

export default Index;
