
import React from "react";
import { SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarMenu } from "@/components/ui/sidebar";
import { MenuItem } from "@/types/menu";
import { RenderMenuItem } from "./RenderMenuItem";

interface TopLevelMenuItemProps {
  item: MenuItem;
}

export const TopLevelMenuItem: React.FC<TopLevelMenuItemProps> = ({ item }) => {
  return (
    <SidebarGroup key={item.title}>
      <SidebarGroupLabel>
        {item.icon && <item.icon className="mr-2" />}
        {item.title}
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {item.submenu?.map((subItem) => (
            <RenderMenuItem key={subItem.title} item={subItem} level={1} />
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};
