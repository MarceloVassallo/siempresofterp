
import React from "react";
import { Button } from "@/components/ui/button";
import { Article } from "@/types/article";
import { PencilLine, Eye, Trash2, Archive } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { Card, CardContent } from "@/components/ui/card";

interface ArticlesTableProps {
  currentArticles: Article[];
  handleEditArticle: (article: Article) => void;
  handleViewArticle: (article: Article) => void;
  handleAssignWarehouse: (articleId: string) => void;
  perPage: string;
  setPerPage: (value: string) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
}

const ArticlesTable = ({
  currentArticles,
  handleEditArticle,
  handleViewArticle,
  handleAssignWarehouse,
  perPage,
  setPerPage,
  currentPage,
  setCurrentPage,
  totalPages,
}: ArticlesTableProps) => {
  const pageItems = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <Card className="shadow-sm text-xs">
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="h-8">
              <TableHead className="w-[100px] text-xs font-medium">Código</TableHead>
              <TableHead className="text-xs font-medium">Nombre</TableHead>
              <TableHead className="text-xs font-medium">Descripción</TableHead>
              <TableHead className="w-[100px] text-right text-xs font-medium">Precio</TableHead>
              <TableHead className="text-right w-[180px] text-xs font-medium">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentArticles.map((article) => (
              <TableRow key={article.id} className="h-8">
                <TableCell className="text-xs py-1">{article.code}</TableCell>
                <TableCell className="text-xs py-1">{article.name}</TableCell>
                <TableCell className="text-xs py-1">{article.description}</TableCell>
                <TableCell className="text-right text-xs py-1">{article.price ? article.price.toFixed(2) : "N/A"}</TableCell>
                <TableCell className="text-right flex justify-end gap-1 text-xs py-1">
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
        
        <div className="flex items-center justify-between px-3 py-2 border-t text-xs">
          <div className="flex items-center gap-2">
            <p className="text-xs font-medium">Filas por página</p>
            <Select
              value={perPage}
              onValueChange={(value) => {
                setPerPage(value);
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="h-7 w-[60px] text-xs">
                <SelectValue placeholder={perPage} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5" className="text-xs">5</SelectItem>
                <SelectItem value="10" className="text-xs">10</SelectItem>
                <SelectItem value="20" className="text-xs">20</SelectItem>
                <SelectItem value="50" className="text-xs">50</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Pagination>
            <PaginationContent className="text-xs">
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  className={`text-xs h-7 ${currentPage === 1 ? "pointer-events-none opacity-50" : ""}`}
                />
              </PaginationItem>
              
              {pageItems.map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    isActive={page === currentPage}
                    onClick={() => setCurrentPage(page)}
                    className="text-xs h-7 w-7"
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              
              <PaginationItem>
                <PaginationNext 
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  className={`text-xs h-7 ${currentPage === totalPages ? "pointer-events-none opacity-50" : ""}`}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </CardContent>
    </Card>
  );
};

export default ArticlesTable;
