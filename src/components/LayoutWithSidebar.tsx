import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import {
  Archive,
  BoxIcon,
  Building2,
  ChevronDown,
  FileBarChart2,
  Package,
  Search,
  Tags,
  Truck,
} from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";

interface LayoutWithSidebarProps {
  children: React.ReactNode;
}

interface MenuItem {
  title: string;
  path?: string;
  icon?: React.ComponentType<{ className?: string }>;
  submenu?: MenuItem[];
}

export const LayoutWithSidebar = ({ children }: LayoutWithSidebarProps) => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  
  const menuStructure: MenuItem[] = [
    {
      title: "Almacén",
      icon: Package,
      submenu: [
        {
          title: "Información maestra",
          submenu: [
            { title: "Artículos", path: "/articles", icon: Archive },
            { title: "Almacenes", path: "/warehouses", icon: Package },
            { title: "Series de Artículos", path: "/article-series", icon: Tags },
          ],
        },
        {
          title: "Ingresos",
          submenu: [
            { title: "Ingresos por ajuste", path: "/ingreso-ajuste" },
            { title: "Ingresos por transferencia", path: "/ingreso-transferencia" },
          ],
        },
      ],
    },
    {
      title: "Contabilidad",
      icon: FileBarChart2,
      submenu: [
        {
          title: "Información maestra",
          submenu: [
            { title: "Plan de cuentas", path: "/plan-cuentas" },
            { title: "Cuentas por compañía", path: "/cuentas-compania" },
            { title: "Unidades de negocio", path: "/unidades-negocio" },
          ],
        },
      ],
    },
  ];

  // Filter menu items based on search term
  const filterMenuItems = (items: MenuItem[]): MenuItem[] => {
    if (!searchTerm) return items;

    return items
      .map(item => {
        // Check if the current item matches
        const titleMatches = item.title.toLowerCase().includes(searchTerm.toLowerCase());
        
        // If it has a submenu, filter that too
        let filteredSubmenu: MenuItem[] | undefined = undefined;
        if (item.submenu) {
          filteredSubmenu = filterMenuItems(item.submenu);
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
  };

  const filteredMenu = filterMenuItems(menuStructure);

  const renderMenuItem = (item: MenuItem, level: number = 0) => {
    // If it's a top-level item with submenu
    if (level === 0 && item.submenu) {
      return (
        <SidebarGroup key={item.title}>
          <SidebarGroupLabel>
            {item.icon && <item.icon className="mr-2" />}
            {item.title}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {item.submenu.map((subItem) => renderMenuItem(subItem, 1))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      );
    }
    
    // If it's a category with submenu
    if (item.submenu) {
      return (
        <SidebarMenuItem key={item.title}>
          <Collapsible>
            <CollapsibleTrigger className="flex items-center justify-between w-full text-sm py-1.5 px-2 hover:bg-sidebar-accent rounded-md">
              <span className="flex items-center">
                {item.icon && <item.icon className="mr-2 h-4 w-4" />}
                <span className="text-sm font-medium">{item.title}</span>
              </span>
              <ChevronDown className="h-4 w-4" />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                {item.submenu.map((subSubItem) => renderMenuItem(subSubItem, level + 1))}
              </SidebarMenuSub>
            </CollapsibleContent>
          </Collapsible>
        </SidebarMenuItem>
      );
    }
    
    // If it's a leaf node (actual page link)
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

  return (
    <SidebarProvider>
      <div className="flex w-full min-h-screen">
        <Sidebar>
          <SidebarHeader>
            <div className="px-3 py-2">
              <h2 className="text-lg font-semibold">Siempresoft ERP</h2>
              <div className="mt-2">
                <SidebarInput
                  type="search"
                  placeholder="Buscar..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="h-8 text-sm"
                  prefix={<Search className="h-4 w-4 opacity-50" />}
                />
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent className="text-sm">
            {filteredMenu.map((item) => renderMenuItem(item))}
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
