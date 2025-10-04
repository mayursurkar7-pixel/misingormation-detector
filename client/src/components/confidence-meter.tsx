import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface ConfidenceMeterProps {
  score: number;
  label?: string;
}

export function ConfidenceMeter({ score, label = "Confidence Score" }: ConfidenceMeterProps) {
  const getColorClass = (score: number) => {
    if (score >= 80) return "text-green-600 dark:text-green-400";
    if (score >= 60) return "text-amber-600 dark:text-amber-400";
    return "text-red-600 dark:text-red-400";
  };

  return (
    <div className="space-y-2" data-testid="confidence-meter">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-muted-foreground">{label}</span>
        <span className={cn("text-lg font-bold", getColorClass(score))}>
          {score}%
        </span>
      </div>
      <Progress value={score} className="h-2" />
    </div>
  );
}
