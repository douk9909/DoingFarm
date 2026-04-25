import { SVGProps } from 'react';

interface CheckActiveIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

export default function MoreIcon({ size = 24, color, ...props }: CheckActiveIconProps) {
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
        d="M13.5 12a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m-7.875-1.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m12.75 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3"
      />
    </svg>
  );
}
