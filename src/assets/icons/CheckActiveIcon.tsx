import { SVGProps } from 'react';

interface CheckActiveIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

export default function CheckActiveIcon({ size = 24, color, ...props }: CheckActiveIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <rect width="20" height="20" fill={color || '#00a200'} rx="10" />
      <path
        stroke="#f8f8fa"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="m5 10 4 4 6-8"
      />
    </svg>
  );
}
