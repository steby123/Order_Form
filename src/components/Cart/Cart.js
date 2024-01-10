import React, { useContext, useState } from 'react';
import Modal from '../UI/Modal';
import CartItem from './CartItem';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
import CheckOut from './CheckOut';

const Cart = (props) => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [IsSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };

  const cartItemClearHandler = () => {
    cartCtx.clearCart();
  }

  const orderHandler = () => {
    setIsCheckingOut(true)
  }

  const submitOrderHandler = async (resData) => {
    setIsSubmitting(true);
    await fetch('https://order-food-97b8e-default-rtdb.firebaseio.com/order.json',{
      method:'POST',
      body: JSON.stringify({
        user: resData,
        orderItems: cartCtx.items 
      })
    });
    setIsSubmitting(false);
    setDidSubmit(true);
    cartItemClearHandler();
  }

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes['button--alt']} onClick={props.onClose}>
        Close
      </button>
      {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
  </div>
  )

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const cartModalContent = 
  <>
    {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckingOut && <CheckOut onSubmit={submitOrderHandler} onCancel={props.onClose}/>}
      {!isCheckingOut && modalActions }
  </>

  const IsSubmittingModalContent = <p>Sending order data...</p>

  const DidIsSubmittingModalContent =(
    <>
      <p>Succesfully send order data!</p>
        <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onClose}>
          Close
        </button>
        </div>
      </>
  )

  return (
    <Modal onClose={props.onClose}>
      {!IsSubmitting && !didSubmit && cartModalContent}
      {IsSubmitting && IsSubmittingModalContent}
      {!IsSubmitting && didSubmit && DidIsSubmittingModalContent}
    </Modal>
  );
};

export default Cart;
