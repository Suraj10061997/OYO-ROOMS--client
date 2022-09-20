import React from 'react';
import { useSelector } from 'react-redux';
import { setLogout } from '../redux/features/authSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import decode from "jwt-decode";
const Navbar = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(state => ({ ...state.auth }));
    const logginUser = JSON.parse(localStorage.getItem("profile"));

    /*
    package name-->npm i jwt-decode
    So as we set in users(controllers) that our token get expires
    in 1h. So after 1h we want to get logout from page and for that 
    we can do one thing that we use the above package and see that whenever
    the current time is greater than the expiry time then we have to dispatch 
    the setLogout() method.
    */
    if(logginUser){
        const decodedToken = decode(logginUser.token);
        if(decodedToken.exp * 1000 < new Date().getTime()){
            dispatch(setLogout());
        }
    }
    return (
        <nav className="navbar navbar-expand-lg bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">OYO</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" ><i className="fa fa-bars" style={{color:"white"}}></i></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav mr-5">
                        {user?.result? (
                            <div className="dropdown">
                                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className="fa fa-user" style={{marginRight:"4px"}}></i>{user.result.name}
                                </button>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <Link to="/profile" className="dropdown-item">Profile</Link>
                                    <Link to="/bookings" className="dropdown-item">My Bookings</Link>
                                    <Link to="/login" className="dropdown-item" onClick={()=>dispatch(setLogout())}>Logout</Link>
                                    {logginUser && logginUser.result.isAdmin && (
                                        <>
                                        <Link to="/admin/bookings" className="dropdown-item">All Bookings</Link>
                                        <Link to="/admin/showRooms" className="dropdown-item">Show All Rooms</Link>
                                        <Link to="/admin/addRoom" className="dropdown-item">Add Room</Link>
                                        <Link to="/admin/users" className="dropdown-item">All Users</Link>
                                        </>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="/register">Register</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/login">login</a>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar