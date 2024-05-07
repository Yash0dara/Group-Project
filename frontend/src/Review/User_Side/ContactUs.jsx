import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";

export default function ContactUs() {
  return (
    <>
      <Navbar />
      <div>
        <h1
          className="text-white text-center mb-8 text-2xl font-semibold"
        >
          Reviews
        </h1>
      </div>
      <div
        className="contact_form mt-5 flex items-center justify-center bg-cover bg-center bg-no-repeat min-h-screen p-20"
        style={{
          backgroundImage: `url('https://media.istockphoto.com/id/1758416916/photo/excercise-equipment-in-a-modern-gym.webp?b=1&s=170667a&w=0&k=20&c=WhbsyDg2oB5Oh3VMIvuQ6C51fx2co_gL3VFSW-Z6VxQ=')`,
        }}
      >
        <div
          className="bg-gray-300 border border-gray-400 rounded-lg shadow-xl p-8 max-w-2xl w-full"
        >
          <div className="contact_form_title">
            <h1 className="text-gray-700 text-center mb-8 text-4xl font-semibold">
              Reviews
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <div
                className="card bg-gray-100 rounded-lg shadow-md p-6 h-full"
              >
                <h5 className="card-title text-gray-700 text-2xl font-semibold mb-4">
                  ChatBot
                </h5>
                <p className="card-text text-gray-600 mb-4">
                  Ask any question
                </p>
                <Link
                  to="/com"
                  className="btn btn-primary bg-blue-500 hover:bg-blue-600 text-white border-none px-4 py-2 rounded-md transition duration-300"
                >
                  Start
                </Link>
              </div>
            </div>
            <div className="mb-4">
              <div
                className="card bg-gray-100 rounded-lg shadow-md p-6 h-full"
              >
                <h5 className="card-title text-gray-700 text-2xl font-semibold mb-4">
                  Review & Rating
                </h5>
                <p className="card-text text-gray-600 mb-4">
                  We would like your review to improve our website. So Please
                  share your opinion
                </p>
                <Link
                  to="/reviewBoxes"
                  className="btn btn-primary bg-blue-500 hover:bg-blue-600 text-white border-none px-4 py-2 rounded-md transition duration-300"
                >
                  Go to Reviews
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
