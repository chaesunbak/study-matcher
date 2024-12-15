import { Control, Controller, FieldErrors } from 'react-hook-form';

type Option = {
  value: string;
  label: string;
};

type InputProps = {
  control: Control<any>;
  name: string;
  placeholder: string;
  errors: FieldErrors;
  type?: 'text' | 'password' | 'textarea' | 'select' | 'date';
  className?: string;
  options?: Option[];
};

const Input = ({
  control,
  name,
  placeholder,
  errors,
  type = 'text',
  className = '',
  options = [],
}: InputProps) => {
  const hasError = Boolean(errors?.[name]); // 에러 존재 여부

  // 공통 스타일
  const baseClass = `
    w-full rounded-lg border px-4 py-2 text-gray-700 focus:outline-none focus:ring-2
    ${hasError ? 'border-red-500 focus:ring-red-500' : 'focus:ring-indigo-500'}
    ${className}
  `;

  const renderInput = (field: any) => {
    switch (type) {
      case 'select':
        return (
          <select {...field} className={baseClass}>
            <option value="" disabled>
              {placeholder}
            </option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case 'textarea':
        return <textarea {...field} placeholder={placeholder} className={baseClass} />;

      default:
        return <input {...field} type={type} placeholder={placeholder} className={baseClass} />;
    }
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div className="mb-4">
          {renderInput(field)}
          {hasError && <p className="text-red-500 mt-1 text-sm">{String(errors[name]?.message)}</p>}
        </div>
      )}
    />
  );
};

export default Input;
