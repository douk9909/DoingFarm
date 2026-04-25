import { SVGProps } from 'react';

interface CheckActiveIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

export default function ImageIcon({ size = 24, color, ...props }: CheckActiveIconProps) {
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
        d="M20.25 3.75H6.75a1.5 1.5 0 0 0-1.5 1.5v1.5h-1.5a1.5 1.5 0 0 0-1.5 1.5v10.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-1.5h1.5a1.5 1.5 0 0 0 1.5-1.5V5.25a1.5 1.5 0 0 0-1.5-1.5m-4.125 3a1.125 1.125 0 1 1 0 2.25 1.125 1.125 0 0 1 0-2.25m1.125 12H3.75V8.25h1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h10.5zm3-3H6.75v-4.435l2.844-2.846a.75.75 0 0 1 1.062 0l4.654 4.656 2.409-2.406a.75.75 0 0 1 1.06 0l1.471 1.475z"
      />
    </svg>
  );
}
