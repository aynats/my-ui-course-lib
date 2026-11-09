import type { SVGProps } from 'react';

export type CalendarIconProps = SVGProps<SVGSVGElement>;

export const CalendarIcon = (props: CalendarIconProps) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    {...props}
  >
    <rect
      x="2"
      y="3"
      width="12"
      height="11"
      rx="2.5"
      strokeWidth="1.5"
      stroke="currentColor"
    />
    <rect x="2" y="6.25" width="12" height="1.5" fill="currentColor" />
    <rect x="4.75" y="1.25" width="1.5" height="3.5" rx="0.75" fill="currentColor" />
    <rect x="9.75" y="1.25" width="1.5" height="3.5" rx="0.75" fill="currentColor" />
  </svg>
);