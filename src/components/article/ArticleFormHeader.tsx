
import React from "react";
import { CardHeader, CardTitle } from "@/components/ui/card";

interface ArticleFormHeaderProps {
  mode: "new" | "edit" | "view" | null;
}

export const ArticleFormHeader = ({ mode }: ArticleFormHeaderProps) => {
  return (
    <CardHeader className="py-3 px-4">
      <CardTitle className="text-xs">
        {mode === "new" 
          ? "Nuevo Artículo" 
          : mode === "edit" 
          ? "Modificar Artículo" 
          : "Detalle de Artículo"}
      </CardTitle>
    </CardHeader>
  );
};
