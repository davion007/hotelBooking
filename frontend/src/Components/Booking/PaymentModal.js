// PaymentModal.jsx
import axios from 'axios';
import { useAtom } from 'jotai';
import Cookies from 'js-cookie';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { activeModal, user } from '../../Middlewares/global-state';

const PaymentModal = () => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [cardNo, setCardNo] = useState('');
    const [cardType, setCardType] = useState('');
    const [exp, setExp] = useState('');
    const [cvc, setCvc] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [currentUser, setCurrentUser] = useAtom(user);
    const [currentModal, setCurrentModal] = useAtom(activeModal);
  
    const navigate = useNavigate();
  
    useEffect(() => {
      setName(currentUser.c_name);
      setAddress(currentUser.c_address);
      setCardNo(currentUser.c_cardno);
      setCardType(currentUser.c_cardtype);
      setExp(currentUser.c_cardexp);
    }, [currentUser]);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      // Add your payment logic here
      setIsLoading(true);
      try {
        // Simulate a payment API call
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/payment`, {
          name,
          address,
          cardNo,
          cardType,
          exp,
          cvc,
          // Add other payment-related data
        });
  
        // Handle the response, e.g., redirect to success page
        console.log('Payment successful:', response.data);
      } catch (error) {
        console.error('Payment failed:', error);
      } finally {
        setIsLoading(false);
        // Close the payment modal
        setCurrentModal('');
      }
    };
  
    return (
      <div className="w-full min-w-full flex justify-center">
        <div className="max-w-7xl w-full min-h-[70vh] flex justify-center items-center text-black mt-10">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-[700px] relative p-8 shadow-xl bg-white"
          >
            <p
              className="text-red-700 text-2xl absolute right-10 cursor-pointer"
              onClick={() => setCurrentModal('')}
            >
              X
            </p>
            <div className="space-y-2">
              <h3 className="text-md font-bold text-black mb-4">Make Payment</h3>
              <label htmlFor="name" className="flex flex-col">
                <span className="text-md">Name</span>
                <input
                  type="text"
                  id="name"
                  placeholder="Name"
                  className="border-[1px] rounded-md px-3 py-1 border-black text-md"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled
                />
              </label>
              
              <label htmlFor="address" className="flex flex-col">
                <span className="text-md">Address</span>
                <input
                  type="text"
                  id="address"
                  placeholder="Address"
                  className="border-[1px] rounded-md px-3 py-1 border-black text-md"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </label>
  
              <label htmlFor="cardNo" className="flex flex-col">
                <span className="text-md">Card No</span>
                <input
                  type="text"
                  id="cardNo"
                  placeholder="Card Number"
                  className="border-[1px] rounded-md px-3 py-1 border-black text-md"
                  value={cardNo}
                  onChange={(e) => setCardNo(e.target.value)}
                />
              </label>
  
              <label htmlFor="cardType" className="flex flex-col">
                <span className="text-md">Card Type</span>
                <input
                  type="text"
                  id="cardType"
                  placeholder="Card Type"
                  className="border-[1px] rounded-md px-3 py-1 border-black text-md"
                  value={cardType}
                  onChange={(e) => setCardType(e.target.value)}
                />
              </label>
  
              <label htmlFor="exp" className="flex flex-col">
                <span className="text-md">Expiration Date</span>
                <input
                  type="text" // Consider using a library or separate inputs for month and year
                  id="exp"
                  placeholder="MM/YYYY"
                  className="border-[1px] rounded-md px-3 py-1 border-black text-md"
                  value={exp}
                  onChange={(e) => setExp(e.target.value)}
                />
              </label>
  
              <label htmlFor="cvc" className="flex flex-col">
                <span className="text-md">CVC</span>
                <input
                  type="text"
                  id="cvc"
                  placeholder="CVC"
                  className="border-[1px] rounded-md px-3 py-1 border-black text-md"
                  value={cvc}
                  onChange={(e) => setCvc(e.target.value)}
                />
              </label>
            </div>
            <div className="my-6 space-y-6">
              <button
                type="submit"
                className={`w-full py-2 bg-primary rounded-md text-white font-bold ${
                  isLoading ? 'opacity-60' : ''
                }`}
                disabled={isLoading}
              >
                {!isLoading ? 'Submit' : 'Submitting...'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  
  export default PaymentModal;