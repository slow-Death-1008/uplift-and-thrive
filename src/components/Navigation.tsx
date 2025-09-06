import { Link, useLocation } from "react-router-dom";
import { Brain, Music, BarChart3, LogOut, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo.png";


const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", icon: Brain, label: "Chat" },
    { path: "/assessment", icon: Heart, label: "Assessment" },
    { path: "/library", icon: Music, label: "Library" },
    { path: "/dashboard", icon: BarChart3, label: "Dashboard" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img src={logo} alt="SAHAY Logo" className="w-12 h-10" />
            <span className="text-xl font-extrabold text-foreground">SAHAY</span>
          </div>

          <div className="flex items-center space-x-1">
            {navItems.map(({ path, icon: Icon, label }) => (
              <Link key={path} to={path}>
                <Button
                  variant={location.pathname === path ? "default" : "ghost"}
                  size="sm"
                  className="flex items-center space-x-2 transition-gentle"
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{label}</span>
                </Button>
              </Link>
            ))}
            
            <Button variant="ghost" size="sm" className="ml-4 text-muted-foreground">
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline ml-2">Logout</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
