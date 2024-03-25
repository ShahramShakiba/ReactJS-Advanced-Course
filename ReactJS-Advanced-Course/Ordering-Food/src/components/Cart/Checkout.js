import classes from './Checkout.module.css';

export default function Checkout({ onCancel }) {
  const handleConfirm = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleConfirm}>
      <div className={classes.control}>
        <label htmlFor="name"> Your Name </label>
        <input type="text" name="name" id="name" />
      </div>

      <div className={classes.control}>
        <label htmlFor="city"> City </label>
        <input type="text" name="city" id="city" />
      </div>

      <div className={classes.control}>
        <label htmlFor="street"> Street </label>
        <input type="text" name="street" id="street" />
      </div>

      <div className={classes.control}>
        <label htmlFor="postal"> Postal Code </label>
        <input type="text" name="postal" id="postal" />
      </div>

      <button type="button" onClick={onCancel}>
        Cancel
      </button>
      <button> Confirm </button>
    </form>
  );
}
