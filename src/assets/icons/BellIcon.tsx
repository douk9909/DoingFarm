import { SVGProps } from 'react';

interface CheckActiveIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

export default function BellIcon({ size = 24, color, ...props }: CheckActiveIconProps) {
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
        d="M15.75 21a.75.75 0 0 1-.75.75H9a.75.75 0 1 1 0-1.5h6a.75.75 0 0 1 .75.75m5.045-4.506c-.522-.896-1.295-3.432-1.295-6.744a7.5 7.5 0 0 0-15 0c0 3.313-.774 5.848-1.295 6.744A1.5 1.5 0 0 0 4.5 18.75h15a1.5 1.5 0 0 0 1.294-2.256"
      />
    </svg>
  );
}
