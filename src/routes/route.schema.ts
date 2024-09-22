export interface DashboardRouter {
    role: string;
    route: DashboardMenuItem[];
}
export interface DashboardMenuItem {
    id: string;
    title: string;
    badge?: string;
    badgecolor?: string;
    icon?: string;
    link?: string;
    grouptitle?: boolean;
    children?: DashboardMenuItemLevel1[];
}
interface DashboardMenuItemLevel1 {
    id: string;
    name: string;
    badge?: string;
    badgecolor?: string;
    icon?: string;
    link?: string;
    grouptitle?: boolean;
    // children?: DashboardMenuItem[];
}