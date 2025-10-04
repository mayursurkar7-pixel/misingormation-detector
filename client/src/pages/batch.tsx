import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Loader2 } from "lucide-react";
import { AnalysisCard } from "@/components/analysis-card";
import { type Analysis } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

export default function Batch() {
  const [claims, setClaims] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState<Analysis[]>([]);
  const { toast } = useToast();

  const handleBatchAnalysis = async () => {
    const claimList = claims
      .split("\n")
      .map((c) => c.trim())
      .filter(Boolean);

    if (claimList.length === 0) {
      toast({
        title: "No claims provided",
        description: "Please enter at least one claim to analyze",
        variant: "destructive",
      });
      return;
    }

    if (claimList.length > 10) {
      toast({
        title: "Too many claims",
        description: "Please limit batch analysis to 10 claims at a time",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    setResults([]);

    await new Promise((resolve) => setTimeout(resolve, 3000));

    const mockResults: Analysis[] = claimList.map((claim, index) => {
      const verdicts: Array<"safe" | "caution" | "danger" | "neutral"> = ["safe", "caution", "danger", "neutral"];
      const verdict = verdicts[index % verdicts.length];
      return {
        id: crypto.randomUUID(),
        claim,
        verdict,
        reasoning: `Analysis for claim ${index + 1}: This statement appears to be ${verdict}.`,
        confidenceScore: Math.floor(Math.random() * 30) + 65,
        impactMode: false,
        analyzedAt: new Date(),
      };
    });

    setResults(mockResults);
    setIsProcessing(false);
    toast({
      title: "Batch Analysis Complete",
      description: `Successfully analyzed ${mockResults.length} claims`,
    });
  };

  return (
    <div className="container max-w-6xl py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Batch Analysis</h1>
        <p className="text-muted-foreground">
          Analyze multiple claims at once (up to 10 claims per batch)
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Enter Claims</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-2 border-dashed rounded-lg p-8 text-center bg-muted/30">
            <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-sm text-muted-foreground mb-2">
              Enter one claim per line (max 10 claims)
            </p>
          </div>

          <Textarea
            placeholder="Claim 1&#10;Claim 2&#10;Claim 3&#10;..."
            value={claims}
            onChange={(e) => setClaims(e.target.value)}
            rows={8}
            data-testid="input-batch-claims"
          />

          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">
              {claims.split("\n").filter(Boolean).length} claims entered
            </span>
            <div className="flex gap-2">
              <Button
                variant="secondary"
                onClick={() => {
                  setClaims("");
                  setResults([]);
                }}
                disabled={isProcessing}
                data-testid="button-clear"
              >
                Clear
              </Button>
              <Button
                onClick={handleBatchAnalysis}
                disabled={isProcessing || !claims.trim()}
                data-testid="button-analyze-batch"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Analyze All
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {results.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">
            Batch Results ({results.length})
          </h2>
          <div className="grid gap-4">
            {results.map((result) => (
              <AnalysisCard key={result.id} analysis={result} compact />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
