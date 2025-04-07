
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { SidebarMenuItem, SidebarMenuSub } from "@/components/ui/sidebar";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { MenuItem } from "@/types/menu";
import { RenderMenuItem } from "./RenderMenuItem";

interface CategoryMenuItemProps {
  item: MenuItem;
  level: number;
}

export const CategoryMenuItem: React.FC<CategoryMenuItemProps> = ({ item, level }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <SidebarMenuItem key={item.title}>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="flex items-center justify-between w-full text-xs py-1.5 px-2 hover:bg-sidebar-accent rounded-md">
          <span className="flex items-center">
            {item.icon && <item.icon className="mr-2 h-4 w-4" />}
            <span className="text-xs font-medium">{item.title}</span>
          </span>
          <ChevronDown className={`h-3 w-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {item.submenu?.map((subItem) => (
              <RenderMenuItem key={subItem.title} item={subItem} level={level + 1} />
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </Collapsible>
    </SidebarMenuItem>
  );
};
