
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Articles from "./pages/Articles";
import EditWarehouse from "./pages/EditWarehouse";
import ItemWarehouseForm from "./components/ItemWarehouseForm";
import { LayoutWithSidebar } from "./components/LayoutWithSidebar";
import ArticleSeries from "./pages/ArticleSeries";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <LayoutWithSidebar>
              <Index />
            </LayoutWithSidebar>
          } />
          <Route path="/articles" element={
            <LayoutWithSidebar>
              <Articles />
            </LayoutWithSidebar>
          } />
          <Route path="/articles/:id/assign-warehouse" element={
            <LayoutWithSidebar>
              <ItemWarehouseForm />
            </LayoutWithSidebar>
          } />
          <Route path="/warehouses" element={
            <LayoutWithSidebar>
              <EditWarehouse />
            </LayoutWithSidebar>
          } />
          <Route path="/article-series" element={
            <LayoutWithSidebar>
              <ArticleSeries />
            </LayoutWithSidebar>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
