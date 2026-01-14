
import { Link, useLocation } from "react-router-dom";
import {
    LayoutDashboard,
    Ticket,
    Globe,
    FileText,
    CreditCard,
    LogOut,
    Menu,
    X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/AuthProvider";
import { useState } from "react";

const SidebarItem = ({
    icon: Icon,
    label,
    to,
    isActive,
    onClick
}: {
    icon: any,
    label: string,
    to: string,
    isActive: boolean,
    onClick?: () => void
}) => (
    <Link
        to={to}
        onClick={onClick}
        className={cn(
            "flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-sm font-medium",
            isActive
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
        )}
    >
        <Icon className="w-4 h-4" />
        {label}
    </Link>
);

export const Sidebar = ({ className, onClose }: { className?: string, onClose?: () => void }) => {
    const location = useLocation();
    const { signOut } = useAuth();

    const menuItems = [
        { icon: LayoutDashboard, label: "Dashboard", to: "/dashboard" },
        { icon: Globe, label: "Projects & Hosting", to: "/projects" },
        { icon: Ticket, label: "Support Tickets", to: "/tickets" },
        { icon: CreditCard, label: "Invoices", to: "/invoices" },
        { icon: FileText, label: "Documents & Files", to: "/documents" },
    ];

    return (
        <div className={cn("flex flex-col h-full bg-card border-r", className)}>
            <div className="p-6 border-b">
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                    Client Portal
                </h1>
                <p className="text-xs text-muted-foreground mt-1">Web Development & Hosting</p>
            </div>

            <div className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
                {menuItems.map((item) => (
                    <SidebarItem
                        key={item.to}
                        icon={item.icon}
                        label={item.label}
                        to={item.to}
                        isActive={location.pathname === item.to}
                        onClick={onClose}
                    />
                ))}
            </div>

            <div className="p-4 border-t">
                <Button
                    variant="outline"
                    className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
                    onClick={() => signOut()}
                >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                </Button>
            </div>
        </div>
    );
};
