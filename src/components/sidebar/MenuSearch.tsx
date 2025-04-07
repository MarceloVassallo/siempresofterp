
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface MenuSearchProps {
  onSearch: (query: string) => void;
}

export function MenuSearch({ onSearch }: MenuSearchProps) {
  const [query, setQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className="relative mb-2">
      <Search className="absolute left-2 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Buscar..."
        className="h-8 pl-8 text-xs"
        value={query}
        onChange={handleChange}
      />
    </div>
  );
}
