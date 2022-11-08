import React, { useContext } from 'react';

import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import Modal from '../UI/Modal';
import classes from './Cart.module.css';

const Cart = props => {
  const cartContext = useContext(CartContext);

  const totalAmount = `${cartContext.totalAmount} 원`;
  const hadItems = cartContext.items.length > 0;
  const cartItemRemoveHandler = id => {
    cartContext.removeItem(id);
  };
  const cartItemAddHandler = item => {
    cartContext.addInCartItem(item);
  };

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartContext.items.map(item => (
        <CartItem
          key={item.id}
          name={item.name}
          price={item.price}
          amount={item.amount}
          onAdd={cartItemAddHandler.bind(null, item)}
          onRemove={cartItemRemoveHandler.bind(null, item)}
        />
      ))}
    </ul>
  );
  
  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onClose}>
          Close
        </button>
        {hadItems && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
