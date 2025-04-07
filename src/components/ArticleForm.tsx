
import { useState, useEffect } from "react";
import { Article } from "@/types/article";
import { Card, CardContent } from "@/components/ui/card";
import { ArticleFormHeader } from "./article/ArticleFormHeader";
import { ArticleFormTabs } from "./article/ArticleFormTabs";
import { ArticleFormFooter } from "./article/ArticleFormFooter";

interface ArticleFormProps {
  mode: "new" | "edit" | "view" | null;
  article: Article | null;
  onClose: () => void;
  onSave: (article: Article) => void;
}

const ArticleForm = ({ mode, article, onClose, onSave }: ArticleFormProps) => {
  const [formData, setFormData] = useState<Article>({
    id: "",
    code: "",
    description: "",
    alternateCode: "",
    partNumber: "",
    crossReference: "",
    storage: "",
    status: "Activo",
    brand: "",
    barcode: "",
    supplier: "",
    hasStock: false,
  });

  useEffect(() => {
    if (article) {
      setFormData(article);
    } else {
      setFormData({
        id: "",
        code: "",
        description: "",
        alternateCode: "",
        partNumber: "",
        crossReference: "",
        storage: "",
        status: "Activo",
        brand: "",
        barcode: "",
        supplier: "",
        hasStock: false,
      });
    }
  }, [article]);

  const handleChange = (field: keyof Article, value: string | boolean) => {
    setFormData({ ...formData, [field]: value });
  };

  const isReadOnly = mode === "view";

  return (
    <div className="container mx-auto">
      <Card className="w-full max-w-4xl mx-auto shadow-sm">
        <ArticleFormHeader mode={mode} />
        <CardContent className="p-3 text-xs">
          <ArticleFormTabs
            formData={formData}
            handleChange={handleChange}
            isReadOnly={isReadOnly}
          />
        </CardContent>
        <ArticleFormFooter
          isReadOnly={isReadOnly}
          onClose={onClose}
          onSave={onSave}
          formData={formData}
          mode={mode}
        />
      </Card>
    </div>
  );
};

export default ArticleForm;
