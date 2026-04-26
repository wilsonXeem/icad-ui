export default function EmptyState({ title, description, action }) {
  return (
    <div className="panel flex flex-col gap-4 p-8 text-center">
      <div>
        <h3 className="font-heading text-2xl font-semibold text-white">{title}</h3>
        <p className="mt-3 text-sm leading-7 text-slate-300">{description}</p>
      </div>
      {action}
    </div>
  );
}
