
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

  return (
    <SidebarMenuItem key={item.title}>
      {level === 1 ? (
        <SidebarMenuButton
          asChild
          isActive={location.pathname === item.path}
          tooltip={item.title ? { children: item.title } : undefined}
          size="sm"
        >
          <Link to={item.path || "#"}>
            {item.icon && <item.icon className="h-4 w-4" />}
            <span>{item.title}</span>
          </Link>
        </SidebarMenuButton>
      ) : (
        <SidebarMenuSubButton
          asChild
          isActive={location.pathname === item.path}
          size="sm"
        >
          <Link to={item.path || "#"}>
            {item.icon && <item.icon className="h-3 w-3 mr-1" />}
            <span>{item.title}</span>
          </Link>
        </SidebarMenuSubButton>
      )}
    </SidebarMenuItem>
  );
};
