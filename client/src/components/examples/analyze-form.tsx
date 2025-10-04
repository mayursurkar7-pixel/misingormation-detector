import { AnalyzeForm } from '../analyze-form';

export default function AnalyzeFormExample() {
  return (
    <div className="p-8 bg-background max-w-3xl mx-auto">
      <AnalyzeForm
        onAnalyze={(data) => console.log('Analyze:', data)}
        isAnalyzing={false}
      />
    </div>
  );
}
