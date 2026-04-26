import Link from 'next/link';

const baseClasses =
  'inline-flex items-center justify-center rounded-full border border-white/12 bg-white/[0.03] px-5 py-3 text-sm font-semibold text-white hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.08] disabled:cursor-not-allowed disabled:opacity-60';

export default function SecondaryButton({
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
