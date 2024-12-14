import { cn } from '../../utils/utils';
import { ReactNode, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  isLoading?: boolean;
  variant?: 'default' | 'header' | 'form' | 'verification';
}

const Button = ({ children, className, isLoading, variant = 'default', ...props }: ButtonProps) => {
  const baseStyles =
    'rounded-lg font-semibold text-white transition-all hover:opacity-90 disabled:opacity-50';

  const variantStyles = {
    default: 'bg-primary p-2',
    header: 'bg-primary p-2 hover:opacity-90',
    form: 'bg-primary w-full py-3 text-lg font-bold',
    verification: 'bg-green-500 py-2 px-4 hover:bg-green-600',
  };

  return (
    <button
      className={cn(
        baseStyles, // 공통 스타일
        variantStyles[variant], // 개별 스타일
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
