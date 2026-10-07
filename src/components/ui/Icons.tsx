/**
 * Inline SVG-iconen. Bewust geen icon-library: dit scheelt een dependency,
 * een netwerkverzoek en kilobytes JavaScript op mobiel.
 *
 * De dienst-iconen zijn getekend als schematische symbolen — een groepenkast,
 * een wandcontactdoos, een laadpaal — in plaats van generieke pictogrammen.
 * Dat past bij de technische toon van deze site.
 */
type IconProps = { className?: string };

const base = "shrink-0";

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

export function PhoneIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg className={`${base} ${className}`} viewBox="0 0 24 24" {...stroke} strokeWidth="1.9" aria-hidden="true">
      <path d="M6.6 3.5h-2a1.7 1.7 0 0 0-1.7 1.9A16.8 16.8 0 0 0 18.6 21a1.7 1.7 0 0 0 1.9-1.7v-2a1.7 1.7 0 0 0-1.5-1.7 10 10 0 0 1-2.2-.5 1.7 1.7 0 0 0-1.8.4l-.8.8a13.4 13.4 0 0 1-5-5l.8-.8a1.7 1.7 0 0 0 .4-1.8 10 10 0 0 1-.5-2.2 1.7 1.7 0 0 0-1.7-1.5Z" />
    </svg>
  );
}

export function WhatsAppIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg className={`${base} ${className}`} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2C6.6 2 2.2 6.4 2.2 11.84a9.76 9.76 0 0 0 1.35 4.95L2 22l5.36-1.4a9.9 9.9 0 0 0 4.68 1.19h.01c5.43 0 9.84-4.4 9.84-9.84 0-2.63-1.03-5.1-2.89-6.96A9.77 9.77 0 0 0 12.04 2Zm0 18.03h-.01a8.2 8.2 0 0 1-4.17-1.14l-.3-.18-3.1.81.83-3.02-.2-.31a8.14 8.14 0 0 1-1.25-4.35c0-4.52 3.68-8.19 8.2-8.19 2.19 0 4.25.85 5.8 2.4a8.14 8.14 0 0 1 2.4 5.8c0 4.51-3.68 8.18-8.2 8.18Zm4.5-6.13c-.25-.13-1.46-.72-1.69-.8-.22-.08-.39-.13-.55.12-.17.25-.63.8-.77.96-.14.17-.28.19-.53.06-.24-.12-1.04-.38-1.98-1.22-.73-.65-1.23-1.46-1.37-1.7-.14-.25-.02-.38.11-.5.11-.12.25-.3.37-.44.12-.15.16-.25.25-.42.08-.17.04-.31-.02-.44-.06-.12-.55-1.34-.76-1.83-.2-.48-.4-.41-.55-.42h-.47c-.17 0-.44.06-.67.31-.23.25-.87.86-.87 2.09s.9 2.42 1.02 2.59c.12.16 1.76 2.69 4.26 3.77.6.26 1.06.41 1.42.52.6.19 1.14.17 1.57.1.48-.07 1.47-.6 1.68-1.19.2-.58.2-1.08.14-1.18-.06-.11-.22-.17-.47-.3Z" />
    </svg>
  );
}

export function ArrowRightIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg className={`${base} ${className}`} viewBox="0 0 24 24" {...stroke} strokeWidth="2" aria-hidden="true">
      <path d="M5 12h14m-6-6 6 6-6 6" />
    </svg>
  );
}

export function CheckIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg className={`${base} ${className}`} viewBox="0 0 24 24" {...stroke} strokeWidth="2.2" aria-hidden="true">
      <path d="m4.5 12.5 5 5 10-11" />
    </svg>
  );
}

export function StarIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg className={`${base} ${className}`} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="m12 2.6 2.9 5.9 6.5.95-4.7 4.58 1.11 6.47L12 17.45 6.19 20.5l1.1-6.47-4.69-4.58 6.5-.95L12 2.6Z" />
    </svg>
  );
}

export function MapPinIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg className={`${base} ${className}`} viewBox="0 0 24 24" {...stroke} strokeWidth="1.8" aria-hidden="true">
      <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.6" />
    </svg>
  );
}

export function MailIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg className={`${base} ${className}`} viewBox="0 0 24 24" {...stroke} strokeWidth="1.8" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="1" />
      <path d="m3.5 6.5 8.5 6 8.5-6" />
    </svg>
  );
}

export function ClockIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg className={`${base} ${className}`} viewBox="0 0 24 24" {...stroke} strokeWidth="1.8" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5.2l3.2 2" />
    </svg>
  );
}

