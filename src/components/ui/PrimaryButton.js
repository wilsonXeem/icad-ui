import Link from 'next/link';

const baseClasses =
  'inline-flex items-center justify-center rounded-full border border-accent/40 bg-accent px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-accent/20 hover:-translate-y-0.5 hover:bg-[#6ae4d4] disabled:cursor-not-allowed disabled:opacity-60';

export default function PrimaryButton({
  href,
  children,
  className = '',
  type = 'button',
  disabled,
  onClick,
}) {
  if (href) {
    return (
      <Link href={href} onClick={onClick} className={`${baseClasses} ${className}`}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} disabled={disabled} onClick={onClick} className={`${baseClasses} ${className}`}>
      {children}
    </button>
  );
}
