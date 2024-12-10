import { clsx, ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * `clsx`를 사용하여 클래스 이름을 결합하고 `twMerge`를 사용하여 Tailwind CSS 클래스를 병합합니다.
 *
 * @param {...ClassValue[]} inputs - 결합하고 병합할 클래스 이름들.
 * @returns {string} 결합되고 병합된 클래스 이름.
 */
export const cn = (...inputs: ClassValue[]): string => {
  return twMerge(clsx(inputs));
};
