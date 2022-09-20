import React, { useEffect } from 'react';
import { toast } from "react-toastify";
import { useDispatch, useSelector } from 'react-redux';
import { getAllBookings } from '../../redux/features/bookingSlice';

import Spinner from '../../components/Spinner';

const AdminBookings = () => {
  const dispatch = useDispatch();
  const { allBookings, error, loading } = useSelector(state => ({ ...state.book }));

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    dispatch(getAllBookings());
  }, [])

  if (!JSON.parse(localStorage.getItem("profile"))) { window.location.href = "/login" };
  if (loading) return <Spinner/>
  if (allBookings.length === 0) return <h1>0 Bookings Found</h1>
  return (
    <>
      <div className='row'>
        <div className='col-md-12'>
          <h2 style={{fontSize:"35px",backgroundColor:"black",color:"white"}}>Admin Panel</h2>
          <h2 style={{fontSize:"24px"}}>All Bookings</h2>
        </div>
      </div>
      <div className='row justify-content-center'>
        <div className="col-md-12">
          <table className='table table-bordered table-dark'>
            <thead className='bs'>
              <tr>
                <th>Booking Id</th>
                <th>User Id</th>
                <th>Room</th>
                <th>From</th>
                <th>To</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {allBookings.length && allBookings.map((booking, index) => {
                return (
                  <tr key={index}>
                    <td>{booking._id}</td>
                    <td>{booking.userId}</td>
                    <td>{booking.room}</td>
                    <td>{booking.fromDate}</td>
                    <td>{booking.toDate}</td>
                    <td>{booking.status}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default AdminBookings