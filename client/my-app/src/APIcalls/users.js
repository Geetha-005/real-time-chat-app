// ../APIcalls/users.js
import axios from "axios";

export const getLoggedUser = async () => {
  try {
    const response = await axios.get("/api/user/logged", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false };
  }
};


export const getAllUsers = async () => {
    try {
      const response = await axios.get("/api/user/getall", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false };
    }
  };




// import {axiosInstance}from './index'

// export const getLoggedUser=async()=>{

//     try{
//         const response=axiosInstance.get('/api/user/logged')
//         return response.data

//     }
//     catch(error){
//         return error
//     }
// }
