import React, { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const Card = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isValid, setIsValid] = useState(false); // State to manage form validity
  const [validationErrors, setValidationErrors] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const handleCardNumberChange = (e) => {
    const input = e.target.value;
    setCardNumber(input);
    setIsValid(input.length === 12); // Validate card number length
    setValidationErrors({
      ...validationErrors,
      cardNumber: input.length !== 12 ? "Card number must be 12 digits" : "",
    });
  };

  const handleExpiryDateChange = (e) => {
    const input = e.target.value;
    const [month, year] = input.split("/");

    if (year) {
      const currentYear = new Date().getFullYear();
      const shortYear = parseInt(year, 10);
      setIsValid(shortYear >= currentYear - 24);
      setValidationErrors({
        ...validationErrors,
        expiryDate:
          shortYear < currentYear || shortYear > currentYear + 24
            ? "Invalid expiration date"
            : "",
      });
    }

    setExpiryDate(input);
  };

  const handleCvvChange = (e) => {
    const input = e.target.value;
    setCvv(input);
    setIsValid(input.length === 3); // Validate CVV number length
    setValidationErrors({
      ...validationErrors,
      cvv: input.length !== 3 ? "CVV must be 3 digits" : "",
    });
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCard = {
      cardName: name,
      cardNumber,
      expiredate: expiryDate,
      cvvNumber: cvv,
    };

    axios
      .post("http://localhost:8070/card/add", newCard)
      .then(() => {
        alert("Card details added successfully");
        setIsSubmitted(true);
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to add card details");
      });
  };

  return (
    <>
      <Navbar />

      <div className="max-w-sm mt-20 mx-auto">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="px-6 py-4">
            <h2 className="text-lg font-semibold mb-2" style={{ fontFamily: "inherit" }}>
              Card Payment
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="name"
                >
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
                <label
className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="cardNumber"
                >
                  Card Number
                </label>
                <input
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    validationErrors.cardNumber ? "border-red-600" : ""
                  }`}
                  style={{ borderColor: validationErrors.cardNumber ? "red" : "" }}
                  id="cardNumber"
                  type="text"
                  placeholder="Enter Card Number"
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  required
                />
                {validationErrors.cardNumber && (
                  <p className="text-red-600 text-xs italic">{validationErrors.cardNumber}</p>
                )}
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="expiryDate"
                >
                  Expiry Date
                </label>
                <input
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    validationErrors.expiryDate ? "border-red-600" : ""
                  }`}
                  style={{ borderColor: validationErrors.expiryDate ? "red" : "" }}
                  id="expiryDate"
                  type="text"
                  placeholder="MM/YYYY"
                  value={expiryDate}
                  onChange={handleExpiryDateChange}
                  required
                />
                {validationErrors.expiryDate && (
                  <p className="text-red-600 text-xs italic">{validationErrors.expiryDate}</p>
                )}
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="cvv"
                >
                  CVV
                </label>
                <input
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    validationErrors.cvv ? "border-red-600" : ""
                  }`}
                  style={{ borderColor: validationErrors.cvv ? "red" : "" }}
                  id="cvv"
                  type="text"
                  placeholder="Enter CVV"
                  value={cvv}
                  onChange={handleCvvChange}
                  required
                />
                {validationErrors.cvv && (
                  <p className="text-red-600 text-xs italic">{validationErrors.cvv}</p>
                )}
              </div>
              <div className="flex justify-between">
                {!isSubmitted && isValid && (
                  <button
                    className="font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline bg-[#44d658] text-black"
                    type="submit"
                  >
                    Submit Payment
                  </button>
                )}
                <div className="open_button" style={{ textAlign: "center" }}>
                  <Link to="/view_cards" className="btn btn-primary">
                    View Previous Cards
                  </Link>
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