
import React from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { PencilLine, Eye, Trash2 } from "lucide-react";
import { ArticleSeries } from "@/types/articleSeries";

interface ArticleSeriesTableProps {
  filteredSeries: ArticleSeries[];
  handleEdit: (series: ArticleSeries) => void;
  handleDelete: (series: ArticleSeries) => void;
  handleViewDetail: (series: ArticleSeries) => void;
}

const ArticleSeriesTable = ({
  filteredSeries,
  handleEdit,
  handleDelete,
  handleViewDetail
}: ArticleSeriesTableProps) => {
  return (
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
  );
};

export default ArticleSeriesTable;
