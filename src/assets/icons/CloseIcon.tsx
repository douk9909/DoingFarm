import { SVGProps } from 'react';

interface CheckActiveIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

export default function CloseIcon({ size = 24, color, ...props }: CheckActiveIconProps) {
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
        d="M19.546 17.954a1.127 1.127 0 0 1-1.594 1.594L12 13.594l-5.954 5.952a1.127 1.127 0 0 1-1.594-1.594L10.406 12 4.454 6.046a1.127 1.127 0 0 1 1.594-1.594L12 10.406l5.954-5.955a1.127 1.127 0 0 1 1.594 1.594L13.594 12z"
      />
    </svg>
  );
}
