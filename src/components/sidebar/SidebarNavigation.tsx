
import React, { useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { menuStructure } from "./MenuData";
import { MenuSearch } from "./MenuSearch";
import { RenderMenuItem } from "./RenderMenuItem";
import { filterMenuItems } from "./MenuFilter";

interface SidebarNavigationProps {
  children: React.ReactNode;
}

export const SidebarNavigation: React.FC<SidebarNavigationProps> = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const filteredMenu = filterMenuItems(menuStructure, searchTerm);

  return (
    <SidebarProvider>
      <div className="flex w-full min-h-screen">
        <Sidebar>
          <SidebarHeader>
            <div className="px-3 py-2">
              <h2 className="text-lg font-semibold">Siempresoft ERP</h2>
              <div className="mt-2">
                <MenuSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent className="text-xs">
            {filteredMenu.map((item) => (
              <RenderMenuItem key={item.title} item={item} level={0} />
            ))}
          </SidebarContent>
          <SidebarFooter>
            <div className="p-3 text-xs text-muted-foreground">
              <p>© 2025 Siempresoft</p>
            </div>
          </SidebarFooter>
        </Sidebar>
        <div className="flex-1 p-3 md:p-4">{children}</div>
      </div>
    </SidebarProvider>
  );
};
