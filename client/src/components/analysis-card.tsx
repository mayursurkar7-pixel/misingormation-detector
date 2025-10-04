import { type Analysis } from "@shared/schema";
import { VerdictBadge } from "./verdict-badge";
import { ConfidenceMeter } from "./confidence-meter";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, ExternalLink, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface AnalysisCardProps {
  analysis: Analysis;
  onDelete?: (id: string) => void;
  compact?: boolean;
}

const verdictBorderColors = {
  safe: "border-l-green-600 dark:border-l-green-500",
  caution: "border-l-amber-500 dark:border-l-amber-400",
  danger: "border-l-red-600 dark:border-l-red-500",
  neutral: "border-l-gray-600 dark:border-l-gray-500",
};

export function AnalysisCard({ analysis, onDelete, compact = false }: AnalysisCardProps) {
  const { toast } = useToast();

  const handleCopy = async () => {
    await navigator.clipboard.writeText(analysis.reasoning);
    toast({
      title: "Copied to clipboard",
      description: "Analysis reasoning copied successfully",
    });
  };

  if (compact) {
    return (
      <Card
        className={cn(
          "border-l-4 hover-elevate transition-all cursor-pointer",
          verdictBorderColors[analysis.verdict]
        )}
        data-testid={`card-analysis-${analysis.id}`}
      >
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start gap-4">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground line-clamp-2">
                {analysis.claim}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {format(new Date(analysis.analyzedAt), "MMM d, yyyy 'at' h:mm a")}
              </p>
            </div>
            <VerdictBadge verdict={analysis.verdict} size="sm" />
          </div>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card
      className={cn(
        "border-l-4",
        verdictBorderColors[analysis.verdict]
      )}
      data-testid={`card-analysis-${analysis.id}`}
    >
      <CardHeader>
        <div className="flex justify-between items-start gap-4 mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                Original Claim
              </span>
              {analysis.impactMode && (
                <span className="text-xs bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 px-2 py-0.5 rounded">
                  High-Impact
                </span>
              )}
            </div>
            <p className="text-base font-medium text-foreground italic leading-relaxed">
              {analysis.claim}
            </p>
            {analysis.context && (
              <p className="text-sm text-muted-foreground mt-2 pt-2 border-t italic">
                <span className="font-semibold not-italic">Context: </span>
                {analysis.context}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <VerdictBadge verdict={analysis.verdict} size="md" />
          <span className="text-xs text-muted-foreground">
            {format(new Date(analysis.analyzedAt), "MMM d, yyyy 'at' h:mm a")}
          </span>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <ConfidenceMeter score={analysis.confidenceScore} />

        <div>
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-semibold text-foreground">
              AI Reasoning
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              data-testid="button-copy-reasoning"
            >
              <Copy className="h-4 w-4 mr-1" />
              Copy
            </Button>
          </div>
          <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
            {analysis.reasoning}
          </p>
        </div>

        {analysis.sourceUrls && analysis.sourceUrls.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-2">
              Referenced Sources
            </h3>
            <ul className="space-y-1">
              {analysis.sourceUrls.map((url, index) => (
                <li key={index}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-primary hover:underline flex items-center gap-1"
                  >
                    <ExternalLink className="h-3 w-3" />
                    {url}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {onDelete && (
          <div className="pt-2 border-t">
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onDelete(analysis.id)}
              data-testid="button-delete-analysis"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Analysis
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
