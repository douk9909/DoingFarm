import { SVGProps } from 'react';

interface CheckActiveIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

export default function SettingIcon({ size = 24, color, ...props }: CheckActiveIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill={color || '#a39fb2'}
        d="M22.307 10.05a.75.75 0 0 0-.365-.505L19.145 7.95l-.01-3.152a.75.75 0 0 0-.266-.57 10.5 10.5 0 0 0-3.443-1.938.75.75 0 0 0-.605.056L12 3.923l-2.824-1.58a.75.75 0 0 0-.607-.056 10.5 10.5 0 0 0-3.438 1.946.75.75 0 0 0-.266.569l-.014 3.155L2.055 9.55a.75.75 0 0 0-.365.506 10 10 0 0 0 0 3.897.75.75 0 0 0 .365.506l2.796 1.594.011 3.153a.75.75 0 0 0 .266.57 10.5 10.5 0 0 0 3.442 1.937.75.75 0 0 0 .606-.055L12 20.076l2.823 1.58a.74.74 0 0 0 .607.055 10.5 10.5 0 0 0 3.439-1.944.75.75 0 0 0 .265-.569l.014-3.155 2.797-1.593a.75.75 0 0 0 .364-.507 10 10 0 0 0-.002-3.892M12 15.75a3.75 3.75 0 1 1 0-7.501 3.75 3.75 0 0 1 0 7.501"
      />
    </svg>
  );
}
