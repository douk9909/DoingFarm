import { SVGProps } from 'react';

interface CheckActiveIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

export default function ArrowDownIcon({ size = 24, color, ...props }: CheckActiveIconProps) {
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
        d="m20.296 9.796-7.5 7.5a1.124 1.124 0 0 1-1.594 0l-7.5-7.5a1.127 1.127 0 1 1 1.594-1.594L12 14.906l6.704-6.705a1.127 1.127 0 0 1 1.594 1.594z"
      />
    </svg>
  );
}
