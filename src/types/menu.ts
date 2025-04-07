
import { ComponentType } from "react";

export interface MenuItem {
  title: string;
  path?: string;
  icon?: ComponentType<{ className?: string }>;
  submenu?: MenuItem[];
}
