import { SVGProps } from 'react';

interface ToastSuccessIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

export default function ToastSuccessIcon({ size = 24, color, ...props }: ToastSuccessIconProps) {
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
        fill={color || 'currentColor'}
        fillRule="evenodd" // 복잡한 도형을 채울 때 유용합니다.
        clipRule="evenodd"
        d="m8.817 13.545 5.602-5.603-.878-.878-4.724 4.725-2.375-2.375-.878.878zm1.184 4.372a7.7 7.7 0 0 1-3.088-.623A8 8 0 0 1 4.4 15.602a8 8 0 0 1-1.692-2.514 7.7 7.7 0 0 1-.624-3.086q0-1.643.623-3.088A8 8 0 0 1 4.398 4.4a8 8 0 0 1 2.513-1.693 7.7 7.7 0 0 1 3.087-.623q1.643 0 3.088.623 1.444.623 2.514 1.692a8 8 0 0 1 1.693 2.513q.624 1.444.623 3.087a7.7 7.7 0 0 1-.623 3.087 8 8 0 0 1-1.692 2.515 8 8 0 0 1-2.513 1.692 7.7 7.7 0 0 1-3.087.624M10 16.667q2.79 0 4.729-1.938 1.937-1.937 1.937-4.729T14.73 5.271t-4.73-1.937q-2.79 0-4.728 1.937t-1.938 4.73q0 2.79 1.938 4.728T10 16.667"
      />
    </svg>
  );
}
