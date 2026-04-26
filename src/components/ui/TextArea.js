export default function TextArea({ label, name, placeholder, register, error, rows = 5, ...props }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-200">{label}</span>
      <textarea
        rows={rows}
        placeholder={placeholder}
        {...(register ? register(name) : {})}
        {...props}
        className="w-full rounded-2xl border border-white/12 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-accent/40 focus:outline-none focus:ring-2 focus:ring-accent/20"
      />
      {error ? <span className="mt-2 block text-sm text-rose-300">{error.message}</span> : null}
    </label>
  );
}
