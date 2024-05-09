import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import {Link} from 'react-router-dom';
const BookingDetails = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get('http://localhost:8070/bookings');
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const handleUpdate = (booking) => {
    // Allow updating only if the status is not 'Confirmed'
    if (booking.status !== 'Confirmed') {
      setSelectedBooking(booking);
    } else {
      alert("You cannot update a confirmed booking.");
    }
  };

  const handleDelete = async (id, status) => {
    try {
      // Allow deleting only if the status is not 'Confirmed'
      if (status !== 'Confirmed') {
        await axios.delete(`http://localhost:8070/bookings/${id}`);
        const updatedBookings = bookings.filter(booking => booking._id !== id);
        setBookings(updatedBookings);
      } else {
        alert("You cannot delete a confirmed booking.");
      }
    } catch (error) {
      console.error('Error deleting booking:', error);
    }
  };

  const updateBooking = async (updatedBooking) => {
    try {
      // Check if the updated status is 'Confirmed'
      if (updatedBooking.status === 'Confirmed') {
        // If so, make a PUT request to update the booking status
        await axios.put(`http://localhost:8070/bookings/${updatedBooking._id}/status`, { status: 'Confirmed' });
      } else {
        // If the status is not 'Confirmed', update the booking normally
        await axios.put(`http://localhost:8070/bookings/${updatedBooking._id}`, updatedBooking);
      }
      
      // Update the state based on the updated booking
      setBookings(bookings.map(booking =>
        booking._id === updatedBooking._id ? updatedBooking : booking
      ));

      setSelectedBooking(null);
    } catch (error) {
      console.error('Error updating booking:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <br/>
<br/>
<div>
      <div className="h-screen bg-gradient-to-r from-cyan-500 to-blue-500">
      <div className="container mx-auto mt-10 mb-10">
  <h2 className="text-3xl font-semibold text-center bg-gray-800 text-white py-4 rounded-t-lg">Booking Details</h2>
  <div className="overflow-x-auto">
    <table className="w-full border-collapse bg-white shadow-md rounded-lg">
      <thead>
        <tr className="bg-gray-200">
          <th className="border border-gray-400 px-4 py-2">Date</th>
          <th className="border border-gray-400 px-4 py-2">Time Slot</th>
          <th className="border border-gray-400 px-4 py-2">Workout Type</th>
          <th className="border border-gray-400 px-4 py-2">Package</th>
          <th className="border border-gray-400 px-4 py-2">Status</th>
          <th className="border border-gray-400 px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {bookings.map((booking, index) => (
          <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : ""}>
            <td className="border border-gray-400 px-4 py-2">{booking.date}</td>
            <td className="border border-gray-400 px-4 py-2">{booking.timeSlot}</td>
            <td className="border border-gray-400 px-4 py-2">{booking.workoutType}</td>
            <td className="border border-gray-400 px-4 py-2">{booking.packageType}</td>
            <td className="border border-gray-400 px-4 py-2">{booking.status}</td>
            <td className="border border-gray-400 px-4 py-2 flex justify-around">
              <button onClick={() => handleUpdate(booking)} className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded-md focus:outline-none focus:bg-blue-600">Update</button>
              <button onClick={() => handleDelete(booking._id, booking.status)} className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-md focus:outline-none focus:bg-red-600">Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  {selectedBooking && <UpdateBookingForm booking={selectedBooking} updateBooking={updateBooking} setSelectedBooking={setSelectedBooking} />}
  {bookings.length === 0 && <div className="p-4 text-center">No bookings available.</div>}
</div>
<div className="flex justify-center mt-8">
  <Link to="/scheduleView">
    <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
      View Schedule
    </button>
  </Link>
</div>
</div>
</div>
</div>  );
};

const UpdateBookingForm = ({ booking, updateBooking, setSelectedBooking }) => {
  const [date, setDate] = useState(booking.date);
  const [timeSlot, setTimeSlot] = useState(booking.timeSlot);
  const [workoutType, setWorkoutType] = useState(booking.workoutType);
  const [packageType, setPackageType] = useState(booking.packageType);
  const timeSlots = ['09:00 AM - 10:00 AM', '10:00 AM - 11:00 AM', '11:00 AM - 12:00 PM', '01:00 PM - 02:00 PM', '02:00 PM - 03:00 PM', '03:00 PM - 04:00 PM'];
  const workoutTypes = ['ZUMBA', 'Strength Training', 'Yoga', 'HIIT', 'Aerobics', 'Callisthenics', 'Body weight training'];
  const packages = ['Silver', 'Gold', 'Platinum'];

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedBooking = { ...booking, date, timeSlot, workoutType, packageType };
    updateBooking(updatedBooking);
    setSelectedBooking(null);
  };

  return (
  
  
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">Update Booking</h2>
        <form onSubmit={handleSubmit} className="mx-auto max-w-md">
          <div className="mb-4">
            <label className="block mb-1">Date:</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Time Slot:</label>
            <select value={timeSlot} onChange={(e) => setTimeSlot(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500">
              <option value="">Select Time Slot</option>
              {timeSlots.map((slot, index) => (
                <option key={index} value={slot}>{slot}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-1">Workout Type:</label>
            <select value={workoutType} onChange={(e) => setWorkoutType(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500">
              <option value="">Select Workout Type</option>
              {workoutTypes.map((type, index) => (
                <option key={index} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-1">Package:</label>
            <select value={packageType} onChange={(e) => setPackageType(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500">
              <option value="">Select Package</option>
              {packages.map((pkg, index) => (
                <option key={index} value={pkg}>{pkg}</option>
              ))}
            </select>
          </div>
          <div className="flex justify-end">
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">Update</button>
            <button onClick={() => setSelectedBooking(null)} className="bg-gray-300 text-gray-700 py-2 px-4 ml-2 rounded-md hover:bg-gray-400 transition duration-300">Cancel</button>
          </div>
        </form>
      </div>
    </div>
    
 
  );
};

export default BookingDetails;
