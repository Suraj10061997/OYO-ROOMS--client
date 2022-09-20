import {createSlice , createAsyncThunk} from "@reduxjs/toolkit";
import * as api from "../api";


export const singleBooking = createAsyncThunk("booking/singleBooking",async({bookingDetails,navigate,toast},{rejectWithValue})=>{
    try{
        const response = await api.singleBooking(bookingDetails);
        toast.success("Booking done successfully");
        navigate("/home");
        return response.data;
    }catch(error){
        return rejectWithValue(error.response.data);
    }
})

export const userBookings = createAsyncThunk("booking/userBookings",async({userDetails,toast},{rejectWithValue})=>{
    try{
        const response = await api.userBookings(userDetails);
        // toast.success("This is all your bookings");;
        return response.data;
    }catch(error){
        return rejectWithValue(error.response.data);
    }
})

export const bookingCancelling = createAsyncThunk("booking/bookingCancelling",async({bookingCancellingDetails,toast},{rejectWithValue})=>{
    try{
        const response = await api.bookingCancelling(bookingCancellingDetails);
        toast.success("Your booking is cancelled successfully");
        return response.data;
    }catch(error){
        return rejectWithValue(error.response.data);
    }
})

export const getAllBookings = createAsyncThunk("booking/getAllBookings",async(_,{rejectWithValue})=>{
    try{
        const response = await api.getAllBookings();
        return response.data;
    }catch(error){
        return rejectWithValue(error.response.data);
    }
})


const bookingSlice = createSlice({
    name:"booking",
    initialState:{
        booking:{},
        singleUserBookings:[],
        allBookings:[],
        loading:true,
        error:""
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(singleBooking.pending,(state)=>{
            state.loading = true;
        })
        builder.addCase(singleBooking.fulfilled,(state,action)=>{
            state.loading=false;
            state.booking = action.payload;
            state.error="";
        })
        builder.addCase(singleBooking.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload.message;
        })
        builder.addCase(userBookings.pending,(state)=>{
            state.loading = true;
        })
        builder.addCase(userBookings.fulfilled,(state,action)=>{
            state.loading=false;
            state.singleUserBookings = action.payload;
            state.error="";
        })
        builder.addCase(userBookings.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload.message;
        })
        builder.addCase(bookingCancelling.pending,(state)=>{
            state.loading = true;
        })
        builder.addCase(bookingCancelling.fulfilled,(state,action)=>{
            state.loading=false;
            state.singleUserBookings = action.payload;
            state.error="";
        })
        builder.addCase(bookingCancelling.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload.message;
        })
        builder.addCase(getAllBookings.pending,(state)=>{
            state.loading = true;
        })
        builder.addCase(getAllBookings.fulfilled,(state,action)=>{
            state.loading=false;
            state.allBookings = action.payload;
            state.error="";
        })
        builder.addCase(getAllBookings.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload.message;
        })
    }
})


export default bookingSlice.reducer;