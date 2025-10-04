import { type VerdictType } from "@shared/schema";
import { Shield, AlertTriangle, XCircle, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface VerdictBadgeProps {
  verdict: VerdictType;
  size?: "sm" | "md" | "lg";
  showIcon?: boolean;
}

const verdictConfig = {
  safe: {
    label: "Safe",
    color: "bg-green-600 dark:bg-green-500",
    icon: Shield,
    borderColor: "border-green-600 dark:border-green-500",
  },
  caution: {
    label: "Caution",
    color: "bg-amber-500 dark:bg-amber-400",
    icon: AlertTriangle,
    borderColor: "border-amber-500 dark:border-amber-400",
  },
  danger: {
    label: "False",
    color: "bg-red-600 dark:bg-red-500",
    icon: XCircle,
    borderColor: "border-red-600 dark:border-red-500",
  },
  neutral: {
    label: "Unverified",
    color: "bg-gray-600 dark:bg-gray-500",
    icon: HelpCircle,
    borderColor: "border-gray-600 dark:border-gray-500",
  },
};

export function VerdictBadge({ verdict, size = "md", showIcon = true }: VerdictBadgeProps) {
  const config = verdictConfig[verdict];
  const Icon = config.icon;

  const sizeClasses = {
    sm: "px-2 py-1 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-2xl",
  };

  const iconSizes = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-6 w-6",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-lg font-semibold text-white shadow-md",
        config.color,
        sizeClasses[size]
      )}
      data-testid={`badge-verdict-${verdict}`}
    >
      {showIcon && <Icon className={iconSizes[size]} />}
      <span>{config.label}</span>
    </div>
  );
}
