import { useState } from 'react';

export default function useInputs(validateValue) {
  const [enteredValue, setEnteredValue] = useState('');
  const [isBlurred, setIsBlurred] = useState(false);

  const validValue = validateValue(enteredValue);
  const hasError = !validValue && isBlurred;

  const handleChange = (e) => {
    setEnteredValue(e.target.value);
  };

  const handleBlur = (e) => {
    setIsBlurred(true);
  };

  const reset = () => {
    setEnteredValue('');
    setIsBlurred(false);
  };

  return {
    value: enteredValue,
    isValid: validValue,
    error: hasError,
    reset,
    handleChange,
    handleBlur,
  };
}
