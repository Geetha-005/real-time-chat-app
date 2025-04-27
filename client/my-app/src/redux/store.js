import { configureStore } from "@reduxjs/toolkit"
import loaderReducer from "./loaderSlice.js"
import userReducer from './userSlice.js'



const store=configureStore({
    reducer:{loaderReducer,userReducer}
})


export default store