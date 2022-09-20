import {createSlice , createAsyncThunk} from "@reduxjs/toolkit";
import * as api from "../api";


export const userRegister = createAsyncThunk("auth/userRegister",async({formValue,navigate,toast},{rejectWithValue})=>{
    try{
        const response = await api.userRegister(formValue);
        toast.success("User registered successfully");
        navigate("/login");
        return response.data;
    }catch(error){
        return rejectWithValue(error.response.data);
    }
})

export const userLogin = createAsyncThunk("auth/userLogin",async({formValue,navigate,toast},{rejectWithValue})=>{
    try{
        const response = await api.userLogin(formValue);
        toast.success("User logged in successfully");
        navigate("/home");
        return response.data;
    }catch(error){
        return rejectWithValue(error.response.data);
    }
})

export const getAllUsers = createAsyncThunk("auth/getAllUsers",async(_,{rejectWithValue})=>{
    try{
        const response = await api.getAllUsers();
        return response.data;
    }catch(error){
        return rejectWithValue(error.response.data);
    }
})

const authSlice = createSlice({
    name:"auth",
    initialState:{
        user:null,
        loading:true,
        allUsers:[],
        error:""
    },
    reducers:{
        setUser:(state,action)=>{
            state.user = action.payload;
        },
        setLogout:(state)=>{
            localStorage.clear();
            state.user = null;
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(userRegister.pending,(state)=>{
            state.loading = true;
        })
        builder.addCase(userRegister.fulfilled,(state,action)=>{
            state.loading=false;
            state.user = action.payload;
            state.error="";
        })
        builder.addCase(userRegister.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload.message;
        })
        builder.addCase(userLogin.pending,(state)=>{
            state.loading = true;
        })
        builder.addCase(userLogin.fulfilled,(state,action)=>{
            state.loading=false;
            localStorage.setItem("profile",JSON.stringify({...action.payload}));
            state.user = action.payload;
            state.error="";
        })
        builder.addCase(userLogin.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload.message;
        })
        builder.addCase(getAllUsers.pending,(state)=>{
            state.loading = true;
        })
        builder.addCase(getAllUsers.fulfilled,(state,action)=>{
            state.loading=false;
            state.allUsers = action.payload;
            state.error="";
        })
        builder.addCase(getAllUsers.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload.message;
        })
    }
})

export const {setUser,setLogout} = authSlice.actions;
export default authSlice.reducer;