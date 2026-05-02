import { SVGProps } from 'react';

interface ToastErrorIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

export default function ToastErrorIcon({ size = 24, color, ...props }: ToastErrorIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      {...props}
    >
      <circle cx="12" cy="12" r="10" fill="none" stroke="#FFFFFF" strokeWidth="2" />
      <path d="M8 8L16 16M16 8L8 16" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}
