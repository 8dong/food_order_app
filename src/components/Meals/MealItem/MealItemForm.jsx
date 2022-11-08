import React, { useRef, useState } from 'react';

import Input from '../../UI/Input';
import classes from './MealItemForm.module.css';

const MealItemForm = props => {
  const [amountIsValid, setAmountIsValid] = useState(true);

  const amountInputRef = useRef();

  const submitHandler = event => {
    event.preventDefault();
    const enteredAmount = amountInputRef.current.value;
    if (enteredAmount.trim() === 0 || enteredAmount.trim() < 1 || enteredAmount.trim() > 5) {
      setAmountIsValid(false);
      return;
    }
    props.onAddToCart(+enteredAmount);
    amountInputRef.current.value = '1';
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label='Amount'
        input={{
          type: 'number',
          id: 'amount' + props.id,
          min: '1',
          max: '5',
          step: '1',
          defaultValue: '1'
        }}
      />
      <button type='submit'>Add</button>
      {!amountIsValid && <p>Please enter a valid (1-5).</p>}
    </form>
  );
};

export default MealItemForm;
