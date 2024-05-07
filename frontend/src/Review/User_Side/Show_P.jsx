import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";

export default function A_product() {
  const [others, setOthers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    function getOthers() {
      axios
        .get("http://localhost:8070/Product_review/")
        .then((res) => {
          setOthers(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }

    getOthers();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredOthers = others.filter((product) =>
    product.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
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
          <Navbar />
          <div>
            <p className="card-text text-white">
              {" "}
              We would like your review to improve our website.{" "}
            </p>
            <p className="card-text text-white">
              {" "}
              We would like your review to improve our website.{" "}
            </p>
          </div>
          <div className="m-10">
            <h3 className="text-center mb-5 text-3xl">Reviews - Products</h3>
            <div className="flex justify-center mb-5">
              <Link
                to="/products"
                className="btn btn-primary bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded inline-block"
              >
                Write a Review
              </Link>{" "}
            </div>

            <div className="relative mx-auto font-bold flex justify-center mt-6 mb-4">
              <input
                type="text"
                placeholder="Search by product type..."
                value={searchTerm}
                onChange={handleSearch}
                className="border-2 border-[#a07628] bg-[#f9f9e9] h-11 w-[500px] pl-5 pr-16 rounded-[14px] text-[13pt] focus:outline-none"
              />
            </div>

            {filteredOthers.map((product, index) => (
              <div key={product._id} className="mb-5">
                <div className="bg-blue-200 p-4 rounded">
                  <div className="mb-2">
                    <strong>Product Type:</strong> {product.type}
                  </div>
                  <div className="mb-2">
                    <strong>Description:</strong> {product.description}
                  </div>
                  <div className="mb-2">
                    <strong>Rating:</strong> {product.stars}
                  </div>
                  <div className="mb-2">
                    <strong>Rating Percentage:</strong> {product.percent}
                  </div>
                </div>
                <hr />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
