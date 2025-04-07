
import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Home, Archive } from "lucide-react";

interface LayoutWithSidebarProps {
  children: React.ReactNode;
}

export const LayoutWithSidebar = ({ children }: LayoutWithSidebarProps) => {
  const location = useLocation();
  
  const menuItems = [
    {
      title: "Inicio",
      path: "/",
      icon: Home,
    },
    {
      title: "Artículos",
      path: "/articles",
      icon: Archive,
    },
  ];

  return (
    <SidebarProvider>
      <div className="flex w-full min-h-screen">
        <Sidebar>
          <SidebarHeader>
            <div className="px-3 py-2">
              <h2 className="text-lg font-semibold">Sistema de Almacén</h2>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Navegación</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.path}>
                      <SidebarMenuButton
                        asChild
                        isActive={location.pathname === item.path}
                        tooltip={item.title}
                      >
                        <Link to={item.path}>
                          <item.icon className="h-5 w-5" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <div className="p-3 text-sm text-muted-foreground">
              <p>© 2025 Sistema de Almacén</p>
            </div>
          </SidebarFooter>
        </Sidebar>
        <div className="flex-1 p-4 md:p-6">{children}</div>
      </div>
    </SidebarProvider>
  );
};
