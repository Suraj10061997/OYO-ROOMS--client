import {configureStore} from "@reduxjs/toolkit";
import roomSlice from "./features/roomSlice";
import authSlice from "./features/authSlice";
import bookingSlice  from "./features/bookingSlice";

export const store = configureStore({
    reducer:{
        room:roomSlice,
        auth:authSlice,
        book:bookingSlice,
    }
})