import { useState } from 'react';

export function useInput(defaultValue, validationFn) {
  const [enteredValue, setEnteredValue] = useState(defaultValue);
  const [didEdit, setDidEdit] = useState(false);

  const validValue = validationFn(enteredValue);

  const handleInputChange = (e) => {
    setEnteredValue(e.target.value);

    // disappear the error message when user starts typing again
    setDidEdit(false);
  };

  // Validating on losing focus
  const handleInputBlur = () => {
    setDidEdit(true);
  };

  return {
    value: enteredValue,
    handleInputChange,
    handleInputBlur,
    hasError: didEdit && !validValue,
  };
}
