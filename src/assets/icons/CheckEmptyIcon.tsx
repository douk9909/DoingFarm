import { SVGProps } from 'react';

interface CheckEmptyIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

export default function CheckEmptyIcon({ size = 24, color, ...props }: CheckEmptyIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <rect x="2" y="2" width="20" height="20" fill="#4b4b4b" stroke="#787486" rx="9.5" />
    </svg>
  );
}
