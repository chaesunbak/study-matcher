import { cn } from '../../utils/utils';
import { ReactNode, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  isLoading?: boolean;
}

const Button = ({ children, className, isLoading, ...props }: ButtonProps) => {
  return (
    <button
      className={cn(
        'bg-primary rounded-lg p-2 font-semibold text-white transition-all hover:opacity-90',
        className
      )}
      disabled={props.disabled || isLoading}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
