import { ConfidenceMeter } from '../confidence-meter';

export default function ConfidenceMeterExample() {
  return (
    <div className="flex flex-col gap-6 p-8 bg-background max-w-md">
      <ConfidenceMeter score={95} />
      <ConfidenceMeter score={75} />
      <ConfidenceMeter score={45} />
    </div>
  );
}
