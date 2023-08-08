import { configureStore } from "@reduxjs/toolkit";
import usersReducer from './reducers/users'

export const store = configureStore({
    reducer:{
        users:usersReducer
    }
})