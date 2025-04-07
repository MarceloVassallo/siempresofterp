
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
  const pageItems = Array.from({ length: totalPages }, (_, i) => i + 1);
  
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestión de Artículos</h1>
      </div>
      
      {/* Updated toolbar */}
      <div className="flex flex-wrap gap-2 mb-4">
        <Button 
          variant="outline" 
          onClick={handleNewArticle}
          className="flex items-center gap-2"
        >
          <Plus size={16} />
          Nuevo
        </Button>
        <Button 
          variant="outline" 
          onClick={() => {
            // For demo purposes, edit the first article
            if (articles.length > 0) handleEditArticle(articles[0]);
          }}
          className="flex items-center gap-2"
        >
          <PencilLine size={16} />
          Modificar
        </Button>
        <Button 
          variant="outline" 
          onClick={() => {
            // Would delete an article in a real app
            console.log("Delete article");
          }}
          className="flex items-center gap-2"
        >
          <Trash2 size={16} />
          Eliminar
        </Button>
        <Button 
          variant="outline" 
          onClick={() => {
            // For demo purposes, view the first article
            if (articles.length > 0) handleViewArticle(articles[0]);
          }}
          className="flex items-center gap-2"
        >
          <Eye size={16} />
          Ver Detalle
        </Button>
      </div>
      
      {/* Panel de búsqueda */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <div className="flex items-center gap-2">
                <Select
                  value="contains"
                  onValueChange={() => {}}
                >
                  <SelectTrigger className="w-[80px] flex-shrink-0">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="contains">Contiene</SelectItem>
                    <SelectItem value="equals">Igual a</SelectItem>
                    <SelectItem value="startsWith">Comienza con</SelectItem>
                  </SelectContent>
                </Select>
                <Input 
                  id="description"
                  value={searchFilters.description}
                  onChange={(e) => handleFilterChange("description", e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="class">Clase</Label>
              <div className="flex items-center gap-2">
                <Select
                  value="all"
                  onValueChange={(value) => handleFilterChange("class", value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas</SelectItem>
                    <SelectItem value="class1">Clase 1</SelectItem>
                    <SelectItem value="class2">Clase 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="subClass">Sub Clase</Label>
              <div className="flex items-center gap-2">
                <Select
                  value="all"
                  onValueChange={(value) => handleFilterChange("subClass", value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas</SelectItem>
                    <SelectItem value="subclass1">Sub Clase 1</SelectItem>
                    <SelectItem value="subclass2">Sub Clase 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="code">Cód. Artículo</Label>
              <div className="flex items-center gap-2">
                <Select
                  value="contains"
                  onValueChange={() => {}}
                >
                  <SelectTrigger className="w-[80px] flex-shrink-0">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="contains">Contiene</SelectItem>
                    <SelectItem value="equals">Igual a</SelectItem>
                    <SelectItem value="startsWith">Comienza con</SelectItem>
                  </SelectContent>
                </Select>
                <Input 
                  id="code"
                  value={searchFilters.code}
                  onChange={(e) => handleFilterChange("code", e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="alternateCode">Cód. Alterno</Label>
              <div className="flex items-center gap-2">
                <Select
                  value="contains"
                  onValueChange={() => {}}
                >
                  <SelectTrigger className="w-[80px] flex-shrink-0">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="contains">Contiene</SelectItem>
                    <SelectItem value="equals">Igual a</SelectItem>
                    <SelectItem value="startsWith">Comienza con</SelectItem>
                  </SelectContent>
                </Select>
                <Input 
                  id="alternateCode"
                  value={searchFilters.alternateCode}
                  onChange={(e) => handleFilterChange("alternateCode", e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="crossReference">Ref. Cruzada</Label>
              <div className="flex items-center gap-2">
                <Select
                  value="contains"
                  onValueChange={() => {}}
                >
                  <SelectTrigger className="w-[80px] flex-shrink-0">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="contains">Contiene</SelectItem>
                    <SelectItem value="equals">Igual a</SelectItem>
                    <SelectItem value="startsWith">Comienza con</SelectItem>
                  </SelectContent>
                </Select>
                <Input 
                  id="crossReference"
                  value={searchFilters.crossReference}
                  onChange={(e) => handleFilterChange("crossReference", e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="partNumber">Nro.Parte</Label>
              <div className="flex items-center gap-2">
                <Select
                  value="contains"
                  onValueChange={() => {}}
                >
                  <SelectTrigger className="w-[80px] flex-shrink-0">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="contains">Contiene</SelectItem>
                    <SelectItem value="equals">Igual a</SelectItem>
                    <SelectItem value="startsWith">Comienza con</SelectItem>
                  </SelectContent>
                </Select>
                <Input 
                  id="partNumber"
                  value={searchFilters.partNumber}
                  onChange={(e) => handleFilterChange("partNumber", e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="storage">Almacenamiento</Label>
              <div className="flex items-center gap-2">
                <Select
                  value="all"
                  onValueChange={(value) => handleFilterChange("storage", value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="almacen1">Almacén Principal</SelectItem>
                    <SelectItem value="almacen2">Almacén Secundario</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status">Estado</Label>
              <div className="flex items-center gap-2">
                <Select
                  value="all"
                  onValueChange={(value) => handleFilterChange("status", value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="activo">Activo</SelectItem>
                    <SelectItem value="inactivo">Inactivo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="brand">Marca</Label>
              <div className="flex items-center gap-2">
                <Select
                  value="all"
                  onValueChange={(value) => handleFilterChange("brand", value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas</SelectItem>
                    <SelectItem value="fixall">FIXALL</SelectItem>
                    <SelectItem value="anclaflex">ANCLAFLEX</SelectItem>
                    <SelectItem value="sellotape">SELLOTAPE</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="client">Cliente</Label>
              <Input 
                id="client"
                value={searchFilters.client}
                onChange={(e) => handleFilterChange("client", e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="supplier">Proveedor</Label>
              <div className="flex gap-2">
                <Input
                  id="supplier"
                  className="flex-1"
                  value={searchFilters.supplier}
                  onChange={(e) => handleFilterChange("supplier", e.target.value)}
                />
                <Button variant="outline" className="w-12" size="icon">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="price">Cotización</Label>
              <div className="flex gap-2">
                <Input
                  id="price"
                  type="number"
                  className="flex-1"
                  value={searchFilters.price}
                  onChange={(e) => handleFilterChange("price", e.target.value)}
                />
                <Button variant="outline" className="w-12" size="icon">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="categoryAccount">Cat. Contable</Label>
              <Select
                value={searchFilters.categoryAccount || "all"}
                onValueChange={(value) => handleFilterChange("categoryAccount", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  <SelectItem value="mercaderia">Mercadería</SelectItem>
                  <SelectItem value="suministros">Suministros</SelectItem>
                  <SelectItem value="activos">Activos</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex items-center mt-4 gap-2">
            <Checkbox 
              id="hasStock" 
              checked={searchFilters.hasStock}
              onCheckedChange={(checked) => handleFilterChange("hasStock", Boolean(checked))}
            />
            <Label htmlFor="hasStock">Con stock disponible</Label>
          </div>
          
          <div className="flex justify-end mt-6">
            <Button onClick={handleSearch}>
              <Search className="mr-2 h-4 w-4" />
              Buscar
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Código</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead className="w-[100px] text-right">Precio</TableHead>
                <TableHead className="text-right w-[180px]">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentArticles.map((article) => (
                <TableRow key={article.id}>
                  <TableCell>{article.code}</TableCell>
                  <TableCell>{article.name}</TableCell>
                  <TableCell>{article.description}</TableCell>
                  <TableCell className="text-right">{article.price.toFixed(2)}</TableCell>
                  <TableCell className="text-right flex justify-end gap-1">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleEditArticle(article)}
                    >
                      <PencilLine className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleViewArticle(article)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleAssignWarehouse(article.id)}
                    >
                      <Archive className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          <div className="flex items-center justify-between px-4 py-4 border-t">
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium">Filas por página</p>
              <Select
                value={perPage}
                onValueChange={(value) => {
                  setPerPage(value);
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger className="h-8 w-[70px]">
                  <SelectValue placeholder={perPage} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
                
                {pageItems.map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      isActive={page === currentPage}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Articles;
