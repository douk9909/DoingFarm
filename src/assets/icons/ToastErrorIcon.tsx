import { SVGProps } from 'react';

interface CheckActiveIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

export default function SidebarIcon({ size = 24, color, ...props }: CheckActiveIconProps) {
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
        fill={color || 'currentColor'}
        fillRule="evenodd"
        d="M1 9.063a8.062 8.062 0 1 1 16.125 0A8.062 8.062 0 0 1 1 9.062m8.063-6.938a6.937 6.937 0 1 0 0 13.875 6.937 6.937 0 0 0 0-13.875"
        clipRule="evenodd"
      />
      <path
        fill={color || 'currentColor'}
        fillRule="evenodd"
        d="M14.197 15.053 2.947 3.803l.849-.848 11.25 11.25z"
        clipRule="evenodd"
      />
    </svg>
  );
}
