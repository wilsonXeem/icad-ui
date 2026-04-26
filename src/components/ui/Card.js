export default function Card({ children, className = '' }) {
  return <div className={`panel p-6 sm:p-8 ${className}`}>{children}</div>;
}
