// import { axiosInstance } from "./index.js"



// export const getAllChats=async()=>{

//     try{
//   const response=await axiosInstance.get('/api/chat/get-all-chats')
//    return response.data
//     }
//     catch(error){
//         return error
//     }
// }



import axios from "axios";

export const getAllChats = async () => {
  try {
    const response = await axios.get("/api/chat/get-all-chats", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const createNewChat = async (members) => {
  try {
    const response = await axios.post("/api/chat/create-new-chat",{members},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
