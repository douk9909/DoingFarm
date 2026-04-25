import { SVGProps } from 'react';

interface CheckActiveIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

export default function ArrowLeftIcon({ size = 24, color, ...props }: CheckActiveIconProps) {
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
        d="M15.796 18.704a1.127 1.127 0 1 1-1.594 1.594l-7.5-7.5a1.125 1.125 0 0 1 0-1.594l7.5-7.5a1.127 1.127 0 1 1 1.594 1.594L9.094 12z"
      />
    </svg>
  );
}
