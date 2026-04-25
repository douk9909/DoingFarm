import { SVGProps } from 'react';

interface CheckActiveIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

export default function ArrowRightIcon({ size = 24, color, ...props }: CheckActiveIconProps) {
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
        d="m17.296 12.796-7.5 7.5a1.127 1.127 0 0 1-1.594-1.594L14.906 12 8.204 5.296a1.127 1.127 0 1 1 1.594-1.594l7.5 7.5a1.126 1.126 0 0 1-.002 1.594"
      />
    </svg>
  );
}
