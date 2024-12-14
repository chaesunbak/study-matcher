import { cn } from '../../utils/utils';
import { ReactNode, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  isLoading?: boolean;
  variant?: 'default' | 'header' | 'form' | 'verification';
}

const Button = ({ children, className, isLoading, variant = 'default', ...props }: ButtonProps) => {
  const variantStyles = {
    default: 'bg-primary rounded-lg p-2 font-semibold text-white',
    header: 'rounded-lg bg-primary p-2 font-semibold text-white transition-all hover:opacity-90',
    form: 'bg-primary w-full py-3 rounded-md text-white font-bold',
    verification: 'bg-green-500 text-white font-bold py-2 px-4 rounded-md hover:bg-green-600',
  };

  return (
    <button
      className={cn(
        'transition-all hover:opacity-90 disabled:opacity-50',
        variantStyles[variant], // 기본 스타일
        className // 사용자 정의 스타일 추가
      )}
      disabled={props.disabled || isLoading}
      {...props}
    >
      {isLoading ? '로딩 중...' : children}
    </button>
  );
};

export default Button;
