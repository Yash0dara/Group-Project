import { useState, useEffect } from 'react';

function ManagerScheduleView() {
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await fetch('http://localhost:8070/bookings');
      if (!response.ok) {
        throw new Error('Failed to fetch bookings');
      }
      const data = await response.json();
      // Modify the data structure to fit the expected format
      const timeSlots = data.map(booking => ({
        time: booking.timeSlot,
        date: new Date(booking.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }),
        day: new Date(booking.date).toLocaleDateString('en-US', { weekday: 'long' }),
        workoutType: booking.workoutType // Add workoutType to the data structure
      }));
      // Group bookings by time slot
      const groupedTimeSlots = timeSlots.reduce((acc, booking) => {
        acc[booking.time] = acc[booking.time] || {};
        acc[booking.time][booking.day] = acc[booking.time][booking.day] || [];
        acc[booking.time][booking.day].push(booking);
        return acc;
      }, {});
      // Sort bookings within each day in ascending order
      Object.values(groupedTimeSlots).forEach(day => {
        Object.keys(day).forEach(slot => {
          day[slot] = day[slot].sort((a, b) => new Date(a.date) - new Date(b.date));
        });
      });
      setAvailableTimeSlots(Object.entries(groupedTimeSlots));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8" style={{ backgroundImage: "url('your-background-image-url-here')", backgroundSize: "cover", backgroundPosition: "center" }}>
      <h1 className="text-3xl font-bold mb-8">Booking Schedule</h1>
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2"></th>
              <th className="px-4 py-2">Monday</th>
              <th className="px-4 py-2">Tuesday</th>
              <th className="px-4 py-2">Wednesday</th>
              <th className="px-4 py-2">Thursday</th>
              <th className="px-4 py-2">Friday</th>
              <th className="px-4 py-2">Saturday</th>
              <th className="px-4 py-2">Sunday</th>
            </tr>
          </thead>
          <tbody>
            {/* Time slots */}
            {availableTimeSlots.map(([timeSlot, bookings]) => (
              <tr key={timeSlot}>
                <td className="border px-4 py-2 font-semibold">{timeSlot}</td>
                {/* Days and bookings */}
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                  <td key={day} className={`border px-4 py-2 ${bookings && bookings[day] && bookings[day].length > 0 ? 'bg-blue-200' : 'bg-white'}`}>
                    {bookings && bookings[day] ? (
                      <div>
                        {bookings[day].map((booking, index) => (
                          <div key={index} className="text-sm">
                            <div>{booking.date}</div>
                            <div>{booking.workoutType}</div> {/* Display workoutType */}
                          </div>
                        ))}
                      </div>
                    ) : ''}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManagerScheduleView;
