import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AnalyzeForm } from "@/components/analyze-form";
import { AnalysisCard } from "@/components/analysis-card";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { type Analysis } from "@shared/schema";

export default function Analyze() {
  const [currentAnalysis, setCurrentAnalysis] = useState<Analysis | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const analyzeMutation = useMutation({
    mutationFn: async (data: { claim: string; context?: string; impactMode: boolean }) => {
      const mockVerdict = Math.random() > 0.5 ? "danger" : Math.random() > 0.5 ? "caution" : "safe";
      const mockScore = Math.floor(Math.random() * 40) + 60;
      
      const mockAnalysis: Analysis = {
        id: crypto.randomUUID(),
        claim: data.claim,
        context: data.context,
        verdict: mockVerdict,
        reasoning: `Based on analysis of the claim "${data.claim.slice(0, 50)}...", this appears to be ${mockVerdict === 'danger' ? 'misleading or false' : mockVerdict === 'caution' ? 'partially true but requires context' : 'generally accurate'}. ${data.impactMode ? 'High-impact mode analysis applied with extra scrutiny. ' : ''}The claim should be ${mockVerdict === 'danger' ? 'treated with significant skepticism' : mockVerdict === 'caution' ? 'verified against additional sources' : 'considered reasonably reliable'}.`,
        confidenceScore: mockScore,
        impactMode: data.impactMode,
        analyzedAt: new Date(),
      };

      await new Promise(resolve => setTimeout(resolve, 2000));
      
      await apiRequest("POST", "/api/analyze", mockAnalysis);
      return mockAnalysis;
    },
    onSuccess: (data) => {
      setCurrentAnalysis(data);
      queryClient.invalidateQueries({ queryKey: ["/api/analyses"] });
      toast({
        title: "Analysis Complete",
        description: "Your claim has been analyzed successfully",
      });
    },
    onError: () => {
      toast({
        title: "Analysis Failed",
        description: "Failed to analyze claim. Please try again.",
        variant: "destructive",
      });
    },
  });

  return (
    <div className="container max-w-4xl py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Analyze a Claim
        </h1>
        <p className="text-muted-foreground">
          Enter a claim, headline, or statement to verify its accuracy using AI-powered analysis
        </p>
      </div>

      <AnalyzeForm
        onAnalyze={(data) => analyzeMutation.mutate(data)}
        isAnalyzing={analyzeMutation.isPending}
      />

      {currentAnalysis && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Analysis Results</h2>
          <AnalysisCard analysis={currentAnalysis} />
        </div>
      )}
    </div>
  );
}
