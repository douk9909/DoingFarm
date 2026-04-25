import { SVGProps } from 'react';

interface CheckActiveIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

export default function CrownIcon({ size = 24, color, ...props }: CheckActiveIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color || '#0b8a0b'}
      {...props}
    >
      <path d="M22.477 8.513q.002.015-.007.03l-2.126 9.738A1.5 1.5 0 0 1 18.87 19.5H5.13a1.5 1.5 0 0 1-1.473-1.219L1.53 8.543q-.002-.015-.006-.03a1.5 1.5 0 0 1 2.601-1.258l3.157 3.403 3.356-7.528v-.009a1.5 1.5 0 0 1 2.725 0v.01l3.356 7.527 3.156-3.403a1.5 1.5 0 0 1 2.598 1.258z" />
    </svg>
  );
}
