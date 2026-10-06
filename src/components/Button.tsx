import Link from "next/link";

type Props = {
  children: React.ReactNode;
  href?: string;
  big?: boolean;
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
};

// Outlined label button. The fill wipes up on hover and the label switches to
// the surrounding background colour (--bg, set by data-theme / data-tone).
export default function Button({ children, href, big, className = "", type = "button", onClick }: Props) {
  const classes = `group relative inline-flex items-center justify-center overflow-hidden border border-current t-label ${
    big ? "px-7 py-4" : "px-4 py-2.5"
  } ${className}`;

  const inner = (
    <>
      <span className="absolute inset-0 origin-bottom scale-y-0 bg-current transition-transform duration-700 ease-cubic group-hover:scale-y-100" />
      <span className="relative whitespace-nowrap transition-colors duration-500 ease-cubic group-hover:text-[var(--bg)]">{children}</span>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes} onClick={onClick}>
        {inner}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick}>
      {inner}
    </button>
  );
}
