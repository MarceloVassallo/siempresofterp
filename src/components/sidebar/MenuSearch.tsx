
import React from "react";
import { Search } from "lucide-react";
import { SidebarInput } from "@/components/ui/sidebar";

interface MenuSearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export const MenuSearch: React.FC<MenuSearchProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <SidebarInput
      type="search"
      placeholder="Buscar..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="h-8 text-sm"
      prefix={<Search className="h-4 w-4 opacity-50" />}
    />
  );
};
