import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { userBookings, bookingCancelling } from '../redux/features/bookingSlice';

import { toast } from 'react-toastify';

import Spinner from '../components/Spinner';

const MyBookings = () => {
  const dispatch = useDispatch();
  const { singleUserBookings, loading } = useSelector(state => ({ ...state.book }));
  const user = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    const userDetails = {
      userId: user.result._id
    }
    dispatch(userBookings({ userDetails, toast }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])



  function cancelBooking(bookingId, roomId, userId) {
    const bookingCancellingDetails = {
      bookingId,
      roomId,
      userId
    }
    dispatch(bookingCancelling({ bookingCancellingDetails, toast }))
  }



  if (!JSON.parse(localStorage.getItem("profile"))) {
    window.location.href = "/login";
  }
  if (loading) {
    return <Spinner/>
  }
  return (
    <div className='container' style={{ width: "60%" }}>
      <b><h2><u>My Bookings</u></h2></b>
      {!singleUserBookings.length ? (
        <h1 style={{ textAlign: "center", marginTop: "4rem" }}>No Bookings Found</h1>
      ) : (
        singleUserBookings.length && singleUserBookings.map((booking,index) => {
          return (
            <div className="row bs" key={index}>
              <div className="col-md-12">
                <h4>{booking.room}</h4>
                <p><b>Booking Id</b> : {booking._id}</p>
                <p><b>Transaction Id</b> : {booking.transactionId}</p>
                <p><b>Check In</b> : {booking.fromDate}</p>
                <p><b>Check Out</b> : {booking.toDate}</p>
                <p><b>Amount</b> : {booking.totalAmount}</p>
                <p><b>Status</b> : <b>{booking.status === "booked" ? <span style={{color: "green"}}>CONFIRMED</span> : <span style={{color: "red"}}>CANCELLED</span>}</b></p>
              </div>
              {booking.status === "booked" &&
                <div style={{ textAlign: "end", width: "100%" }}>

                  <button className="btn black" style={{ fontSize: "1rem" }} onClick={() => cancelBooking(booking._id, booking.roomId, booking.userId)}>CANCEL BOOKING</button>

                </div>
              }

            </div>
          )
        })
      )}

    </div>
  )

}

export default MyBookings;