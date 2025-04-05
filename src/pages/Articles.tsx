
import { useState } from "react";
import { mockArticles, Article } from "@/types/article";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Edit, Trash, Eye, Copy, FileText, Package, BarChart, FileSpreadsheet, PackagePlus } from "lucide-react";
import { toast } from "sonner";
import ArticleForm from "@/components/ArticleForm";

const Articles = () => {
  const [articles, setArticles] = useState<Article[]>(mockArticles);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("contains");
  const [showArticleForm, setShowArticleForm] = useState(false);
  const [formMode, setFormMode] = useState<"new" | "edit" | "view" | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  
  const filteredArticles = articles.filter(article =>
    article.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = () => {
    toast.info("Buscando artículos con los filtros aplicados");
  };

  const handleNew = () => {
    setFormMode("new");
    setSelectedArticle(null);
    setShowArticleForm(true);
  };

  const handleEdit = (article: Article) => {
    setFormMode("edit");
    setSelectedArticle(article);
    setShowArticleForm(true);
  };

  const handleViewDetail = (article: Article) => {
    setFormMode("view");
    setSelectedArticle(article);
    setShowArticleForm(true);
  };

  const handleDelete = (id: string) => {
    toast.success("Artículo eliminado correctamente");
    setArticles(articles.filter(art => art.id !== id));
  };

  const handleCopy = (article: Article) => {
    const newArticle = {
      ...article,
      id: Date.now().toString(),
      code: `${article.code}-COPIA`,
      description: `COPIA DE - ${article.description}`
    };
    
    setArticles([...articles, newArticle]);
    toast.success("Artículo copiado correctamente");
  };

  const handleWarehouseAssignment = () => {
    toast.info("Funcionalidad de asignación de almacén en desarrollo");
  };

  const handlePricing = () => {
    toast.info("Funcionalidad de costo-precio en desarrollo");
  };

  const handleConversion = () => {
    toast.info("Funcionalidad de conversión de unidades de medida en desarrollo");
  };

  const handleKardex = () => {
    toast.info("Funcionalidad de kardex en desarrollo");
  };

  const handleStock = () => {
    toast.info("Funcionalidad de stock en desarrollo");
  };

  const handleCrossReference = () => {
    toast.info("Funcionalidad de referencias cruzadas en desarrollo");
  };

  const handleColumnOptions = () => {
    toast.info("Funcionalidad de opciones de columnas en desarrollo");
  };

  const handleCloseForm = () => {
    setShowArticleForm(false);
  };

  if (showArticleForm) {
    return <ArticleForm 
      mode={formMode} 
      article={selectedArticle} 
      onClose={handleCloseForm} 
      onSave={(article) => {
        if (formMode === "new") {
          setArticles([...articles, { ...article, id: Date.now().toString() }]);
          toast.success("Artículo creado correctamente");
        } else if (formMode === "edit") {
          setArticles(articles.map(art => art.id === article.id ? article : art));
          toast.success("Artículo modificado correctamente");
        }
        setShowArticleForm(false);
      }}
    />;
  }
  
  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold mb-4">Gestión de Artículos</h1>
      
      <div className="flex flex-col md:flex-row gap-4">
        {/* Left Panel with Buttons */}
        <Card className="w-full md:w-auto">
          <CardContent className="p-4">
            <div className="flex flex-col gap-2">
              <Button onClick={handleNew}>
                <FileText className="mr-2 h-4 w-4" />
                Nuevo
              </Button>
              <Button variant="outline" onClick={() => toast.info("Seleccione un artículo primero")}>
                <Edit className="mr-2 h-4 w-4" />
                Modificar
              </Button>
              <Button variant="outline" onClick={() => toast.info("Seleccione un artículo primero")}>
                <Copy className="mr-2 h-4 w-4" />
                Copiar
              </Button>
              <Button variant="outline" onClick={() => toast.info("Seleccione un artículo primero")}>
                <Trash className="mr-2 h-4 w-4" />
                Eliminar
              </Button>
              <Button variant="outline" onClick={() => toast.info("Seleccione un artículo primero")}>
                <Eye className="mr-2 h-4 w-4" />
                Ver Detalle
              </Button>
              <Button variant="outline" onClick={handleKardex}>
                <FileSpreadsheet className="mr-2 h-4 w-4" />
                Kardex
              </Button>
              <Button variant="outline" onClick={handleConversion}>
                <BarChart className="mr-2 h-4 w-4" />
                Convertir UM
              </Button>
              <Button variant="outline" onClick={handlePricing}>
                <BarChart className="mr-2 h-4 w-4" />
                Costo-Precio
              </Button>
              <Button variant="outline" onClick={handleWarehouseAssignment}>
                <PackagePlus className="mr-2 h-4 w-4" />
                Asignar Alm.
              </Button>
              <Button variant="outline" onClick={handleStock}>
                <Package className="mr-2 h-4 w-4" />
                Stock
              </Button>
              <Button variant="outline" onClick={handleCrossReference}>
                <FileText className="mr-2 h-4 w-4" />
                Ref. Cruzada
              </Button>
              <Button variant="outline" onClick={handleColumnOptions}>
                <FileText className="mr-2 h-4 w-4" />
                Opciones de Columna
              </Button>
            </div>
          </CardContent>
        </Card>
      
        {/* Right Content */}
        <div className="flex-1">
          <Card className="mb-4">
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Descripción</label>
                  <div className="flex gap-2">
                    <Select value={searchType} onValueChange={setSearchType}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Tipo de búsqueda" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="contains">Contiene</SelectItem>
                        <SelectItem value="startsWith">Comienza Con</SelectItem>
                        <SelectItem value="endsWith">Termina Con</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input 
                      placeholder="Descripción del artículo" 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Clase</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione una clase" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ferreteria">Ferretería</SelectItem>
                      <SelectItem value="electricidad">Electricidad</SelectItem>
                      <SelectItem value="herramientas">Herramientas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Sub Clase</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione una sub clase" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tornillos">Tornillos</SelectItem>
                      <SelectItem value="tuercas">Tuercas</SelectItem>
                      <SelectItem value="arandelas">Arandelas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Código Artículo</label>
                  <div className="flex gap-2">
                    <Select defaultValue="igual">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Tipo de búsqueda" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="igual">Igual</SelectItem>
                        <SelectItem value="mayor">Mayor o Igual</SelectItem>
                        <SelectItem value="menor">Menor o Igual</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input placeholder="Código de artículo" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Referencia Cruzada</label>
                  <div className="flex gap-2">
                    <Select defaultValue="contiene">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Tipo de búsqueda" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="contiene">Contiene</SelectItem>
                        <SelectItem value="comienza">Comienza Con</SelectItem>
                        <SelectItem value="termina">Termina Con</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input placeholder="Referencia cruzada" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Código Alterno</label>
                  <div className="flex gap-2">
                    <Select defaultValue="contiene">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Tipo de búsqueda" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="contiene">Contiene</SelectItem>
                        <SelectItem value="comienza">Comienza Con</SelectItem>
                        <SelectItem value="termina">Termina Con</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input placeholder="Código alterno" />
                  </div>
                </div>
                
                <div className="flex items-end">
                  <Button onClick={handleSearch} className="gap-2">
                    <Search className="h-4 w-4" />
                    Buscar
                  </Button>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Almacenamiento</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione almacenamiento" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="principal">Almacén Principal</SelectItem>
                      <SelectItem value="secundario">Almacén Secundario</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Estado</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="activo">Activo</SelectItem>
                      <SelectItem value="inactivo">Inactivo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Marca</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione marca" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fixall">FIXALL</SelectItem>
                      <SelectItem value="anclaflex">ANCLAFLEX</SelectItem>
                      <SelectItem value="sellotape">SELLOTAPE</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox id="stockCheck" />
                  <label htmlFor="stockCheck" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Con stock disponible
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Código</TableHead>
                      <TableHead>Descripción</TableHead>
                      <TableHead>Almacenamiento</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Marca</TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredArticles.length > 0 ? (
                      filteredArticles.map((article) => (
                        <TableRow key={article.id}>
                          <TableCell>{article.code}</TableCell>
                          <TableCell>{article.description}</TableCell>
                          <TableCell>{article.storage || '-'}</TableCell>
                          <TableCell>{article.status || '-'}</TableCell>
                          <TableCell>{article.brand || '-'}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="icon" onClick={() => handleViewDetail(article)}>
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" onClick={() => handleEdit(article)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" onClick={() => handleCopy(article)}>
                                <Copy className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" onClick={() => handleDelete(article.id)}>
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center">
                          No se encontraron artículos
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Articles;
