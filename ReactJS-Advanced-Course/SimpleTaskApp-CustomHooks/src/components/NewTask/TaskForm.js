import { useRef, useState } from 'react';
import classes from './TaskForm.module.css';

export default function TaskForm({ loading, onEnterTask }) {
  const taskInputRef = useRef();
  const [taskInputValue, setTaskInputValue] = useState('');

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredValue = taskInputRef.current.value;

    if (enteredValue.trim().length > 0) {
      onEnterTask(enteredValue);
      setTaskInputValue(''); // Reset Input Value after adding a new Value
    }
  };

  const taskInputHandler = (e) => {
    setTaskInputValue(e.target.value);
  };

  return (
    <form
      className={classes.form}
      onSubmit={submitHandler}
      value={taskInputValue}
      onChange={taskInputHandler}
    >
      <input type="text" ref={taskInputRef} />

      <button> {loading ? 'Sending...' : 'Add Task'} </button>
    </form>
  );
}
