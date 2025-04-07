
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarMenu } from "@/components/ui/sidebar";
import { MenuItem } from "@/types/menu";
import { RenderMenuItem } from "./RenderMenuItem";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";

interface TopLevelMenuItemProps {
  item: MenuItem;
}

export const TopLevelMenuItem: React.FC<TopLevelMenuItemProps> = ({ item }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <SidebarGroup key={item.title}>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="w-full">
          <SidebarGroupLabel className="flex items-center justify-between w-full cursor-pointer">
            <div className="flex items-center">
              {item.icon && <item.icon className="mr-2 h-4 w-4" />}
              <span>{item.title}</span>
            </div>
            <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </SidebarGroupLabel>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarGroupContent>
            <SidebarMenu>
              {item.submenu?.map((subItem) => (
                <RenderMenuItem key={subItem.title} item={subItem} level={1} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </CollapsibleContent>
      </Collapsible>
    </SidebarGroup>
  );
};
