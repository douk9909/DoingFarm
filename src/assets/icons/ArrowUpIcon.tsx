import { SVGProps } from 'react';

interface CheckActiveIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

export default function ArrowUpIcon({ size = 24, color, ...props }: CheckActiveIconProps) {
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
        d="M20.296 15.796a1.124 1.124 0 0 1-1.594 0L12 9.094l-6.704 6.702a1.127 1.127 0 1 1-1.594-1.594l7.5-7.5a1.127 1.127 0 0 1 1.594 0l7.5 7.5a1.125 1.125 0 0 1 0 1.594"
      />
    </svg>
  );
}
