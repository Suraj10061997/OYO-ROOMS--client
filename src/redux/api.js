import axios from "axios";

const API = axios.create({baseURL:"https://oyo--rooms.herokuapp.com"});

API.interceptors.request.use((req)=>{
    if(localStorage.getItem("profile")){
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`;
    }
    return req;
})

export const getAllRooms = () => API.get("/api/rooms/getAllRooms");
export const getSingleRoom = (roomId) => API.get(`/api/rooms/getSingleRoom/${roomId}`);


export const userRegister = (formValue) => API.post("/api/users/userRegister",formValue);
export const userLogin = (formValue) => API.post("/api/users/userLogin",formValue);
export const getAllUsers = () => API.get("/api/users/admin/getAllUsers");


export const singleBooking = (bookingDetails) => API.post("/api/bookings/singleBooking",bookingDetails);
export const userBookings = (userDetails) => API.post("/api/bookings/userBookings",userDetails)
export const bookingCancelling = (bookingCancellingDetails) => API.post("/api/bookings/bookingCancelling",bookingCancellingDetails);
export const getAllBookings = () =>API.get("/api/bookings/admin/allBookings");