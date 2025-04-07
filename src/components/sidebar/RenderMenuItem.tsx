
import React from "react";
import { MenuItem } from "@/types/menu";
import { TopLevelMenuItem } from "./TopLevelMenuItem";
import { CategoryMenuItem } from "./CategoryMenuItem";
import { LeafMenuItem } from "./LeafMenuItem";

interface RenderMenuItemProps {
  item: MenuItem;
  level: number;
}

export const RenderMenuItem: React.FC<RenderMenuItemProps> = ({ item, level }) => {
  // If it's a top-level item with submenu
  if (level === 0 && item.submenu) {
    return <TopLevelMenuItem item={item} />;
  }
  
  // If it's a category with submenu
  if (item.submenu) {
    return <CategoryMenuItem item={item} level={level} />;
  }
  
  // If it's a leaf node (actual page link)
  return <LeafMenuItem item={item} level={level} />;
};
