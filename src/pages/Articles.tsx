import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { PencilLine, Eye, Trash2, Plus, Search, Archive } from "lucide-react";
import { Article } from "@/types/article";
import { useNavigate } from "react-router-dom";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import EditArticleForm from "@/components/EditArticleForm";
import ArticleSearchFilters from "@/components/article/ArticleSearchFilters";
import ArticleToolbar from "@/components/article/ArticleToolbar";
import ArticlesTable from "@/components/article/ArticlesTable";

// Aquí iría el código preexistente para mostrar artículos
// Asumo que ya existe un array de artículos como este:
const articleData: Article[] = [
  {
    id: "1",
    code: "A001",
    name: "Artículo 1",
    description: "Descripción del artículo 1",
    price: 100,
    // ... otros campos del artículo
  },
  {
    id: "2",
    code: "A002",
    name: "Artículo 2",
    description: "Descripción del artículo 2",
    price: 200,
    // ... otros campos del artículo
  },
  // ... más artículos
];

const Articles = () => {
  // Estado para controlar el formulario de artículos
  const [showForm, setShowForm] = useState<boolean>(false);
  const [formMode, setFormMode] = useState<"new" | "edit" | "view">("new");
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  
  // Añadimos paginación
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<string>("5");
  
  // Estado para los filtros de búsqueda
  const [searchFilters, setSearchFilters] = useState({
    description: "",
    class: "",
    subClass: "",
    code: "",
    crossReference: "",
    alternateCode: "",
    partNumber: "",
    storage: "",
    status: "",
    brand: "",
    client: "",
    supplier: "",
    price: "",
    categoryAccount: "",
    hasStock: false
  });
  
  const articles = articleData; // En un caso real, esto vendría de un estado o contexto
  
  const totalPages = Math.ceil(articles.length / parseInt(perPage));
  
  const startIndex = (currentPage - 1) * parseInt(perPage);
  const endIndex = startIndex + parseInt(perPage);
  const currentArticles = articles.slice(startIndex, endIndex);

  const navigate = useNavigate();
  
  const handleAssignWarehouse = (articleId: string) => {
    navigate(`/articles/${articleId}/assign-warehouse`);
  };

  const handleNewArticle = () => {
    setSelectedArticle(null);
    setFormMode("new");
    setShowForm(true);
  };

  const handleEditArticle = (article: Article) => {
    setSelectedArticle(article);
    setFormMode("edit");
    setShowForm(true);
  };

  const handleViewArticle = (article: Article) => {
    setSelectedArticle(article);
    setFormMode("view");
    setShowForm(true);
  };

  const handleSaveArticle = (article: Article) => {
    // En un caso real, aquí guardaríamos el artículo
    console.log("Artículo guardado:", article);
    setShowForm(false);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleFilterChange = (field: string, value: string | boolean) => {
    setSearchFilters({
      ...searchFilters,
      [field]: value
    });
  };

  const handleSearch = () => {
    // En un caso real, aquí aplicaríamos los filtros
    console.log("Buscar con filtros:", searchFilters);
    // Reiniciar paginación al buscar
    setCurrentPage(1);
  };

  // Si el formulario está visible, mostrarlo
  if (showForm) {
    return (
      <EditArticleForm 
        mode={formMode} 
        article={selectedArticle} 
        onClose={handleCloseForm} 
        onSave={handleSaveArticle}
      />
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-semibold">Gestión de Artículos</h1>
      </div>
            
      {/* Panel de búsqueda - Ahora como componente separado */}
      <ArticleSearchFilters 
        searchFilters={searchFilters}
        handleFilterChange={handleFilterChange}
        handleSearch={handleSearch}
      />
      
      {/* Barra de herramientas - Ahora como componente separado */}
      <ArticleToolbar
        handleNewArticle={handleNewArticle}
        handleEditArticle={handleEditArticle}
        handleViewArticle={handleViewArticle}
        articles={articles}
      />

      {/* Tabla de artículos - Ahora como componente separado */}
      <ArticlesTable 
        currentArticles={currentArticles}
        handleEditArticle={handleEditArticle}
        handleViewArticle={handleViewArticle}
        handleAssignWarehouse={handleAssignWarehouse}
        perPage={perPage}
        setPerPage={setPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </div>
  );
};

export default Articles;
