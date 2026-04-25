import { SVGProps } from 'react';

interface CheckActiveIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

export default function InstagramIcon({ size = 24, color, ...props }: CheckActiveIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <g fill={color || '#a39fb2'} clip-path="url(#a)">
        <path d="M15.584 21.083H6.417a5.5 5.5 0 0 1-5.5-5.5V6.416a5.5 5.5 0 0 1 5.5-5.5h9.167a5.5 5.5 0 0 1 5.5 5.5v9.167a5.5 5.5 0 0 1-5.5 5.5M6.417 2.749A3.667 3.667 0 0 0 2.75 6.416v9.167a3.667 3.667 0 0 0 3.667 3.666h9.167a3.667 3.667 0 0 0 3.666-3.666V6.416a3.667 3.667 0 0 0-3.666-3.667z" />
        <path d="M11 16.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11m0-9.167a3.667 3.667 0 1 0 0 7.334 3.667 3.667 0 0 0 0-7.334M16.5 5.5a.917.917 0 1 0 0-1.834.917.917 0 0 0 0 1.833" />
      </g>
      <defs>
        <clipPath id="a">
          <path fill={color || '#a39fb2'} d="M0 0h22v22H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}
