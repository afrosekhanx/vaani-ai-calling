// Small logo: four sound bars inside a rounded square.
export default function LogoMark({ size = 30 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <rect width="32" height="32" rx="9" fill="#5B4BFF" />
      <g fill="#fff">
        <rect x="7" y="13" width="3" height="6" rx="1.5" />
        <rect x="12" y="8" width="3" height="16" rx="1.5" />
        <rect x="17" y="11" width="3" height="10" rx="1.5" />
        <rect x="22" y="14" width="3" height="4" rx="1.5" />
      </g>
    </svg>
  );
}
