import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

const base: IconProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  focusable: false,
};

export const ArrowDown = (p: IconProps) => (
  <svg {...base} {...p}><path d="M12 4v16M5 13l7 7 7-7" /></svg>
);
export const ArrowUp = (p: IconProps) => (
  <svg {...base} {...p}><path d="M12 20V4M5 11l7-7 7 7" /></svg>
);
export const ArrowRight = (p: IconProps) => (
  <svg {...base} {...p}><path d="M4 12h16M13 5l7 7-7 7" /></svg>
);
export const ArrowLeft = (p: IconProps) => (
  <svg {...base} {...p}><path d="M20 12H4M11 5l-7 7 7 7" /></svg>
);
export const Search = (p: IconProps) => (
  <svg {...base} {...p}><circle cx="11" cy="11" r="6.5" /><path d="m20 20-4.2-4.2" /></svg>
);
export const Check = (p: IconProps) => (
  <svg {...base} {...p}><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>
);
export const Question = (p: IconProps) => (
  <svg {...base} {...p}><circle cx="12" cy="12" r="9" /><path d="M9.6 9.4a2.5 2.5 0 1 1 3.3 2.4c-.6.2-.9.8-.9 1.4v.5M12 16.8v.2" /></svg>
);
export const Cross = (p: IconProps) => (
  <svg {...base} {...p}><path d="M6 6l12 12M18 6 6 18" /></svg>
);
export const Replay = (p: IconProps) => (
  <svg {...base} {...p}><path d="M4 12a8 8 0 1 0 2.4-5.7M4 4v4.5h4.5" /></svg>
);
export const Play = (p: IconProps) => (
  <svg {...base} {...p}><path d="M8 5.5v13l10-6.5z" /></svg>
);
export const Pause = (p: IconProps) => (
  <svg {...base} {...p}><path d="M9 5v14M15 5v14" /></svg>
);
export const Menu = (p: IconProps) => (
  <svg {...base} {...p}><path d="M4 8h16M4 16h16" /></svg>
);
export const Doc = (p: IconProps) => (
  <svg {...base} {...p}><path d="M7 3h7l4 4v14H7zM14 3v4h4M10 12h5M10 16h5" /></svg>
);
export const Mail = (p: IconProps) => (
  <svg {...base} {...p}><rect x="3.5" y="5.5" width="17" height="13" rx="1.5" /><path d="m4 7 8 6 8-6" /></svg>
);
