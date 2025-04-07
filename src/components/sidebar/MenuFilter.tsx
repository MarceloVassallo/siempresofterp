import React from "react";
import { MenuItem } from "@/types/menu";

export function filterMenuItems(items: MenuItem[], searchTerm: string): MenuItem[] {
  if (!searchTerm) return items;

  return items
    .map(item => {
      // Check if the current item matches
      const titleMatches = item.title.toLowerCase().includes(searchTerm.toLowerCase());
      
      // If it has a submenu, filter that too
      let filteredSubmenu: MenuItem[] | undefined = undefined;
      if (item.submenu) {
        filteredSubmenu = filterMenuItems(item.submenu, searchTerm);
      }
      
      // If title matches or has matching children, include this item
      if (titleMatches || (filteredSubmenu && filteredSubmenu.length > 0)) {
        return {
          ...item,
          submenu: filteredSubmenu,
        };
      }
      
      // Otherwise filter it out
      return null;
    })
    .filter(Boolean) as MenuItem[];
}
