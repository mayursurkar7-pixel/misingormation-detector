import { AnalysisCard } from '../analysis-card';
import { type Analysis } from '@shared/schema';

export default function AnalysisCardExample() {
  const sampleAnalysis: Analysis = {
    id: '1',
    claim: 'Eating an apple a day cures all known diseases.',
    context: 'This claim came from a viral social media post.',
    verdict: 'danger',
    reasoning: 'This claim is misleading and potentially dangerous. While apples are nutritious and contain beneficial compounds like fiber, vitamin C, and antioxidants, they do not cure diseases. The phrase "an apple a day keeps the doctor away" is a saying that encourages healthy eating habits, but it should not be interpreted literally as a cure-all remedy. Relying solely on apples instead of proper medical treatment could be harmful.',
    confidenceScore: 95,
    impactMode: true,
    analyzedAt: new Date(),
    sourceUrls: ['https://www.healthline.com/nutrition/10-health-benefits-of-apples', 'https://www.medicalnewstoday.com/articles/267290']
  };

  const cautionAnalysis: Analysis = {
    id: '2',
    claim: 'Studies show that coffee may reduce the risk of certain diseases.',
    verdict: 'caution',
    reasoning: 'This claim has some scientific backing but requires context. Multiple studies have suggested that moderate coffee consumption may be associated with reduced risk of certain conditions like Parkinson\'s disease, type 2 diabetes, and liver disease. However, the evidence is observational and correlational, not definitively causal. Individual responses to coffee vary greatly.',
    confidenceScore: 72,
    impactMode: false,
    analyzedAt: new Date(),
  };

  return (
    <div className="flex flex-col gap-6 p-8 bg-background max-w-3xl">
      <AnalysisCard analysis={sampleAnalysis} onDelete={(id) => console.log('Delete', id)} />
      <AnalysisCard analysis={cautionAnalysis} compact />
    </div>
  );
}
