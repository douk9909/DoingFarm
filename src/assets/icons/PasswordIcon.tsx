import { SVGProps } from 'react';

interface CheckActiveIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

export default function PasswordIcon({ size = 24, color, ...props }: CheckActiveIconProps) {
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
        d="M21 4.5H3A1.5 1.5 0 0 0 1.5 6v12A1.5 1.5 0 0 0 3 19.5h18a1.5 1.5 0 0 0 1.5-1.5V6A1.5 1.5 0 0 0 21 4.5m-1.82 8.88a.752.752 0 1 1-1.22.881l-.71-.985-.715.985a.752.752 0 1 1-1.22-.882l.717-.984-1.159-.375a.751.751 0 0 1 .47-1.426l1.157.375V9.75a.75.75 0 1 1 1.5 0v1.219l1.158-.375a.75.75 0 1 1 .469 1.426l-1.16.375zm-6.75 0a.752.752 0 1 1-1.22.881l-.71-.985-.715.985a.752.752 0 1 1-1.22-.882l.717-.984-1.159-.375a.75.75 0 0 1 .47-1.426l1.157.375V9.75a.75.75 0 0 1 1.5 0v1.219l1.158-.375a.75.75 0 1 1 .469 1.426l-1.16.375zM6 8.25v7.5a.75.75 0 1 1-1.5 0v-7.5a.75.75 0 0 1 1.5 0"
      />
    </svg>
  );
}
