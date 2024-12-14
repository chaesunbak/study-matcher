import { useState } from 'react';

const useEmailError = () => {
  const [emailError, setEmailError] = useState<string | null>(null);

  const resetEmailError = () => {
    setEmailError(null);
  };

  return {
    emailError,
    setEmailError,
    resetEmailError,
  };
};

export default useEmailError;
