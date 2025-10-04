import { Link, useLocation } from "wouter";
import { ThemeToggle } from "./theme-toggle";
import { Shield, Activity, History, Layers } from "lucide-react";
import { cn } from "@/lib/utils";

export function Header() {
  const [location] = useLocation();

  const navItems = [
    { href: "/", label: "Analyze", icon: Shield },
    { href: "/history", label: "History", icon: History },
    { href: "/batch", label: "Batch", icon: Layers },
    { href: "/stats", label: "Stats", icon: Activity },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-8 flex items-center space-x-2">
          <Shield className="h-6 w-6 text-primary" />
          <span className="hidden font-bold sm:inline-block">
            Misinformation Detector
          </span>
        </div>
        <nav className="flex flex-1 items-center space-x-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <a
                  className={cn(
                    "inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover-elevate active-elevate-2",
                    isActive
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground"
                  )}
                  data-testid={`link-${item.label.toLowerCase()}`}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {item.label}
                </a>
              </Link>
            );
          })}
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
