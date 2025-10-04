import { VerdictBadge } from '../verdict-badge';

export default function VerdictBadgeExample() {
  return (
    <div className="flex flex-col gap-4 p-8 bg-background">
      <div className="flex gap-4 items-center">
        <VerdictBadge verdict="safe" size="sm" />
        <VerdictBadge verdict="caution" size="sm" />
        <VerdictBadge verdict="danger" size="sm" />
        <VerdictBadge verdict="neutral" size="sm" />
      </div>
      <div className="flex gap-4 items-center">
        <VerdictBadge verdict="safe" />
        <VerdictBadge verdict="caution" />
        <VerdictBadge verdict="danger" />
        <VerdictBadge verdict="neutral" />
      </div>
      <div className="flex gap-4 items-center">
        <VerdictBadge verdict="safe" size="lg" />
        <VerdictBadge verdict="caution" size="lg" />
      </div>
    </div>
  );
}
