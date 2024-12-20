// import { useState } from 'react';
import { Control, Controller, FieldErrors } from 'react-hook-form';

type Option = {
  value: string;
  label: string;
};

type InputProps = {
  control: Control<any>;
  name: string;
  placeholder?: string;
  errors: FieldErrors;
  type?: 'text' | 'password' | 'textarea' | 'select' | 'date' | 'image' | 'number';
  className?: string;
  options?: Option[];
  defaultValue?: string | number;
  hasButton?: boolean;
  buttonLabel?: string;
  onButtonClick?: () => void;
  onFileChange?: (file: File) => void;
};

const Input = ({
  control,
  name,
  errors,
  placeholder = '',
  type = 'text',
  className = '',
  options = [],
  defaultValue = '',
  hasButton = false,
  buttonLabel = '확인',
  onButtonClick,
}: InputProps) => {
  const hasError = Boolean(errors?.[name]);
  // const [previewUrl, setPreviewUrl] = useState<string | null>('');

  const baseClass = `w-full rounded-lg border px-4 py-2 text-sm 
                     placeholder-gray-400 focus:outline-none focus:ring-2 
                     ${
                       hasError
                         ? 'border-red-500 focus:ring-red-500'
                         : 'focus:ring-primary focus:border-primary'
                     } 
                     transition duration-300 ${className}`;

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

      // case 'image':
      //   return (
      //     <div className="relative h-32 w-32 overflow-hidden rounded-lg bg-gray-100 shadow-md">
      //       {previewUrl ? (
      //         <img src={previewUrl} alt="미리보기" className="h-full w-full object-cover" />
      //       ) : (
      //         <div className="flex h-full w-full items-center justify-center text-gray-500">
      //           <span className="text-2xl font-bold text-gray-400">+</span>
      //         </div>
      //       )}
      //       <input
      //         {...field}
      //         type="file"
      //         className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
      //         onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
      //           console.log(e.target.files?.[0]);
      //           const file = e.target.files?.[0] || null;

      //           if (file) {
      //             const previewUrl = URL.createObjectURL(file);
      //             setPreviewUrl(previewUrl);
      //           } else {
      //             setPreviewUrl('');
      //           }
      //         }}
      //         accept="image/*"
      //         onFileChange={handleOnFileChange}
      //       />
      //     </div>
      //   );

      case 'number':
        return <input {...field} type="number" placeholder={placeholder} className={baseClass} />;

      default:
        return <input {...field} type={type} placeholder={placeholder} className={baseClass} />;
    }
  };

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({ field }) => (
        <div className="mb-4">
          <div className={`flex items-center`}>
            <div className="flex-grow">{renderInput(field)}</div>

            {hasButton && (
              <button
                type="button"
                onClick={onButtonClick}
                className="hover:bg-primary-dark ml-2 h-full rounded-lg bg-primary px-4 py-2 text-white shadow-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
              >
                {buttonLabel}
              </button>
            )}
          </div>

          {hasError && <p className="mt-1 text-sm text-red-500">{String(errors[name]?.message)}</p>}
        </div>
      )}
    />
  );
};

export default Input;
