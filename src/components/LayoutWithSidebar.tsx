
import React from "react";
import { SidebarNavigation } from "./sidebar/SidebarNavigation";

interface LayoutWithSidebarProps {
  children: React.ReactNode;
}

export const LayoutWithSidebar = ({ children }: LayoutWithSidebarProps) => {
  return <SidebarNavigation>{children}</SidebarNavigation>;
};
