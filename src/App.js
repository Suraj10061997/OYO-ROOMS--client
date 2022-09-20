
import './App.css';
import { useEffect,useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import { useDispatch } from 'react-redux';
import { setUser } from './redux/features/authSlice';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import BookingScreen from './pages/BookingScreen';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import MyBookings from './pages/MyBookings';
import LandingPage from './pages/LandingPage';


import AdminBookings from './pages/Admin/AdminBookings';
import AdminShowRooms from './pages/Admin/AdminShowRooms';
import AdminAddRoom from './pages/Admin/AdminAddRoom';
import AdminUsers from './pages/Admin/AdminUsers';

function App() {
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(setUser(JSON.parse(localStorage.getItem("profile"))));
  },[])


  return (
    <Router>
      <div className="App">
        <Navbar/>
        <ToastContainer/>
        <Routes>
          <Route path="/" exact element={<LandingPage></LandingPage>}/>
          <Route path="/home" exact element={<Home></Home>}/>
          <Route path="/book/:roomId/:fromDate/:toDate" exact element={<BookingScreen></BookingScreen>} />
          <Route path="/login" exact element={<Login></Login>}/>
          <Route path="/register" exact element={<Register></Register>}/>
          <Route path="/profile" exact element={<Profile></Profile>}/>
          <Route path="/bookings" exact element={<MyBookings></MyBookings>}/>
          <Route path="/admin/bookings" exact element={<AdminBookings></AdminBookings>} />
          <Route path="/admin/showRooms" exact element={<AdminShowRooms></AdminShowRooms>} />
          <Route path="/admin/addRoom" exact element={<AdminAddRoom></AdminAddRoom>} />
          <Route path="/admin/users" exact element={<AdminUsers></AdminUsers>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
