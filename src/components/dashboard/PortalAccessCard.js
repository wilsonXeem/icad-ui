import Card from '@/components/ui/Card';
import PrimaryButton from '@/components/ui/PrimaryButton';
import SecondaryButton from '@/components/ui/SecondaryButton';

export default function PortalAccessCard() {
  return (
    <Card className="h-full">
      <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Activity Portal Access</p>
      <h3 className="mt-4 font-heading text-2xl font-semibold text-white">Move into your submission workspace.</h3>
      <p className="mt-4 text-sm leading-7 text-slate-300">
        Use the activity portal for assignment delivery, instructor feedback visibility, and future research task
        coordination.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <PrimaryButton href="/activity-portal">Open activity portal</PrimaryButton>
        <SecondaryButton href="/contact">Contact support</SecondaryButton>
      </div>
    </Card>
  );
}
