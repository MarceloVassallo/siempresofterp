
import { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mockArticleSeries, ArticleSeries as ArticleSeriesType } from "@/types/articleSeries";
import EditArticleSeries from "@/components/ArticleSeries/EditArticleSeries";
import { Plus, PencilLine, Trash2, Eye, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ArticleSeries = () => {
  const { toast } = useToast();
  const [filteredSeries, setFilteredSeries] = useState(mockArticleSeries);
  const [searchWarehouse, setSearchWarehouse] = useState("");
  const [searchArticle, setSearchArticle] = useState("");
  const [searchSeries1, setSearchSeries1] = useState("");
  const [searchSeries2, setSearchSeries2] = useState("");
  const [searchStatus, setSearchStatus] = useState("");
  
  // State for the edit dialog
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentSeries, setCurrentSeries] = useState<ArticleSeriesType | undefined>(undefined);
  const [dialogMode, setDialogMode] = useState<"create" | "edit" | "view">("create");

  const handleSearch = () => {
    const results = mockArticleSeries.filter(series => {
      const warehouseMatch = searchWarehouse ? 
        series.warehouseName?.toLowerCase().includes(searchWarehouse.toLowerCase()) : true;
      
      const articleMatch = searchArticle ? 
        (series.articleCode?.toLowerCase().includes(searchArticle.toLowerCase()) ||
         series.articleName?.toLowerCase().includes(searchArticle.toLowerCase())) : true;
      
      const series1Match = searchSeries1 ? 
        series.series1?.toLowerCase().includes(searchSeries1.toLowerCase()) : true;
      
      const series2Match = searchSeries2 ? 
        series.series2?.toLowerCase().includes(searchSeries2.toLowerCase()) : true;
      
      const statusMatch = searchStatus ? 
        series.status === searchStatus : true;
      
      return warehouseMatch && articleMatch && series1Match && series2Match && statusMatch;
    });
    
    setFilteredSeries(results);
  };

  const handleNew = () => {
    setCurrentSeries(undefined);
    setDialogMode("create");
    setIsDialogOpen(true);
  };

  const handleEdit = (series: ArticleSeriesType) => {
    setCurrentSeries(series);
    setDialogMode("edit");
    setIsDialogOpen(true);
  };

  const handleDelete = (series: ArticleSeriesType) => {
    toast({
      title: "Serie eliminada",
      description: `La serie ${series.series1} ha sido eliminada`,
    });
    // In a real app, you would delete the series from the database
    setFilteredSeries((prev) => prev.filter((s) => s.id !== series.id));
  };

  const handleViewDetail = (series: ArticleSeriesType) => {
    setCurrentSeries(series);
    setDialogMode("view");
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Series de Artículos</h1>
      
      {/* Search panel */}
      <div className="bg-gray-50 border rounded-md p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          <div>
            <label htmlFor="warehouse" className="block text-sm font-medium mb-1">Almacén</label>
            <select 
              id="warehouse" 
              className="w-full rounded-md border border-input px-3 py-2 bg-background"
              value={searchWarehouse}
              onChange={(e) => setSearchWarehouse(e.target.value)}
            >
              <option value="">Todos</option>
              <option value="Almacén Principal">Almacén Principal</option>
              <option value="Almacén Secundario">Almacén Secundario</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="article" className="block text-sm font-medium mb-1">Artículo</label>
            <div className="flex gap-2">
              <Input
                id="article"
                value={searchArticle}
                onChange={(e) => setSearchArticle(e.target.value)}
                placeholder="Código o nombre"
                className="flex-1"
              />
              <Button variant="outline" size="icon">...</Button>
            </div>
          </div>
          
          <div>
            <label htmlFor="series1" className="block text-sm font-medium mb-1">Serie 1</label>
            <Input
              id="series1"
              value={searchSeries1}
              onChange={(e) => setSearchSeries1(e.target.value)}
            />
          </div>
          
          <div>
            <label htmlFor="series2" className="block text-sm font-medium mb-1">Serie 2</label>
            <Input
              id="series2"
              value={searchSeries2}
              onChange={(e) => setSearchSeries2(e.target.value)}
            />
          </div>
          
          <div>
            <label htmlFor="status" className="block text-sm font-medium mb-1">Estado</label>
            <select 
              id="status" 
              className="w-full rounded-md border border-input px-3 py-2 bg-background"
              value={searchStatus}
              onChange={(e) => setSearchStatus(e.target.value)}
            >
              <option value="">Todos</option>
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </select>
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button onClick={handleSearch} className="flex items-center gap-2">
            <Search size={16} />
            Buscar
          </Button>
        </div>
      </div>
      
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <div className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={handleNew} className="flex items-center gap-2">
            <Plus size={16} />
            Nuevo
          </Button>
          <Button 
            variant="outline" 
            onClick={() => {
              const selected = filteredSeries[0]; // For demo purposes, edit the first item
              if (selected) handleEdit(selected);
            }}
            className="flex items-center gap-2"
          >
            <PencilLine size={16} />
            Modificar
          </Button>
          <Button 
            variant="outline" 
            onClick={() => {
              const selected = filteredSeries[0]; // For demo purposes, delete the first item
              if (selected) handleDelete(selected);
            }}
            className="flex items-center gap-2"
          >
            <Trash2 size={16} />
            Eliminar
          </Button>
          <Button 
            variant="outline" 
            onClick={() => {
              const selected = filteredSeries[0]; // For demo purposes, view the first item
              if (selected) handleViewDetail(selected);
            }}
            className="flex items-center gap-2"
          >
            <Eye size={16} />
            Ver Detalle
          </Button>
        </div>
      </div>
      
      {/* Results table */}
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Almacén</TableHead>
              <TableHead>Código Artículo</TableHead>
              <TableHead>Nombre Artículo</TableHead>
              <TableHead>Serie 1</TableHead>
              <TableHead>Serie 2</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSeries.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-4">
                  No se encontraron resultados
                </TableCell>
              </TableRow>
            ) : (
              filteredSeries.map(series => (
                <TableRow key={series.id}>
                  <TableCell>{series.warehouseName}</TableCell>
                  <TableCell>{series.articleCode}</TableCell>
                  <TableCell>{series.articleName}</TableCell>
                  <TableCell>{series.series1}</TableCell>
                  <TableCell>{series.series2}</TableCell>
                  <TableCell>{series.status}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(series)}>
                        <PencilLine size={16} />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleViewDetail(series)}>
                        <Eye size={16} />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(series)}>
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Edit Dialog */}
      <EditArticleSeries 
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        articleSeries={currentSeries}
        mode={dialogMode}
      />
    </div>
  );
};

export default ArticleSeries;
