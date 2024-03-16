
import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const OrderConfirmation = ({generateOrderID}) => {
    return (
        <div className='confirmorder'>
            <div className='checkiconcotainer'>
                <span><FontAwesomeIcon icon={faCheck} /></span>
            </div>
            <div className='idcontainer'>
                <h1>Thank you for Shopping with us!</h1>
                <p>ID #{generateOrderID()}</p>
            </div>
        </div>
    );
}

export default OrderConfirmation;
