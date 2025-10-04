import { EmptyState } from '../empty-state';

export default function EmptyStateExample() {
  return (
    <div className="bg-background p-8">
      <EmptyState
        title="No analyses yet"
        description="Start analyzing claims to build your fact-check history"
        action={{
          label: "Analyze Your First Claim",
          onClick: () => console.log('Action clicked'),
        }}
      />
    </div>
  );
}
