import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const getAllRooms = createAsyncThunk("room/getAllRooms", async (_, { rejectWithValue }) => {
    try {
        const response = await api.getAllRooms();
        return response.data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
})

export const getSingleRoom = createAsyncThunk("room/getSingleRoom",async(roomId,{rejectWithValue})=>{
    try{
        const response = await api.getSingleRoom(roomId);
        return response.data;
    }catch(err){
        return rejectWithValue(err.response.data);
    }
})


const roomSlice = createSlice({
    name: "room",
    initialState: {
        rooms: [],
        room:{},
        duplicateRooms:[],
        filteredRooms:[],
        categoryRooms:[],
        adminRooms:[],
        loading: true,
        error: ""
    },
    reducers: {
        setFilteredRooms:(state,action)=>{
            state.rooms=action.payload;
        },
        setduplicateRooms:(state,action)=>{
            state.rooms=action.payload;
        },
        setCategoryRooms:(state,action)=>{
            state.rooms=action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAllRooms.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getAllRooms.fulfilled, (state, action) => {
            state.loading = false;
            state.rooms = action.payload;
            state.duplicateRooms = action.payload;
            state.filteredRooms = action.payload;
            state.categoryRooms = action.payload;
            state.adminRooms = action.payload;
            state.error = "";
        })
        builder.addCase(getAllRooms.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        })
        builder.addCase(getSingleRoom.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getSingleRoom.fulfilled, (state, action) => {
            state.loading = false;
            state.room = action.payload;
            state.error = "";
        })
        builder.addCase(getSingleRoom.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        })
    }
})

export const {setFilteredRooms,setduplicateRooms,setCategoryRooms} = roomSlice.actions;
export default roomSlice.reducer;