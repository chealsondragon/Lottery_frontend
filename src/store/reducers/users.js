import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";




const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : false

export const login = createAsyncThunk(
    'users/login',
    async ({ email, password }, thunkApi) => {
        const res = await axios.post('http://127.0.0.1:8000/api/users/login/', {
            "username": email,
            "email": email,
            "password": password
        })
            .then(res => res.data)
            .catch(error => console.log(error))
        return res
    }
);
export const fetchUser = createAsyncThunk(
    'users/fetchUser',
    async ({config}, thunkApi) => {
        const userList = await axios.get('http://localhost:8000/api/users/',config)
        return userList.data
    }
)


export const usersSlice = createSlice({
    name: 'users',
    initialState: {
        loginedUserInfo: userInfoFromStorage,
    },
    reducers: {
        loginConfirm: (state) => {         
            
        },
        logout: (state) => {
            state.loginedUserInfo = false;
            //localStorage.clear();
            window.location.href = '/';
            localStorage.removeItem('userInfo')
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                //console.log("pending")
            })
            .addCase(login.fulfilled, (state, action) => {
                //console.log("fulfilled")
                state.loginedUserInfo = action.payload;
                localStorage.setItem('userInfo', JSON.stringify(action.payload))                
            })
            .addCase(login.rejected, (state) => {
                //console.log("rejected")
            })

            .addCase(fetchUser.pending, (state) => {
                //console.log("pending")
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                //console.log("fulfilled")
                state.userList = action.payload;
            })
            .addCase(fetchUser.rejected, (state) => {
                //console.log("rejected")
            })

    }
})
export const { logout,loginConfirm } = usersSlice.actions;
export default usersSlice.reducer;