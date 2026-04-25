import { SVGProps } from 'react';

interface CheckActiveIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

export default function EditIcon({ size = 24, color, ...props }: CheckActiveIconProps) {
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
        d="M21 12v7.5a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 19.5v-15A1.5 1.5 0 0 1 4.5 3H12a.75.75 0 1 1 0 1.5H4.5v15h15V12a.75.75 0 1 1 1.5 0m.53-5.47-9 9a.75.75 0 0 1-.53.22H9a.75.75 0 0 1-.75-.75v-3a.75.75 0 0 1 .22-.53l9-9a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1 0 1.06M19.938 6 18 4.06l-1.19 1.19 1.94 1.94z"
      />
    </svg>
  );
}
