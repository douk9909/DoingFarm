import { SVGProps } from 'react';

interface CheckActiveIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

export default function UserPlusIcon({ size = 24, color, ...props }: CheckActiveIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <g clipPath="url(#a)">
        <path
          fill={color || '#a39fb2'}
          d="M24 12.75a.75.75 0 0 1-.75.75h-1.5V15a.75.75 0 1 1-1.5 0v-1.5h-1.5a.75.75 0 0 1 0-1.5h1.5v-1.5a.75.75 0 1 1 1.5 0V12h1.5a.75.75 0 0 1 .75.75m-10.5 2.032a6.375 6.375 0 1 0-6.74 0c-1.937.634-3.678 1.818-5.079 3.485A.75.75 0 0 0 2.25 19.5H18a.75.75 0 0 0 .575-1.233c-1.402-1.667-3.144-2.85-5.075-3.485"
        />
      </g>
      <defs>
        <clipPath id="a">
          <path fill={color || '#a39fb2'} d="M0 0h24v24H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}
