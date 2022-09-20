import React, { useEffect } from 'react';
import { toast } from "react-toastify";
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../redux/features/authSlice';

import Spinner from '../../components/Spinner';

const AdminUsers = () => {
  const dispatch = useDispatch();
  const { allUsers, error, loading } = useSelector(state => ({ ...state.auth }));

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    dispatch(getAllUsers());
  }, [])

  if (!JSON.parse(localStorage.getItem("profile"))) { window.location.href = "/login" };
  if (loading) return <Spinner/>
  return (
    <>
      <div className='row'>
        <div className='col-md-12'>
          <h2 style={{fontSize:"35px",backgroundColor:"black",color:"white"}}>Admin Panel</h2>
          <h2 style={{fontSize:"24px"}}>All Users</h2>
        </div>
      </div>
      <div className='row justify-content-center'>
        <div className="col-md-12">
          <table className='table table-bordered table-dark'>
            <thead className='bs'>
              <tr>
                <th>User Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Is Admin</th>
              </tr>
            </thead>
            <tbody>
              {allUsers.length && allUsers.map((user , index) => {
                return (
                  <tr key={index}>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.isAdmin ? "Yes":"No"}</td>
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

export default AdminUsers;