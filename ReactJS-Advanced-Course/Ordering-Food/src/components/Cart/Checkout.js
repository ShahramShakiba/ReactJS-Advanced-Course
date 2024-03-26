import classes from './Checkout.module.css';
import { useRef } from 'react';

export default function Checkout({ onCancel }) {
  const name = useRef();
  const street = useRef();
  const postal = useRef();
  const phone = useRef();

  const handleConfirm = (e) => {
    e.preventDefault();

    const enteredName = name.current.value;
    const enteredStreet = street.current.value;
    const enteredPostal = postal.current.value;
    const enteredPhone = phone.current.value;
  };

  return (
    <form className={classes.form} onSubmit={handleConfirm}>
      <div className={classes.control}>
        <label htmlFor="name"> Your Name </label>
        <input type="text" name="name" id="name" ref={name} />
      </div>

      <div className={classes.control}>
        <label htmlFor="street"> Street </label>
        <input type="text" name="street" id="street" ref={street} />
      </div>

      <div className={classes.control}>
        <label htmlFor="postal"> Postal Code </label>
        <input type="text" name="postal" id="postal" ref={postal} />
      </div>

      <div className={classes.control}>
        <label htmlFor="phone"> Phone </label>
        <input type="number" name="phone" id="phone" ref={phone} />
      </div>

      <div className={classes.actions}>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
        <button> Confirm </button>
      </div>
    </form>
  );
}
