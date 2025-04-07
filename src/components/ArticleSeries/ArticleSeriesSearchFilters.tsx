
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface ArticleSeriesSearchFiltersProps {
  searchWarehouse: string;
  setSearchWarehouse: (value: string) => void;
  searchArticle: string;
  setSearchArticle: (value: string) => void;
  searchSeries1: string;
  setSearchSeries1: (value: string) => void;
  searchSeries2: string;
  setSearchSeries2: (value: string) => void;
  searchStatus: string;
  setSearchStatus: (value: string) => void;
  handleSearch: () => void;
}

const ArticleSeriesSearchFilters = ({
  searchWarehouse,
  setSearchWarehouse,
  searchArticle,
  setSearchArticle,
  searchSeries1,
  setSearchSeries1,
  searchSeries2,
  setSearchSeries2,
  searchStatus,
  setSearchStatus,
  handleSearch
}: ArticleSeriesSearchFiltersProps) => {
  return (
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
              className="flex-1 h-8 text-xs"
            />
            <Button variant="outline" size="sm">...</Button>
          </div>
        </div>
        
        <div>
          <label htmlFor="series1" className="block text-sm font-medium mb-1">Serie 1</label>
          <Input
            id="series1"
            value={searchSeries1}
            onChange={(e) => setSearchSeries1(e.target.value)}
            className="h-8 text-xs"
          />
        </div>
        
        <div>
          <label htmlFor="series2" className="block text-sm font-medium mb-1">Serie 2</label>
          <Input
            id="series2"
            value={searchSeries2}
            onChange={(e) => setSearchSeries2(e.target.value)}
            className="h-8 text-xs"
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
        <Button onClick={handleSearch} className="flex items-center gap-2" size="sm">
          <Search size={16} />
          Buscar
        </Button>
      </div>
    </div>
  );
};

export default ArticleSeriesSearchFilters;
