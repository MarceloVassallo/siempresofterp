
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Search, Plus, Edit, FileSearch, Trash2 } from "lucide-react";
import { Article, mockArticles } from "@/types/article";
import EditArticleForm from "@/components/EditArticleForm";

const Articles = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [articles, setArticles] = useState<Article[]>(mockArticles);
  const [formMode, setFormMode] = useState<"new" | "edit" | "view" | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const filteredArticles = articles.filter((article) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      article.code.toLowerCase().includes(searchLower) ||
      article.description.toLowerCase().includes(searchLower) ||
      article.alternateCode?.toLowerCase().includes(searchLower) ||
      article.partNumber?.toLowerCase().includes(searchLower)
    );
  });

  const handleNewArticle = () => {
    setSelectedArticle(null);
    setFormMode("new");
  };

  const handleEditArticle = (article: Article) => {
    setSelectedArticle(article);
    setFormMode("edit");
  };

  const handleViewArticle = (article: Article) => {
    setSelectedArticle(article);
    setFormMode("view");
  };

  const handleDeleteArticle = (id: string) => {
    if (window.confirm("¿Está seguro de eliminar este artículo?")) {
      setArticles(articles.filter((article) => article.id !== id));
      toast({
        title: "Artículo eliminado",
        description: "El artículo ha sido eliminado correctamente",
      });
    }
  };

  const handleSaveArticle = (article: Article) => {
    if (formMode === "new") {
      const newId = (articles.length + 1).toString();
      const newArticle = { ...article, id: newId };
      setArticles([...articles, newArticle]);
    } else {
      const updatedArticles = articles.map((a) =>
        a.id === article.id ? article : a
      );
      setArticles(updatedArticles);
    }
    setFormMode(null);
  };

  const handleCloseForm = () => {
    setFormMode(null);
  };

  if (formMode !== null) {
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
    <div className="container mx-auto py-6">
      <Card className="shadow-sm">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <CardTitle className="text-2xl">Gestión de Artículos</CardTitle>
            <Button onClick={handleNewArticle}>
              <Plus className="mr-2 h-4 w-4" /> Nuevo Artículo
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 space-y-2">
              <Label htmlFor="search">Buscar Artículo</Label>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Buscar por código, descripción..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Código</TableHead>
                  <TableHead>Descripción</TableHead>
                  <TableHead className="hidden md:table-cell">Código Alterno</TableHead>
                  <TableHead className="hidden md:table-cell">Marca</TableHead>
                  <TableHead className="hidden md:table-cell">Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredArticles.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                      No se encontraron artículos
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredArticles.map((article) => (
                    <TableRow key={article.id}>
                      <TableCell className="font-medium">{article.code}</TableCell>
                      <TableCell className="max-w-[300px] truncate">{article.description}</TableCell>
                      <TableCell className="hidden md:table-cell">{article.alternateCode || "-"}</TableCell>
                      <TableCell className="hidden md:table-cell">{article.brand || "-"}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                          article.status === 'Activo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {article.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end items-center gap-2">
                          <Button variant="ghost" size="icon" onClick={() => handleViewArticle(article)}>
                            <FileSearch className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleEditArticle(article)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDeleteArticle(article.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Articles;
