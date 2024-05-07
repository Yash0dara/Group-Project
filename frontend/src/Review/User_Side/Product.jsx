import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";

// StarRating component
const StarRating = ({ starsSelected, onSelectStar }) => {
  const totalStars = 5;
  return (
    <div>
      {[...Array(totalStars)].map((_, index) => (
        <span
          key={index}
          className="cursor-pointer"
          style={{ color: index < starsSelected ? "gold" : "gray", fontSize: "30px" }}
          onClick={() => onSelectStar(index + 1)}
        >
          ★ {/* Render star symbol */}
        </span>
      ))}
    </div>
  );
};

export default function Product() {
  const [type, setType] = useState("");
  const [description, setDes] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [stars, setStars] = useState(0); // New state for stars
  const [percent, setPercent] = useState(0); // New state for percentage
  const [isDescriptionValid, setIsDescriptionValid] = useState(false); // State for description validation

  useEffect(() => {
    // Fetch data or any other initialization logic
  }, []);

  useEffect(() => {
    // Check if the description meets the validation criteria
    setIsDescriptionValid(description.trim().split(/\s+/).length > 5);
  }, [description]);

  function sendData(e) {
    e.preventDefault();

    // Convert numeric stars to star symbols
    const starSymbols = Array(stars).fill('★').join('');

    // Calculate percentage based on stars
    let percentage = 0;
    switch (stars) {
      case 1:
        percentage = 20;
        break;
      case 2:
        percentage = 40;
        break;
      case 3:
        percentage = 60;
        break;
      case 4:
        percentage = 80;
        break;
      case 5:
        percentage = 100;
        break;
      default:
        percentage = 0;
    }

    const newProduct = {
      type: type,
      description: description,
      stars: starSymbols, // Send stars as symbols
      percent: percentage // Send calculated percentage
    };

    axios.post("http://localhost:8070/Product_review/add", newProduct)
      .then(() => {
        alert("Product Review Added");
        // Reload the page to show the added review
        window.location.reload();
      })
      .catch((err) => {
        alert(err);
      });
  }

  const handleStarClick = (star) => {
    setStars(star);
    // Calculate percentage based on stars
    let percentage = 0;
    switch (star) {
      case 1:
        percentage = 20;
        break;
      case 2:
        percentage = 40;
        break;
      case 3:
        percentage = 60;
        break;
      case 4:
        percentage = 80;
        break;
      case 5:
        percentage = 100;
        break;
      default:
        percentage = 0;
    }
    setPercent(percentage);
  };

  function handleOpenEditArea() {
    setType(""); // Clear the type input field when opening edit area
    setEditIndex(null); // Reset edit index
  }

  function handleEditReview(index) {
    setEditIndex(index);
    setType(type); // Set the type for editing
    setDes(description); // Set the description for editing
  }

  function handleUpdateReview(id) {
    const updatedProduct = {
      type: type,
      description: description
    };

    axios.put(`http://localhost:8070/Product_review/update/${id}`, updatedProduct)
      .then(() => {
        alert("Product Review Updated");
        window.location.reload(); // Reload the page to show the updated review
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <>
      <Navbar />
      <div className="flex">
        <div className="w-1/4 bg-gray-800 text-white p-4 mt-16">
          <h2 className="text-2xl mb-4">Categories</h2>
          <ul>
            <li>
              <Link to="/show_I" className="block hover:text-gray-300">
                Instructor Reviews
              </Link>
            </li>
            <li>
              <Link to="/show_W" className="block hover:text-gray-300">
                Workout Reviews
              </Link>
            </li>
            <li>
              <Link to="/show_P" className="block hover:text-gray-300">
                Product Reviews
              </Link>
            </li>
          </ul>
        </div>
        <div className="w-3/4">
          <div>
            <p className="card-text text-white"> We would like your review to improve our website. </p>
            <p className="card-text text-white"> We would like your review to improve our website. </p>
            <h1 className="text-center mb-10 text-white">Share about your experience...</h1>
          </div>
          <div className="contact_form mt-5 flex items-center justify-center">
            <div className="border-2 border-gray-300 p-4 rounded max-w-lg">
              <h1 className="text-center mb-8 text-2xl">Share about your experience...</h1>
              <form id="contact_form" onSubmit={sendData}>
                <div className="mb-4">
                  <label htmlFor="exampleFormControlInput1" className="form-label">Product Type</label>
                  <select
                    className="form-control"
                    id="exampleFormControlInput1"
                    value={type}
                    onChange={(e) => { setType(e.target.value); }}
                  >
                    <option value="">Select Product Type</option>
                    <option value="Type A">Clothing</option>
                    <option value="Type B">Proteins</option>
                    <option value="Type C">Gym-Equipments</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label htmlFor="exampleFormControlTextarea1" className="form-label">Write your review here</label>
                  <textarea
                    className={`form-control ${isDescriptionValid ? '' : 'border-red-500'}`} // Add red border if description is invalid
                    id="exampleFormControlTextarea1"
                    rows="3"
                    value={description}
                    onChange={(e) => { setDes(e.target.value); }}
                  ></textarea>
                  {!isDescriptionValid && (
                    <p className="text-red-500">Description must be at least 5 words</p>
                  )}
                </div>

                {/* New code for star ratings */}
                <div className="mb-4 text-center">
                  <label htmlFor="exampleFormControlInput2" className="form-label">Rate the Product</label>
                  <StarRating
                    starsSelected={stars}
                    onSelectStar={handleStarClick}
                  />
                </div>
                {/* End of new code for star ratings */}

                <div className="mb-4 text-center">
                  {editIndex !== null ? (
                    <button type="button" className="btn btn-primary" onClick={() => handleUpdateReview(editIndex)}>Update</button>
                  ) : (
                    <button
                      type="submit"
                      className={`bg-${isDescriptionValid ? 'green' : 'red'}-500 hover:bg-${isDescriptionValid ? 'green' : 'red'}-700 text-white font-bold py-2 px-4 rounded`}
                      disabled={!isDescriptionValid} // Disable button if description is invalid
                    >
                      Add
                    </button>
                  )}
                </div>
                <div className="open_button text-center mb-3">
                  <Link to="/f_product" className="btn btn-primary bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded inline-block">View Previous Reviews</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
