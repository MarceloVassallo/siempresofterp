
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { SidebarMenuItem, SidebarMenuButton, SidebarMenuSubButton } from "@/components/ui/sidebar";
import { MenuItem } from "@/types/menu";

interface LeafMenuItemProps {
  item: MenuItem;
  level: number;
}

export const LeafMenuItem: React.FC<LeafMenuItemProps> = ({ item, level }) => {
  const location = useLocation();
  const isActive = location.pathname === item.path;

  return (
    <SidebarMenuItem key={item.title}>
      {level === 1 ? (
        <SidebarMenuButton
          asChild
          isActive={isActive}
          tooltip={{ children: item.title }}
          size="sm"
        >
          <Link to={item.path || "#"} className="text-xs">
            {item.icon && <item.icon className="h-4 w-4" />}
            <span>{item.title}</span>
          </Link>
        </SidebarMenuButton>
      ) : (
        <SidebarMenuSubButton
          asChild
          isActive={isActive}
          size="sm"
        >
          <Link to={item.path || "#"} className="text-xs">
            {item.icon && <item.icon className="h-3 w-3 mr-1" />}
            <span>{item.title}</span>
          </Link>
        </SidebarMenuSubButton>
      )}
    </SidebarMenuItem>
  );
};
