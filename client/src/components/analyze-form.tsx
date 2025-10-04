import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

interface AnalyzeFormProps {
  onAnalyze: (data: {
    claim: string;
    context?: string;
    impactMode: boolean;
  }) => void;
  isAnalyzing: boolean;
}

const exampleClaims = [
  {
    value: "Eating an apple a day cures all known diseases.",
    label: "Health: Apple-a-day cure-all",
  },
  {
    value: "El candidato prometió eliminar todos los impuestos para siempre.",
    label: "Political: Tax Promise (Spanish)",
  },
  {
    value: "Alle elektroauto-batterien halten weniger als 3 Jahre und sind nicht recycelbar.",
    label: "Technology: EV Battery (German)",
  },
  {
    value: "Drinking water with lemon every morning detoxifies your liver.",
    label: "Health: Lemon Water Detox",
  },
];

export function AnalyzeForm({ onAnalyze, isAnalyzing }: AnalyzeFormProps) {
  const [claim, setClaim] = useState("");
  const [context, setContext] = useState("");
  const [impactMode, setImpactMode] = useState(false);
  const [useContext, setUseContext] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!claim.trim()) return;

    onAnalyze({
      claim: claim.trim(),
      context: useContext ? context.trim() : undefined,
      impactMode,
    });
  };

  const wordCount = claim.trim().split(/\s+/).filter(Boolean).length;
  const charCount = claim.length;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Analyze a Claim</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="example-select" className="text-sm font-medium mb-2 block">
              Try an Example Claim
            </Label>
            <Select onValueChange={(value) => setClaim(value)}>
              <SelectTrigger id="example-select" data-testid="select-example">
                <SelectValue placeholder="Select a predefined claim" />
              </SelectTrigger>
              <SelectContent>
                {exampleClaims.map((example) => (
                  <SelectItem key={example.value} value={example.value}>
                    {example.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Textarea
              id="claim-input"
              placeholder="Paste a headline, tweet, or claim here..."
              value={claim}
              onChange={(e) => setClaim(e.target.value)}
              rows={5}
              maxLength={500}
              data-testid="input-claim"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>Claim Length: {wordCount} words</span>
              <span>
                {charCount} / 500 characters
              </span>
            </div>
          </div>

          <div className="space-y-3 p-4 border rounded-lg bg-muted/30">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="impact-mode"
                checked={impactMode}
                onCheckedChange={(checked) => setImpactMode(checked as boolean)}
                data-testid="checkbox-impact"
              />
              <Label htmlFor="impact-mode" className="text-sm font-semibold cursor-pointer">
                High-Impact Mode (Apply extra skepticism for sensitive topics)
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="context-toggle"
                checked={useContext}
                onCheckedChange={(checked) => setUseContext(checked as boolean)}
                data-testid="checkbox-context"
              />
              <Label htmlFor="context-toggle" className="text-sm font-semibold cursor-pointer">
                Add Optional Background Context
              </Label>
            </div>

            {useContext && (
              <Textarea
                id="context-input"
                placeholder="e.g., 'This came from a meme page on social media' or 'This is about a 2020 election bill'"
                value={context}
                onChange={(e) => setContext(e.target.value)}
                rows={2}
                className="bg-background"
                data-testid="input-context"
              />
            )}
          </div>

          <div className="flex gap-3">
            <Button
              type="submit"
              disabled={!claim.trim() || isAnalyzing}
              className="flex-1"
              data-testid="button-analyze"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                "Analyze Claim"
              )}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setClaim("");
                setContext("");
                setImpactMode(false);
                setUseContext(false);
              }}
              disabled={isAnalyzing}
              data-testid="button-reset"
            >
              Reset
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
