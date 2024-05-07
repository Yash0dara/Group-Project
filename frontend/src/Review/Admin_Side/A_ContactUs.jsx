import React from "react";
import { Link } from "react-router-dom";

export default function ContactUs() {
  return (
    <div>
      <div
        className="contact_form mt-5 flex items-center justify-center bg-cover"
        style={{
          minHeight: '100vh', // Set minimum height to cover the viewport
          backgroundImage: `url('https://static.vecteezy.com/system/resources/previews/022/653/988/original/treadmill-in-modern-gym-toned-image-3d-rendering-generative-ai-free-photo.jpg')`,
          backgroundSize: 'cover', // Ensure the image covers the entire background
          backgroundPosition: 'center', // Center the background image
        }}
      >
        <div
          className="bg-white bg-opacity-80 border border-gray-300 p-8 rounded-lg shadow-lg"
          style={{ maxWidth: '500px' }}
        >
          <div className="contact_form_title text-3xl mb-8">
            <h1>Reviews</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title text-xl mb-4">Review & Rating</h5>
                  <p className="card-text mb-6">Check all the reviews from here</p>
                  <Link
                    to="/admin/dashboard/a_ReviewBoxes"
                    className="btn btn-primary py-2 px-4 rounded-lg text-white inline-block"
                    style={{ backgroundColor: '#007bff' }}
                  >
                    Go to Reviews
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
