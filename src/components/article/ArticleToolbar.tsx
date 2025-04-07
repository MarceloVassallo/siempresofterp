
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, PencilLine, Trash2, Eye } from "lucide-react";
import { Article } from "@/types/article";

interface ArticleToolbarProps {
  handleNewArticle: () => void;
  handleEditArticle: (article: Article) => void;
  handleViewArticle: (article: Article) => void;
  articles: Article[];
}

const ArticleToolbar = ({ 
  handleNewArticle, 
  handleEditArticle, 
  handleViewArticle, 
  articles 
}: ArticleToolbarProps) => {
  return (
    <div className="flex flex-wrap gap-2 mb-3">
      <Button 
        variant="outline"
        size="sm"
        onClick={handleNewArticle}
        className="flex items-center gap-1 h-8 text-xs px-2"
      >
        <Plus size={14} />
        Nuevo
      </Button>
      <Button 
        variant="outline" 
        size="sm"
        onClick={() => {
          // For demo purposes, edit the first article
          if (articles.length > 0) handleEditArticle(articles[0]);
        }}
        className="flex items-center gap-1 h-8 text-xs px-2"
      >
        <PencilLine size={14} />
        Modificar
      </Button>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={() => {
          // Would delete an article in a real app
          console.log("Delete article");
        }}
        className="flex items-center gap-1 h-8 text-xs px-2"
      >
        <Trash2 size={14} />
        Eliminar
      </Button>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={() => {
          // For demo purposes, view the first article
          if (articles.length > 0) handleViewArticle(articles[0]);
        }}
        className="flex items-center gap-1 h-8 text-xs px-2"
      >
        <Eye size={16} />
        Ver Detalle
      </Button>
    </div>
  );
};

export default ArticleToolbar;
