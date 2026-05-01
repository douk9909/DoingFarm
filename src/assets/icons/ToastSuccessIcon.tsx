import { SVGProps } from 'react';

interface ToastSuccessIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

export default function ToastSuccessIcon({ size = 24, color, ...props }: ToastSuccessIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      {...props}
    >
      <circle cx="12" cy="12" r="10" fill="none" stroke={color || 'white'} stroke-width="2" />

      <path
        d="M7.5 12.5L10.5 15.5L16.5 9"
        stroke={color || 'white'}
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
