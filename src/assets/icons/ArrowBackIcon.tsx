import { SVGProps } from 'react';

interface CheckActiveIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

export default function ArrowBackIcon({ size = 24, color, ...props }: CheckActiveIconProps) {
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
        fill={color || '#fafafa'}
        d="M21.375 12a1.125 1.125 0 0 1-1.125 1.125H6.469l4.83 4.83a1.127 1.127 0 0 1-1.594 1.593l-6.75-6.75a1.125 1.125 0 0 1 0-1.594l6.75-6.75a1.127 1.127 0 0 1 1.594 1.594l-4.83 4.827h13.78A1.125 1.125 0 0 1 21.376 12"
      />
    </svg>
  );
}
