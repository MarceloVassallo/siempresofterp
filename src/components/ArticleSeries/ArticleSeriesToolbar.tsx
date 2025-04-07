
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, PencilLine, Trash2, Eye } from "lucide-react";
import { ArticleSeries } from "@/types/articleSeries";

interface ArticleSeriesToolbarProps {
  handleNew: () => void;
  handleEdit: (series: ArticleSeries) => void;
  handleDelete: (series: ArticleSeries) => void;
  handleViewDetail: (series: ArticleSeries) => void;
  selectedSeries?: ArticleSeries;
}

const ArticleSeriesToolbar = ({
  handleNew,
  handleEdit,
  handleDelete,
  handleViewDetail,
  selectedSeries
}: ArticleSeriesToolbarProps) => {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <Button 
        variant="outline" 
        onClick={handleNew}
        className="flex items-center gap-2"
        size="sm"
      >
        <Plus size={16} />
        Nuevo
      </Button>
      <Button 
        variant="outline" 
        onClick={() => {
          if (selectedSeries) handleEdit(selectedSeries);
        }}
        className="flex items-center gap-2"
        size="sm"
      >
        <PencilLine size={16} />
        Modificar
      </Button>
      <Button 
        variant="outline" 
        onClick={() => {
          if (selectedSeries) handleDelete(selectedSeries);
        }}
        className="flex items-center gap-2"
        size="sm"
      >
        <Trash2 size={16} />
        Eliminar
      </Button>
      <Button 
        variant="outline" 
        onClick={() => {
          if (selectedSeries) handleViewDetail(selectedSeries);
        }}
        className="flex items-center gap-2"
        size="sm"
      >
        <Eye size={16} />
        Ver Detalle
      </Button>
    </div>
  );
};

export default ArticleSeriesToolbar;
