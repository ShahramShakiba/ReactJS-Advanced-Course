import classes from './Checkout.module.css';
import { useRef, useState } from 'react';

const isEmpty = (value) => value.trim() === '';
const isFiveChars = (value) => value.trim().length === 0;
const isElevenChars = (value) => value.trim().length !== 11;

export default function Checkout({ onCancel, onSubmit }) {
  const [inputValidity, setInputValidity] = useState({
    name: true,
    street: true,
    postal: true,
    phone: true,
  });
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

    const validEnteredName = !isEmpty(enteredName);
    const validEnteredStreet = !isEmpty(enteredStreet);
    const validEnteredPostal = !isFiveChars(enteredPostal);
    const validEnteredPhone = !isElevenChars(enteredPhone);

    setInputValidity({
      name: validEnteredName,
      street: validEnteredStreet,
      postal: validEnteredPostal,
      phone: validEnteredPhone,
    });

    const validForm =
      validEnteredName &&
      validEnteredStreet &&
      validEnteredPostal &&
      validEnteredPhone;

    if (!validForm) {
      return;
    }

    // submitting & sending user-data to the backend
    onSubmit({
      name: enteredName,
      street: enteredStreet,
      postal: enteredPostal,
      phone: enteredPhone,
    });
  };

  const nameCSS = `${classes.control} ${
    !inputValidity.name && classes.invalid
  }`;
  const streetCSS = `${classes.control} ${
    !inputValidity.street && classes.invalid
  }`;
  const postalCSS = `${classes.control} ${
    !inputValidity.postal && classes.invalid
  }`;
  const phoneCSS = `${classes.control} ${
    !inputValidity.phone && classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={handleConfirm}>
      <div className={nameCSS}>
        <label htmlFor="name"> Your Name </label>
        <input type="text" name="name" id="name" ref={name} />

        {!inputValidity.name && (
          <p className={classes.errorMsg}> Please Enter A Valid Name. </p>
        )}
      </div>

      <div className={streetCSS}>
        <label htmlFor="street"> Street </label>
        <input type="text" name="street" id="street" ref={street} />

        {!inputValidity.street && (
          <p className={classes.errorMsg}> Please Enter A Valid Street. </p>
        )}
      </div>

      <div className={postalCSS}>
        <label htmlFor="postal"> Postal Code </label>
        <input type="text" name="postal" id="postal" ref={postal} />

        {!inputValidity.postal && (
          <p className={classes.errorMsg}>
            Please Enter A Valid Postal Code(5 characters long).
          </p>
        )}
      </div>

      <div className={phoneCSS}>
        <label htmlFor="phone"> Phone </label>
        <input type="number" name="phone" id="phone" ref={phone} />

        {!inputValidity.phone && (
          <p className={classes.errorMsg}>
            Please Enter A Valid Phone Number(11 digits).
          </p>
        )}
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
