
import React from "react";
import { Button } from "@/components/ui/button";
import { Article } from "@/types/article";

interface ArticleFormFooterProps {
  isReadOnly: boolean;
  onClose: () => void;
  onSave: (article: Article) => void;
  formData: Article;
  mode: "new" | "edit" | "view" | null;
}

export const ArticleFormFooter = ({
  isReadOnly,
  onClose,
  onSave,
  formData,
  mode,
}: ArticleFormFooterProps) => {
  return (
    <div className="flex justify-end gap-2 py-2 px-3 border-t">
      <Button variant="outline" onClick={onClose} size="sm" className="h-8 text-xs">
        {isReadOnly ? "Cerrar" : "Cancelar"}
      </Button>
      {!isReadOnly && (
        <Button onClick={() => onSave(formData)} size="sm" className="h-8 text-xs">
          {mode === "new" ? "Crear" : "Guardar"}
        </Button>
      )}
    </div>
  );
};
