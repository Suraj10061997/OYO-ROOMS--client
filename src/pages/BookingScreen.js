import React, { useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleRoom } from '../redux/features/roomSlice';
import { singleBooking } from '../redux/features/bookingSlice';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..
AOS.init({
  duration:1000
});



const BookingScreen = () => {
    const { roomId, fromDate, toDate } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { room, loading, error } = useSelector(state => ({ ...state.room }));
    const { user } = useSelector(state => ({ ...state.auth }));


    useEffect(() => {
        if (error) {
            toast.error(error);
        }
        dispatch(getSingleRoom(roomId));
       // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [error])

    if (loading) {
        return <Spinner/>
    }

    //-------------------B O 0 K   R O O M--------------------------
    const bookRoom = () => {
        if(!JSON.parse(localStorage.getItem("profile"))){
            window.location.href="/login";
            return;
        }
        const bookingDetails = {
            room: room.name,
            roomId: room._id,
            userId: JSON.parse(localStorage.getItem("profile")).result._id,
            fromDate,
            toDate,
            totalAmount: room.rentperday * ((Math.abs(fromDate.split("-")[0] - toDate.split("-")[0])) + 1),
            totalDays: (Math.abs(fromDate.split("-")[0] - toDate.split("-")[0])) + 1
        }
        console.log("book", bookingDetails);
        dispatch(singleBooking({ bookingDetails, navigate, toast }));
    }

    return (
        <div className='m-5' data-aos="flip-left">
            <div className="row justify-content-center mt-5 bs">
                <div className="col-md-5">
                    <h1>{room.name}</h1>
                    {room.imageurls && <img src={room.imageurls[0]} alt="" className="bigimg" />}
                </div>
                <div className="col-md-5">
                    <h1 style={{ textAlign: "right" }}>Booking Details</h1>
                    <hr />
                    <div style={{ textAlign: "right" }}>
                        <b>
                            <p>Name : {user && user.result.name}</p>
                            <p>From Date : {fromDate}</p>
                            <p>To Date : {toDate}</p>
                            <p>Max Count : {room.maxcount}</p>
                        </b>
                    </div>


                    <div style={{ textAlign: "right" }}>
                        <b>
                            <h1>Amount</h1>
                            <hr />
                            <p>Total Days : {`${(Math.abs(fromDate.split("-")[0] - toDate.split("-")[0])) + 1}`}</p>
                            <p>Rent Per Day : {room.rentperday}</p>
                            <p>Total Amount : {`${room.rentperday * ((Math.abs(fromDate.split("-")[0] - toDate.split("-")[0])) + 1)}`}</p>
                        </b>
                    </div>

                    <div style={{ float: "right" }} >
                        <button className="btn btn-primary" onClick={bookRoom}>Pay Now</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookingScreen