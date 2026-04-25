import { SVGProps } from 'react';

interface CheckActiveIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

export default function HashTagIcon({ size = 16, color, ...props }: CheckActiveIconProps) {
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
        d="m3.756 7.08.138-1.54h1.91l.39-2.393 1.725-.16-.414 2.552h1.771l.391-2.392 1.702-.16-.414 2.552h1.932L12.75 7.08h-2.047l-.253 1.702h1.794l-.138 1.564h-1.909l-.39 2.507-1.726.161.414-2.668H6.746l-.39 2.507-1.726.161.414-2.668H3.112l.138-1.564h2.047l.276-1.702zm3.496 0L7 8.782h1.748l.276-1.702z"
      />
    </svg>
  );
}
