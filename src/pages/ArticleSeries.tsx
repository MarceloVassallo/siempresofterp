
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { mockArticleSeries, ArticleSeries as ArticleSeriesType } from "@/types/articleSeries";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import ArticleSeriesSearchFilters from "@/components/ArticleSeries/ArticleSeriesSearchFilters";
import ArticleSeriesToolbar from "@/components/ArticleSeries/ArticleSeriesToolbar";
import ArticleSeriesTable from "@/components/ArticleSeries/ArticleSeriesTable";

const ArticleSeries = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
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

  const handleNew = () => {
    navigate("/edit-article-series", { state: { mode: "create" } });
  };

  const handleEdit = (series: ArticleSeriesType) => {
    navigate("/edit-article-series", { state: { mode: "edit", articleSeries: series } });
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
    navigate("/edit-article-series", { state: { mode: "view", articleSeries: series } });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Series de Artículos</h1>
      
      {/* Search panel using the new component */}
      <ArticleSeriesSearchFilters
        searchWarehouse={searchWarehouse}
        setSearchWarehouse={setSearchWarehouse}
        searchArticle={searchArticle}
        setSearchArticle={setSearchArticle}
        searchSeries1={searchSeries1}
        setSearchSeries1={setSearchSeries1}
        searchSeries2={searchSeries2}
        setSearchSeries2={setSearchSeries2}
        searchStatus={searchStatus}
        setSearchStatus={setSearchStatus}
        handleSearch={handleSearch}
      />
      
      {/* Toolbar using the new component */}
      <ArticleSeriesToolbar
        handleNew={handleNew}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        handleViewDetail={handleViewDetail}
        selectedSeries={filteredSeries[0]} // For demo purposes
      />
      
      {/* Results table using the new component */}
      <ArticleSeriesTable
        filteredSeries={filteredSeries}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        handleViewDetail={handleViewDetail}
      />
    </div>
  );
};

export default ArticleSeries;
