import DashboardNav from "../Components/DashboardNav";
import ConnectNav from "../Components/ConnectNav";
import { Link } from "react-router-dom";
import { userHotelBookings } from "../actions/hotel";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import BookingCard from "../Components/cards/BookingCard";

const Dashboard = () => {
  const {
    auth: { token },
  } = useSelector((state) => ({ ...state }));
  const [booking, setBooking] = useState([]);

  useEffect(() => {
    loadUserBookings();
  }, []);

  const loadUserBookings = async () => {
    const res = await userHotelBookings(token);
    console.log(res);
    setBooking(res.data);
  };

  return (
    <>
      <div className="container-fluid bg-info p-4">
                <ConnectNav />
        
      </div>
      
      <div className="container-fluid p-5">
        <DashboardNav />
       
      </div>

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-4">
            <h2>Your Bookings</h2>
          </div>
          <div className="col-md-2">
          <Link to="/HotelList" className="btn btn-primary">
              Browse Hotels
            </Link>
          </div>
        </div>
      </div>

      <div className="row">
        {booking.map((b) => (
          <BookingCard
            key={b._id}
            hotel={b.hotel}
            session={b.session}
            orderedBy={b.orderedBy}
          />
        ))}
      </div>
    </>
  );
};

export default Dashboard;
