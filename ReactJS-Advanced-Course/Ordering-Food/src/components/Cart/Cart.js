import { useContext, useState } from 'react';
import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import cartContext from '../../context/cartContext';
import CartItem from './CartItem';
import Checkout from './Checkout';

export default function Cart({ onHideCart }) {
  const cartCtx = useContext(cartContext);
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmitted, setDidSubmitted] = useState(false);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    // this will trigger "removeItemHandler" in cartProvider
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    // this will trigger "addItemHandler" in cartProvider
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          amount={item.amount}
          name={item.name}
          price={item.price}
          onAdd={cartItemAddHandler.bind(null, item)}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  );

  const handleOrder = () => {
    setIsCheckout(true);
  };

  // submitting & sending user-data & ordered-items to the backend
  const handleSubmitOrder = async (userData) => {
    setIsSubmitting(true);

    await fetch(
      'https://ordering-food-http-request-default-rtdb.firebaseio.com/orders.json',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.items,
        }),
      }
    );

    setIsSubmitting(false);
    setDidSubmitted(true);
    cartCtx.clearCart();
  };

  const cartModalContent = (
    <>
      {cartItems}

      <div className={classes.total}>
        <span> Total Amount </span>
        <span> {totalAmount} </span>
      </div>

      {isCheckout && (
        <Checkout onSubmit={handleSubmitOrder} onCancel={onHideCart} />
      )}

      {!isCheckout && (
        <div className={classes.actions}>
          <button onClick={onHideCart} className={classes['button--alt']}>
            Close
          </button>
          {hasItems && (
            <button className={classes.button} onClick={handleOrder}>
              Order
            </button>
          )}
        </div>
      )}
    </>
  );

  return (
    <Modal onHide={onHideCart}>
      {!isSubmitting && !didSubmitted && cartModalContent}

      {isSubmitting && <p> Sending Order Data... 📡 </p>}

      {!isSubmitting && didSubmitted && (
        <>
          <p> Successfully Sent The Order! 🎉 </p>
          <div className={classes.actions}>
            <button onClick={onHideCart} className={classes['button--alt']}>
              Close
            </button>
          </div>
        </>
      )}
    </Modal>
  );
}

/* onAdd={cartItemAddHandler.bind(null, item)}
 - bind() : is used to create a new function that has the this keyword of the object bound to it
 
 - pre-configure a function for future execution and basically allows you to pre-configure the argument that function will receive when it's being executed.

 - that's something we need here to ensure that both these functions do receive the "id" and or the "item" respectively
*/
