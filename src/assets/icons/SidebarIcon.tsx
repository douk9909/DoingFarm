import { SVGProps } from 'react';

interface CheckActiveIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

export default function SidebarIcon({ size = 24, color, ...props }: CheckActiveIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path
        fill={color || '#a39fb2'}
        d="M20.25 3.75H3.75a1.5 1.5 0 0 0-1.5 1.5v13.5a1.5 1.5 0 0 0 1.5 1.5h16.5a1.5 1.5 0 0 0 1.5-1.5V5.25a1.5 1.5 0 0 0-1.5-1.5M6 14.25H4.5a.75.75 0 1 1 0-1.5H6a.75.75 0 1 1 0 1.5m0-3H4.5a.75.75 0 1 1 0-1.5H6a.75.75 0 0 1 0 1.5m0-3H4.5a.75.75 0 0 1 0-1.5H6a.75.75 0 0 1 0 1.5m14.25 10.5h-12V5.25h12z"
      />
    </svg>
  );
}
