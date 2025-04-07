
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { GeneralInfoTab } from "./GeneralInfoTab";
import { InventoryTab } from "./InventoryTab";
import { PricingTab } from "./PricingTab";
import { Article } from "@/types/article";

interface ArticleFormTabsProps {
  formData: Article;
  handleChange: (field: keyof Article, value: string | boolean) => void;
  isReadOnly: boolean;
}

export const ArticleFormTabs = ({
  formData,
  handleChange,
  isReadOnly,
}: ArticleFormTabsProps) => {
  return (
    <Tabs defaultValue="general" className="w-full">
      <TabsList className="grid grid-cols-3 h-8">
        <TabsTrigger value="general" className="text-xs py-1">Información General</TabsTrigger>
        <TabsTrigger value="inventory" className="text-xs py-1">Control de Inventario</TabsTrigger>
        <TabsTrigger value="pricing" className="text-xs py-1">Precios y Costos</TabsTrigger>
      </TabsList>
      
      <TabsContent value="general" className="space-y-3 mt-3">
        <GeneralInfoTab formData={formData} handleChange={handleChange} isReadOnly={isReadOnly} />
      </TabsContent>
      
      <TabsContent value="inventory" className="space-y-3 mt-3">
        <InventoryTab formData={formData} handleChange={handleChange} isReadOnly={isReadOnly} />
      </TabsContent>
      
      <TabsContent value="pricing" className="space-y-3 mt-3">
        <PricingTab formData={formData} handleChange={handleChange} isReadOnly={isReadOnly} />
      </TabsContent>
    </Tabs>
  );
};
