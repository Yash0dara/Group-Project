import React, { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar"; // Assuming you have a Navbar component
import { Link } from "react-router-dom";

const Card = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");
  const [isValidCardNumber, setIsValidCardNumber] = useState(false);
  const [isValidExpiryDate, setIsValidExpiryDate] = useState(false);
  const [isValidCvv, setIsValidCvv] = useState(false);

  // Function to handle card number change
  const handleCardNumberChange = (e) => {
    const input = e.target.value;
    const isValidNumber = /^\d{12}$/.test(input); // Check if input contains exactly 12 digits
    setCardNumber(input);
    setIsValidCardNumber(isValidNumber);
  };

  // Function to handle expiration date change
  const handleExpiryDateChange = (e) => {
    const input = e.target.value;
    // Check if the input matches the MM/YY format
    const isValidFormat = /^((0[1-9])|(1[0-2]))\/(\d{2})$/.test(input);
    // Check if the month is valid (between 01 and 12)
    const isValidMonth = parseInt(input.slice(0, 2)) >= 1 && parseInt(input.slice(0, 2)) <= 12;
    // Check if the year is valid (greater than or equal to the current year)
    const currentYear = new Date().getFullYear() % 100; // Get last two digits of the current year
    const inputYear = parseInt(input.slice(3, 5));
    const isValidYear = inputYear >= currentYear;

    // Set the expiry date state and validity based on the checks
    if (isValidFormat && isValidMonth && isValidYear) {
      setExpiryDate(input);
      setIsValidExpiryDate(true);
    } else {
      setExpiryDate(input);
      setIsValidExpiryDate(false);
    }
  };

  // Function to handle CVV change
  const handleCvvChange = (e) => {
    const input = e.target.value;
    const isValidCvv = /^\d{3}$/.test(input); // Check if input contains exactly 3 digits
    setCvv(input);
    setIsValidCvv(isValidCvv);
  };
  
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // If all validations pass, submit the form
    if (isValidCardNumber && isValidExpiryDate && isValidCvv) {
      const newCard = {
        cardName: name,
        cardNumber,
        expiredate: expiryDate,
        cvvNumber: cvv
      };

      axios.post("http://localhost:8070/card/add", newCard)
        .then(() => {
          alert("Card details added successfully");
          // Clear form fields after successful submission
          setCardNumber("");
          setExpiryDate("");
          setCvv("");
          setName("");
        })
        .catch((err) => {
          console.error(err);
          alert("Failed to add card details");
        });
    } else {
      alert("Please fill out the form correctly.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-sm mt-20 mx-auto">   
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="px-6 py-4">
            <h2 className="text-lg font-semibold mb-2" style={{ fontFamily: 'inherit' }}>Card Payment</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                  Name 
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="name"
                  type="text"
                  placeholder="Enter Name"
                  value={name}
                  onChange={handleNameChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cardNumber">
                  Card Number
                </label>
                <input
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    isValidCardNumber ? 'border-green-500' : 'border-red-500'
                  }`}
                  id="cardNumber"
                  type="text"
                  placeholder="Enter card number"
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="expiryDate">
                  Expiry Date (MM/YY)
                </label>
                <input
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    isValidExpiryDate ? 'border-green-500' : 'border-red-500'
                  }`}
                  id="expiryDate"
                  type="text"
                  placeholder="MM/YY"
                  value={expiryDate}
                  onChange={handleExpiryDateChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cvv">
                  CVV
                </label>
                <input
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    isValidCvv ? 'border-green-500' : 'border-red-500'
                  }`}
                  id="cvv"
                  type="text"
                  placeholder="CVV"
                  value={cvv}
                  onChange={handleCvvChange}
                  required
                />
              </div>
              <br />
              <div className="flex justify-between">
                <button
                  className={`${
                    isValidCardNumber && isValidExpiryDate && isValidCvv ? 'bg-green-500' : 'bg-red-500'
                  } text-Black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
                  type="submit"
                  disabled={!isValidCardNumber || !isValidExpiryDate || !isValidCvv}
                >
                  Submit Payment
                </button>
                <div className="open_button" style={{ textAlign: 'center' }}>
                  <Link to="/view_cards" className="btn btn-primary">View Previous Cards</Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;

