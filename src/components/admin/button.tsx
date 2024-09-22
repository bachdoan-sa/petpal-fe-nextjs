import { inter } from '@/src/fonts/fonts';
import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, className, ...rest } : ButtonProps) {
  return (
    <button
      {...rest}
      className={clsx(
        'btn btn-sm d-flex align-items-center rounded-pill px-4',
        inter.className,
        className,
      )}
    >
      
      {children}
    </button>
  );
}
