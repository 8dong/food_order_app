import React, { useReducer } from 'react';

import CartContext from './cart-context';

const defaultCartState = {
  items: [],
  totalAmount: 0
};

const cartReducer = (state, action) => {
  const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id);
  const existingCartItem = state.items[existingCartItemIndex];

  let updatedItems;

  if (action.type === 'ADD') {
    const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + 1
      };
      updatedItems = [...state.items];

      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = [...state.items, action.item];
    }

    return { items: updatedItems, totalAmount: updatedTotalAmount };
  }

  if (action.type === 'CART_ADD') {
    const updatedTotalAmount = state.totalAmount + action.item.price;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + 1
      };
      updatedItems = [...state.items];

      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = [...state.items, action.item];
    }

    return { items: updatedItems, totalAmount: updatedTotalAmount };
  }

  if (action.type === 'REMOVE') {
    const updatedTotalAmount = state.totalAmount - action.item.price;

    if (action.item.amount > 1) {
      const updatedItem = { ...existingCartItem, amount: existingCartItem.amount - 1 };
      updatedItems = [...state.items];

      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.filter(item => item.id !== action.item.id);
    }

    return { items: updatedItems, totalAmount: updatedTotalAmount };
  }

  return defaultCartState;
};

const CartProvider = props => {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

  const addItemToCartHandler = item => {
    dispatchCartAction({ type: 'ADD', item });
  };

  const removeItemFromCartHandler = item => {
    dispatchCartAction({ type: 'REMOVE', item });
  };

  const addItemInCartHandler = item => {
    dispatchCartAction({ type: 'CART_ADD', item });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    addInCartItem: addItemInCartHandler
  };

  return <CartContext.Provider value={cartContext}>{props.children}</CartContext.Provider>;
};

export default CartProvider;
