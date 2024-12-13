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
        'bg-primary hover:bg-primary-light rounded-lg p-2 font-semibold transition-all hover:opacity-90',
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
