import Link from "next/link";

type Props = {
  children: React.ReactNode;
  href?: string;
  big?: boolean;
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
  // Opens another site in a new tab.
  external?: boolean;
  // Filled umber call to action with a larger, bolder label.
  solid?: boolean;
};

// Outlined label button. The fill wipes up on hover and the label switches to
// the surrounding background colour (--bg, set by data-theme / data-tone).
// The solid variant is filled umber and wipes to ink on hover.
export default function Button({ children, href, big, className = "", type = "button", onClick, disabled, external, solid }: Props) {
  const classes = `group relative inline-flex items-center justify-center overflow-hidden border ${
    solid
      ? "border-umber bg-umber text-bone transition-colors duration-700 hover:border-ink shadow-[0_10px_30px_-12px_rgba(123,81,54,0.7)] text-[0.82rem] font-semibold uppercase tracking-[0.08em]"
      : "border-current t-label"
  } ${big ? "px-7 py-4" : "px-4 py-2.5"} ${className}`;

  const inner = (
    <>
      <span
        className={`absolute inset-0 origin-bottom scale-y-0 transition-transform duration-700 ease-cubic group-hover:scale-y-100 ${
          solid ? "bg-ink" : "bg-current"
        }`}
      />
      <span
        className={`relative whitespace-nowrap transition-colors duration-500 ease-cubic ${solid ? "" : "group-hover:text-[var(--bg)]"}`}
      >
        {children}
      </span>
    </>
  );

  if (href && external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={classes}>
        {inner}
      </a>
    );
  }

  if (href) {
    return (
      <Link href={href} className={classes} onClick={onClick}>
        {inner}
      </Link>
    );
  }

  return (
    <button type={type} className={`${classes} disabled:opacity-50`} onClick={onClick} disabled={disabled}>
      {inner}
    </button>
  );
}
