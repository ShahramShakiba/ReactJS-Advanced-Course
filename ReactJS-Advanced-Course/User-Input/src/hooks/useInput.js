import { useState } from 'react';

export default function useInput(validateVale) {
  const [enteredValue, setEnteredValue] = useState('');
  const [isTouched, setIsTouched] = useState(false);
  // set state to "false" not true

  const validValue = validateVale(enteredValue);
  const hasError = !validValue && isTouched;

  const handleChangeValue = (e) => {
    setEnteredValue(e.target.value);
  };

  const handleInputBlur = (e) => {
    setIsTouched(true);
  };

  const reset = () => {
    setEnteredValue('');
    setIsTouched(false);
  };

  return {
    value: enteredValue,
    isValid: validValue,
    hasError,
    reset,
    handleChangeValue,
    handleInputBlur,
  };
}
