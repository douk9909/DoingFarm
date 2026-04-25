import { SVGProps } from 'react';

interface CheckActiveIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

export default function FacebookIcon({ size = 24, color, ...props }: CheckActiveIconProps) {
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
        d="M18.346 1.066H3.47A2.914 2.914 0 0 0 .555 3.981v14.877a2.914 2.914 0 0 0 2.914 2.914h6.77v-7.557H7.68v-2.948h2.56V9.095q0-1.846 1.02-2.866 1.022-1.022 2.77-1.023 1.751.002 2.269.131v2.624h-1.556q-.841 0-1.15.358-.307.355-.307 1.069v1.879h2.916l-.388 2.948h-2.528v7.557h5.06a2.914 2.914 0 0 0 2.915-2.914V3.98a2.914 2.914 0 0 0-2.915-2.915"
      />
    </svg>
  );
}
