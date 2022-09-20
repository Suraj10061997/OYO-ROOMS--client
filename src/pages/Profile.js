import React from 'react';
import { useSelector } from "react-redux";

const Profile = () => {
  const { user } = useSelector(state => ({ ...state.auth }));

  if (!JSON.parse(localStorage.getItem("profile"))) {
    window.location.href="/login";
  }
  return(
    <div className='container bs'>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <b><h2><u>My Profile</u></h2></b>
          <h1>Name : {user && user.result.name}</h1>
          <h1>Email : {user && user.result.email}</h1>
          <h1>isAdmin : {user && user.result.isAdmin ? "True" : "False"}</h1>
        </div>
      </div>
    </div>
  )

}

export default Profile;