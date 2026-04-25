import { SVGProps } from 'react';

interface CheckActiveIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

export default function EmailIcon({ size = 24, color, ...props }: CheckActiveIconProps) {
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
        d="M10 13.75a3 3 0 0 1-1.842-.641L0 6.766v8.859C0 16.66.84 17.5 1.875 17.5h16.25c1.035 0 1.875-.84 1.875-1.875v-8.86l-8.156 6.348c-.551.426-1.2.637-1.844.637M.636 5.676l8.29 6.449a1.75 1.75 0 0 0 2.15 0l8.29-6.45c.364-.312.634-.792.634-1.3 0-1.036-.84-1.875-1.875-1.875H1.875C.839 2.5 0 3.34 0 4.375c0 .508.235.988.636 1.3"
      />
    </svg>
  );
}
