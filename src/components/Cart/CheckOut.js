import { useRef, useState } from 'react';
import classes from './CheckOut.module.css';

const isEmpty = value => value.trim() === '';
const isNotFiveChar = value => value.trim().length === 5;

const CheckOut = (props) => {
    const [formInputIsValidity, setFormInputIsValidity] = useState({
        name: true,
        street:true,
        city:true,
        postalCode:true
    });

    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalCodeInputRef = useRef();
    const cityInputRef = useRef();

    const confirmHandler = (event) => {
        event.preventDefault();

        const enteredName = nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredPostalCode = postalCodeInputRef.current.value;
        const enteredCity = cityInputRef.current.value;

        const enteredNameValid = !isEmpty(enteredName);
        const enteredStreetValid = !isEmpty(enteredStreet);
        const enteredPostalCodeValid = !isEmpty(enteredPostalCode);
        const enteredCityValid = isNotFiveChar(enteredCity);

        setFormInputIsValidity({
            name:enteredNameValid,
            street:enteredCityValid,
            postalCode:enteredPostalCodeValid,
            city:enteredCityValid
        })

        const formIsValid = enteredNameValid && enteredStreetValid & enteredPostalCodeValid & enteredCityValid;

        if(!formIsValid){
            return;
        }

        props.onSubmit({
            name: enteredName,
            street: enteredStreet,
            postalCode: enteredPostalCode,
            city: enteredCity
        })
      };

      const controlClasses = `${classes.control} ${formInputIsValidity.name ? '' : classes.invalid}`
      const StreetClasses = `${classes.control} ${formInputIsValidity.street ? '' : classes.invalid}`
      const PostalClasses = `${classes.control} ${formInputIsValidity.postalCode ? '' : classes.invalid}`
      const CityClasses = `${classes.control} ${formInputIsValidity.city ? '' : classes.invalid}`
    
      return (
        <form className={classes.form} onSubmit={confirmHandler}>
          <div className={controlClasses}>
            <label htmlFor='name'>Your Name</label>
            <input type='text' id='name' ref={nameInputRef}/>
            {!formInputIsValidity.name && <p>Please enter a valid name!</p>}
          </div>
          <div className={StreetClasses}>
            <label htmlFor='street'>Street</label>
            <input type='text' id='street' ref={streetInputRef}/>
            {!formInputIsValidity.street && <p>Please enter a valid street!</p>}
          </div>
          <div className={PostalClasses}>
            <label htmlFor='postal'>Postal Code</label>
            <input type='text' id='postal' ref={postalCodeInputRef}/>
            {!formInputIsValidity.postalCode && <p>Please enter a valid postal code!</p>}
          </div>
          <div className={CityClasses}>
            <label htmlFor='city'>City</label>
            <input type='text' id='city' ref={cityInputRef}/>
            {!formInputIsValidity.city && <p>Please enter a valid city!</p>}
          </div>
          <div className={classes.actions}>
            <button type='button' onClick={props.onCancel}>
              Cancel
            </button>
            <button className={classes.submit}>Confirm</button>
          </div>
        </form>
      );
}

export default CheckOut; 