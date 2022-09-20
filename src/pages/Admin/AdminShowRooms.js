import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getAllRooms } from '../../redux/features/roomSlice';

import Spinner from '../../components/Spinner';

const AdminShowRooms = () => {
  const dispatch = useDispatch();
  const { adminRooms, loading, error } = useSelector(state => ({ ...state.room }));

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    dispatch(getAllRooms());
  }, [])

  if (!JSON.parse(localStorage.getItem("profile"))) { window.location.href = "/login" };
  if (loading) return <Spinner/>
  if (adminRooms.length === 0) return <h1>0 Rooms Found</h1>
  return (
    <>
      <div className='row'>
        <div className='col-md-12'>
          <h2 style={{ fontSize: "35px", backgroundColor: "black", color: "white" }}>Admin Panel</h2>
          <h2 style={{ fontSize: "24px" }}>All Rooms</h2>
        </div>
      </div>
      <div className='row justify-content-center'>
        <div className="col-md-12">
          <table className='table table-bordered table-dark'>
            <thead className='bs'>
              <tr>
                <th>Room Id</th>
                <th>Name</th>
                <th>Type</th>
                <th>Rent Per Day</th>
                <th>Max Count</th>
                <th>Phone Number</th>
              </tr>
            </thead>
            <tbody>
              {adminRooms.length && adminRooms.map((room, index) => {
                return (
                  <tr key={index}>
                    <td>{room._id}</td>
                    <td>{room.name}</td>
                    <td>{room.type}</td>
                    <td>{room.rentperday}</td>
                    <td>{room.maxcount}</td>
                    <td>{room.phonenumber}</td>
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

export default AdminShowRooms