import { useReducer } from 'react';

const initialInputState = {
  value: '',
  isTouched: false,
};
const inputReducer = (state, action) => {
  if (action.type === 'INPUT') {
    return { value: action.value, isTouched: state.isTouched };
  }

  if (action.type === 'BLUR') {
    return { isTouched: true, value: state.value };
  }

  if (action.type === 'RESET') {
    return { value: '', isTouched: false };
  }

  return inputReducer;
};
export default function useInputs(validateValue) {
  const [inputState, dispatchInput] = useReducer(
    inputReducer,
    initialInputState
  );

  const validValue = validateValue(inputState.value);
  const hasError = !validValue && inputState.isTouched;

  const handleChange = (e) => {
    dispatchInput({
      type: 'INPUT',
      value: e.target.value,
    });
  };

  const handleBlur = (e) => {
    dispatchInput({
      type: 'BLUR',
    });
  };

  const reset = () => {
    dispatchInput({
      type: 'RESET',
    });
  };

  return {
    value: inputState.value,
    isValid: validValue,
    error: hasError,
    reset,
    handleChange,
    handleBlur,
  };
}
