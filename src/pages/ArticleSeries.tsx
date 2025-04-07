
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
import { Select } from "@/components/ui/select";
import { mockArticleSeries } from "@/types/articleSeries";
import { mockArticles } from "@/types/article";

const ArticleSeries = () => {
  const [filteredSeries, setFilteredSeries] = useState(mockArticleSeries);
  const [searchWarehouse, setSearchWarehouse] = useState("");
  const [searchArticle, setSearchArticle] = useState("");
  const [searchSeries1, setSearchSeries1] = useState("");
  const [searchSeries2, setSearchSeries2] = useState("");
  const [searchStatus, setSearchStatus] = useState("");

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
            {searchArticle && mockArticles.find(a => 
              a.code.toLowerCase().includes(searchArticle.toLowerCase()) || 
              a.name?.toLowerCase().includes(searchArticle.toLowerCase())
            ) && (
              <p className="text-xs mt-1 text-muted-foreground">
                {mockArticles.find(a => 
                  a.code.toLowerCase().includes(searchArticle.toLowerCase()) || 
                  a.name?.toLowerCase().includes(searchArticle.toLowerCase())
                )?.name}
              </p>
            )}
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
          <Button onClick={handleSearch}>Buscar</Button>
        </div>
      </div>
      
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <div className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline">Nuevo</Button>
          <Button variant="outline">Modificar</Button>
          <Button variant="outline">Eliminar</Button>
          <Button variant="outline">Ver Detalle</Button>
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
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSeries.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4">
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
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ArticleSeries;