export function ChevronDownIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg className={`${base} ${className}`} viewBox="0 0 24 24" {...stroke} strokeWidth="2" aria-hidden="true">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function MenuIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg className={`${base} ${className}`} viewBox="0 0 24 24" {...stroke} strokeWidth="2" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function CloseIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg className={`${base} ${className}`} viewBox="0 0 24 24" {...stroke} strokeWidth="2" aria-hidden="true">
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

/** Waarschuwing — storing, spoed, veiligheid. */
export function AlertIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg className={`${base} ${className}`} viewBox="0 0 24 24" {...stroke} strokeWidth="1.9" aria-hidden="true">
      <path d="M12 3.6 2.6 19.4h18.8L12 3.6Z" />
      <path d="M12 9.6v4.3M12 16.9h.01" />
    </svg>
  );
}

/* ── Dienst-symbolen ────────────────────────────────────────────────────── */

/** Storing / stroom. */
export function BoltIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg className={`${base} ${className}`} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13.6 2 5.2 13.1a.6.6 0 0 0 .48.96h4.4L9.1 22l8.52-11.2a.6.6 0 0 0-.48-.96h-4.3L13.6 2Z" />
    </svg>
  );
}

/** Groepenkast — installatieautomaten op een DIN-rail. */
export function PanelIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg className={`${base} ${className}`} viewBox="0 0 24 24" {...stroke} strokeWidth="1.6" aria-hidden="true">
      <rect x="3" y="3.5" width="18" height="17" rx="1" />
      <path d="M3 8.6h18M3 15.2h18" />
      <path d="M7 5.6v1.6M11 5.6v1.6M15 5.6v1.6M19 5.6v1.6" />
      <path d="M7 10.8v2.2M11 10.8v2.2M15 10.8v2.2" />
    </svg>
  );
}

/** Wandcontactdoos. */
export function SocketIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg className={`${base} ${className}`} viewBox="0 0 24 24" {...stroke} strokeWidth="1.6" aria-hidden="true">
      <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="1" />
      <circle cx="12" cy="12" r="5.4" />
      <circle cx="9.9" cy="12" r="1" fill="currentColor" stroke="none" />
      <circle cx="14.1" cy="12" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Verlichting. */
export function LightIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg className={`${base} ${className}`} viewBox="0 0 24 24" {...stroke} strokeWidth="1.6" aria-hidden="true">
      <path d="M12 3a5.8 5.8 0 0 0-3.4 10.5c.5.4.8 1 .8 1.6v.4h5.2v-.4c0-.6.3-1.2.8-1.6A5.8 5.8 0 0 0 12 3Z" />
      <path d="M9.9 18.4h4.2M10.6 21h2.8" />
    </svg>
  );
}

/** Laadpaal. */
export function ChargerIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg className={`${base} ${className}`} viewBox="0 0 24 24" {...stroke} strokeWidth="1.6" aria-hidden="true">
      <rect x="4.2" y="2.8" width="10" height="18.4" rx="1" />
      <path d="M4.2 7.4h10" />
      <path d="M10.4 10.6 7.8 14.4h3l-1.2 3.4 3.1-4.2h-2.9l1-3Z" fill="currentColor" stroke="none" />
      <path d="M14.2 9.8h3.1a2 2 0 0 1 2 2v4.3a1.5 1.5 0 0 0 3 0v-4.6" />
    </svg>
  );
}

/** Renovatie — kabel door de wand. */
export function RenovationIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg className={`${base} ${className}`} viewBox="0 0 24 24" {...stroke} strokeWidth="1.6" aria-hidden="true">
      <path d="M3 20.5V9.2L12 3l9 6.2v11.3" />
      <path d="M7.5 20.5v-6.2a2.4 2.4 0 0 1 4.8 0v3.4a2.4 2.4 0 0 0 4.8 0v-5" />
    </svg>
  );
}

/** Zakelijk — bedrijfspand. */
export function BuildingIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg className={`${base} ${className}`} viewBox="0 0 24 24" {...stroke} strokeWidth="1.6" aria-hidden="true">
      <path d="M3.5 21h17" />
      <rect x="4.5" y="3" width="10" height="18" rx="1" />
      <path d="M14.5 9.5h5v11.5" />
      <path d="M7.4 7h1.6M11 7h1.6M7.4 11h1.6M11 11h1.6M7.4 15h1.6M11 15h1.6M16.6 13h1M16.6 16.6h1" />
    </svg>
  );
}

/** Beeldmerk: bliksem in een vierkant. Vervangbaar door een echt logo. */
export function BoltMark({ className = "h-9 w-9" }: IconProps) {
  return (
    <svg className={`${base} ${className}`} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <rect width="40" height="40" fill="currentColor" />
      <path
        d="M22.4 7 13 22.2h5.6L16.8 33l10.2-16.4h-5.9L22.4 7Z"
        fill="#FFB300"
      />
    </svg>
  );
}
