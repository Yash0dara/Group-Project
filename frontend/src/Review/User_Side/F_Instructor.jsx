import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";

export default function A_Instructor() {
  const [instructors, setInstructors] = useState([]);
  const [editedDescription, setEditedDescription] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditedDescriptionValid, setIsEditedDescriptionValid] = useState(true); // State for edited description validation

  useEffect(() => {
    getInstructors();
  }, []);

  function getInstructors() {
    axios.get("http://localhost:8070/Instruct_review/")
      .then((res) => {
        setInstructors(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  useEffect(() => {
    // Check if the edited description meets the validation criteria
    setIsEditedDescriptionValid(editedDescription.trim().split(/\s+/).length > 5);
  }, [editedDescription]);

  const handleDeleteReview = (id) => {
    axios.delete(`http://localhost:8070/Instruct_review/delete/${id}`)
      .then((res) => {
        alert("Review deleted successfully");
        setInstructors(prevInstructors => prevInstructors.filter(instructor => instructor._id !== id));
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const handleOpenEditArea = (index) => {
    setEditIndex(index);
    setEditedDescription(instructors[index].description);
  };

  const handleUpdateReview = (id, index) => {
    // Validate the edited description before updating
    if (!isEditedDescriptionValid) {
      alert("Edited description must be at least 5 words");
      return;
    }

    axios.put(`http://localhost:8070/Instruct_review/update/${id}`, { description: editedDescription })
      .then((res) => {
        alert("Review updated successfully");
        const updatedInstructors = [...instructors];
        updatedInstructors[index].description = editedDescription;
        setInstructors(updatedInstructors);
        setEditIndex(null);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const handleCancelEdit = () => {
    setEditIndex(null);
    setEditedDescription("");
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredInstructors = instructors.filter((instructor) =>
    instructor.name.toLowerCase().includes(searchTerm.toLowerCase())
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
            <h3 className="mb-5" style={{ fontSize: '30px' }}>Reviews - Instructors</h3>
            <div className="relative mx-auto font-bold flex justify-center mb-4">
              <input
                type="text"
                placeholder="Search by instructor name..."
                value={searchTerm}
                onChange={handleSearch}
                className="border-2 border-[#a07628] bg-[#f9f9e9] h-11 w-[500px] pl-5 pr-16 rounded-[14px] text-[13pt] focus:outline-none"
              />
            </div>
            {filteredInstructors.map((instructor, index) => (
              <div key={instructor._id} className="mb-5">
                <div className="bg-blue-200 rounded p-4 mb-2">
                  <strong>Instructor Name:</strong> {instructor.name}
                </div>
                <div
                  className={`bg-gray-100 rounded p-4 ${editIndex === index ? "bg-gray-200" : ""}`}
                >
                  <strong>Description:</strong>{" "}
                  {editIndex === index ? (
                    <input
                      type="text"
                      value={editedDescription}
                      onChange={(e) => setEditedDescription(e.target.value)}
                      className="w-full bg-white rounded border p-1 mb-2"
                    />
                  ) : (
                    instructor.description
                  )}
                  <div className="mb-2">
                    <strong>Rating:</strong> {instructor.stars}
                  </div>
                  <div className="mb-2">
                    <strong>Rating Percentage:</strong> {instructor.percent}
                  </div>
                  <button
                    onClick={() => handleDeleteReview(instructor._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded mr-2"
                  >
                    Delete
                  </button>
                  {editIndex === index ? (
                    <>
                      <button
                        onClick={() => handleUpdateReview(instructor._id, index)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mr-2"
                      >
                        Update
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => handleOpenEditArea(index)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                    >
                      Edit
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
