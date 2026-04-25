import { SVGProps } from 'react';

interface CheckActiveIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

export default function PlusIcon({ size = 24, color, ...props }: CheckActiveIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color || '#a39fb2'}
      {...props}
    >
      <path d="M21.375 12a1.125 1.125 0 0 1-1.125 1.125h-7.125v7.125a1.125 1.125 0 1 1-2.25 0v-7.125H3.75a1.125 1.125 0 1 1 0-2.25h7.125V3.75a1.125 1.125 0 1 1 2.25 0v7.125h7.125A1.125 1.125 0 0 1 21.375 12" />
    </svg>
  );
}
